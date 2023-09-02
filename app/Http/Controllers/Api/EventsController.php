<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function feed(Request $request)
    {
        $data = $request->validate([
            'start' => ['required', 'date'],
            'end' => ['required', 'date']
        ]);

        /** @var \App\Models\User $user */
        $user = $request->user();

        /** @var \Illuminate\Database\Eloquent\Collection|\App\Models\Schedule[] $schedules */
        $schedules = Schedule::with(['event'])
            ->whereBetween('date', [$data['start'], $data['end']]);

        if (!$user->roleIs('admin')) {
            $schedules = $schedules->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });
        }

        $schedules = $schedules->get()->flatMap(function ($schedule) {
            return [
                [
                    'title' => $schedule->event->title,
                    'start' => $schedule->start_morning_date,
                    'end' => $schedule->end_morning_date,
                ],
                [
                    'title' => $schedule->event->title,
                    'start' => $schedule->start_afternoon_date,
                    'end' => $schedule->end_afternoon_date,
                ]
            ];
        });

        return response()->json($schedules);
    }
}
