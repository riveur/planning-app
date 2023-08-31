<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();

        return Inertia::render('Events/Index', compact('events'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groups = Group::all(['id', 'name']);
        $formateurs = User::query()
            ->whereHas('role', function (Builder $query) {
                return $query->where(['name' => 'formateur']);
            })
            ->get(['id', 'firstname', 'lastname']);

        return Inertia::render('Events/New', compact('groups', 'formateurs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $data = Arr::only($request->validated(), ['title', 'description', 'formateur_id']);

        /** @var \App\Models\Event $event */
        $event = Event::create($data + ['owner_id' => $request->user()->id]);

        if ($request->validated('groups')) {
            $event->groups()->attach($request->validated('groups'));
        }

        return redirect()->route('events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Events/Show', compact('event'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $event = Event::with(['groups'])->find($id);
        $groups = Group::all(['id', 'name']);
        $formateurs = User::query()
            ->whereHas('role', function (Builder $query) {
                return $query->where(['name' => 'formateur']);
            })
            ->get(['id', 'firstname', 'lastname']);

        return Inertia::render('Events/Edit', compact('event', 'formateurs', 'groups'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $data = Arr::only($request->validated(), ['title', 'description', 'formateur_id']);

        $event->fill($data);
        $event->save();

        $event->groups()->sync($request->validated('groups'));

        return redirect()->route('events.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->groups()->detach();
        $event->delete();

        return redirect()->route('events.index');
    }
}
