<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $scheduleOfDay = Schedule::with(['event'])->where(['date' => date('Y-m-d')])->first();

        $incomingSchedules = Schedule::with(['event'])
            ->where('date', '>', date('Y-m-d'))
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Home', [
            'scheduleOfDay' => $scheduleOfDay,
            'incomingSchedules' => $incomingSchedules
        ]);
    }

    public function calendar()
    {
        return Inertia::render('Calendar');
    }
}
