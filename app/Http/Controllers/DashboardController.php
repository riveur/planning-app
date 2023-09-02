<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $scheduleOfDay = Schedule::with(['event'])->where(['date' => date('Y-m-d')]);

        $incomingSchedules = Schedule::with(['event'])
            ->where('date', '>', date('Y-m-d'))
            ->orderBy('date', 'desc')
            ->limit(5);

        if (!$user->roleIs('admin')) {
            $scheduleOfDay = $scheduleOfDay->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });

            $incomingSchedules = $incomingSchedules->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });
        }

        return Inertia::render('Home', [
            'scheduleOfDay' => $scheduleOfDay->first(),
            'incomingSchedules' => $incomingSchedules->get()->reverse()->values()
        ]);
    }

    public function calendar()
    {
        return Inertia::render('Calendar');
    }
}
