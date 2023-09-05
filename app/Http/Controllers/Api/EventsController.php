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
            'start' => ['required', 'date', 'before_or_equal:end'],
            'end' => ['required', 'date', 'after_or_equal:start']
        ]);

        /** @var \App\Models\User $user */
        $user = $request->user();

        /** @var \Illuminate\Database\Eloquent\Collection|\App\Models\Schedule[] $schedules */
        $schedules = Schedule::with(['event', 'event.category:id,color'])
            ->where('start_date', '>=', $data['start'])
            ->where('end_date', '<=', $data['end']);

        if (!$user->roleIs('admin')) {
            $schedules = $schedules->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });
        }

        $schedules = $schedules->get()->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'color' => $schedule->event->category->color,
                'title' => $schedule->event->title,
                'start' => $schedule->start_date,
                'end' => $schedule->end_date,
            ];
        });

        return response()->json($schedules);
    }
}
