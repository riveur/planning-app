<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Category;
use App\Models\Group;
use App\Models\Schedule;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Carbon\CarbonPeriod;
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
        $this->authorize('viewAny', Event::class);

        $events = Event::with(['owner:id,firstname,lastname'])->get();

        return Inertia::render('Events/Index', compact('events'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Event::class);

        $groups = Group::all(['id', 'name']);
        $categories = Category::all(['id', 'name', 'color']);
        $formateurs = User::query()
            ->whereHas('role', function (Builder $query) {
                return $query->where(['name' => 'formateur']);
            })
            ->get(['id', 'firstname', 'lastname']);

        return Inertia::render('Events/New', compact('groups', 'categories', 'formateurs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $this->authorize('create', Event::class);

        $data = $request->only(['title', 'formateur_id', 'category_id']);
        $days = $request->validated('days');

        /** @var \App\Models\Event $event */
        $event = Event::create($data + ['owner_id' => $request->user()->id]);

        $startDate = new Carbon($request->validated('start_date'));
        $endDate = new Carbon($request->validated('end_date'));

        $startMorningTime = $request->validated('start_morning_time');
        $endMorningTime = $request->validated('end_morning_time');
        $startAfternoonTime = $request->validated('start_afternoon_time');
        $endAfternoonTime = $request->validated('end_afternoon_time');

        $periodes = CarbonPeriod::create($startDate->toDateString(), $endDate->toDateString());

        $mappedSchedules = collect($periodes)->flatMap(
            function (CarbonInterface $periode) use ($startMorningTime, $endMorningTime, $startAfternoonTime, $endAfternoonTime, $days) {
                return in_array(strtolower($periode->englishDayOfWeek), $days) ?  [
                    [
                        'start_date' => $periode->setTimeFromTimeString($startMorningTime)->toDateTimeString(),
                        'end_date' => $periode->setTimeFromTimeString($endMorningTime)->toDateTimeString(),
                    ],
                    [
                        'start_date' => $periode->setTimeFromTimeString($startAfternoonTime)->toDateTimeString(),
                        'end_date' => $periode->setTimeFromTimeString($endAfternoonTime)->toDateTimeString(),
                    ]
                ] : false;
            }
        );

        $event->schedules()->createMany($mappedSchedules->filter());

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
        $this->authorize('view', $event);

        return Inertia::render('Events/Show', compact('event'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $event = Event::with(['groups:id,name'])->find($id);

        $this->authorize('update', $event);

        $groups = Group::all(['id', 'name']);
        $categories = Category::all(['id', 'name', 'color']);
        $formateurs = User::query()
            ->whereHas('role', function (Builder $query) {
                return $query->where(['name' => 'formateur']);
            })
            ->get(['id', 'firstname', 'lastname']);

        return Inertia::render('Events/Edit', compact('event', 'formateurs', 'groups', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $data = Arr::only($request->validated(), ['title', 'formateur_id', 'category_id']);

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
        $this->authorize('delete', $event);

        $event->groups()->detach();
        $event->delete();

        return redirect()->route('events.index');
    }
}
