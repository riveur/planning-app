<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Schedule::class);

        $data = $request->validate([
            'event_id' => ['required', 'exists:events,id'],
            'start_date' => ['required', 'date', 'before_or_equal:end_date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date']
        ]);

        $schedule = Schedule::create([
            'event_id' => $data['event_id'],
            'start_date' => new Carbon($data['start_date']),
            'end_date' => new Carbon($data['end_date']),
        ]);

        return response()->json(compact('schedule'), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $data = $request->validate([
            'start' => ['required', 'date', 'before_or_equal:end'],
            'end' => ['required', 'date', 'after_or_equal:start']
        ]);

        $data = collect($data)
            ->map(function ($date) {
                return new CarbonImmutable($date);
            })
            ->toArray();

        $schedule->fill([
            'start_date' => $data['start']->toDateTimeString(),
            'end_date' => $data['end']->toDateTimeString(),
        ]);

        $schedule->update();

        return response()->json(['message' => 'Horaire mis à jour !']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $this->authorize('delete', $schedule);

        $schedule->delete();

        return response()->noContent();
    }
}
