<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use App\Models\Schedule;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use DateTimeZone;
use ICal\ICal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $schedulesOfDay = Schedule::with(['event', 'event.category:id,color'])
            ->whereDate('start_date', date('Y-m-d'))
            ->whereDate('end_date', date('Y-m-d'));

        $incomingSchedules = Schedule::with(['event', 'event.category:id,name,color'])
            ->whereDate('start_date', '>', now()->toDateString())
            ->whereDate('end_date', '>', now()->toDateString())
            ->orderBy('start_date', 'asc')
            ->limit(10);

        if (!$user->roleIs('admin')) {
            $schedulesOfDay = $schedulesOfDay->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });

            $incomingSchedules = $incomingSchedules->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });
        }

        $incomingSchedules = $incomingSchedules->get()
            ->groupBy([function (Schedule $schedule) {
                return (new Carbon($schedule->start_date))->toDateString();
            }])
            ->all();

        return Inertia::render('Home', [
            'schedulesOfDay' => $schedulesOfDay->get(),
            'incomingSchedules' => $incomingSchedules,
        ]);
    }

    public function calendar()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $canAddSchedule = $user->can('create', Schedule::class) ?? false;

        return Inertia::render('Calendar', [
            'canEditCalendar' => $user->roleIs('admin'),
            'canAddSchedule' => $canAddSchedule,
            'canDeleteSchedule' => $user->roleIs('admin'),
            'events' => $canAddSchedule ? Event::all(['id', 'title']) : [],
        ]);
    }
}
