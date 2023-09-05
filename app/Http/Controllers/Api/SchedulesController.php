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
        //
    }
}
