<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $data = $request->validate([
            'initialStart' => ['required', 'date'],
            'initialEnd' => ['required', 'date'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date']
        ]);

        $data = collect($data)
            ->map(function ($date) {
                return new CarbonImmutable($date);
            })
            ->toArray();

        switch (true) {
            case ($data['initialStart']->toDateTimeString() === $schedule->start_morning_date) &&
                ($data['initialEnd']->toDateTimeString() === $schedule->end_morning_date):
                $schedule->fill([
                    'start_morning_date' => $data['start'],
                    'end_morning_date' => $data['end'],
                ]);
                break;
            case ($data['initialStart']->toDateTimeString() === $schedule->start_afternoon_date) &&
                ($data['initialEnd']->toDateTimeString() === $schedule->end_afternoon_date):
                $schedule->fill([
                    'start_afternoon_date' => $data['start'],
                    'end_afternoon_date' => $data['end'],
                ]);
                break;
            case ($data['start']->toDateString() !== $schedule->date) &&
                ($data['end']->toDateString() !== $schedule->date):
                $schedule->fill([
                    'date' => $data['start']->toDateString()
                ]);
        }

        $schedule->update();

        return response()->json(['message' => 'Horaire mis à jour !']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
