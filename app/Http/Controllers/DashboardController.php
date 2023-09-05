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
            ->where('start_date', '<=', now()->addDays(6)->endOfDay())
            ->where('start_date', '>', now()->startOfDay())
            ->where('end_date', '<=', now()->addDays(6)->endOfDay())
            ->where('end_date', '>', now()->startOfDay())
            ->orderBy('start_date', 'asc');

        $incomingSchedules = $incomingSchedules->get()
            ->groupBy([function (Schedule $schedule) {
                return (new Carbon($schedule->start_date))->toDateString();
            }])
            ->all();

        if (!$user->roleIs('admin')) {
            $schedulesOfDay = $schedulesOfDay->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });

            $incomingSchedules = $incomingSchedules->whereHas('event.groups', function ($query) use ($user) {
                return $query->where('id', '=', $user->group_id);
            });
        }

        return Inertia::render('Home', [
            'schedulesOfDay' => $schedulesOfDay->get(),
            'incomingSchedules' => $incomingSchedules
        ]);
    }

    public function calendar()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('Calendar', [
            'canEditCalendar' => $user->roleIs('admin'),
        ]);
    }
}
