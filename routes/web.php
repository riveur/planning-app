<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use App\Models\Event;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('auth')->group(function () {

    Route::controller(DashboardController::class)
        ->name('dashboard.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/calendar', 'calendar')->name('calendar');
        });

    Route::controller(EventsController::class)
        ->prefix('events')
        ->name('events.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/new', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{event}', 'show')->name('show');
            Route::get('/edit/{event}', 'edit')->name('edit');
            Route::put('/edit/{event}', 'update')->name('update');
            Route::delete('/{event}', 'destroy')->name('destroy');
        });

    Route::controller(UsersController::class)
        ->prefix('users')
        ->name('users.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/new', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{user}', 'show')->name('show');
            Route::get('/edit/{user}', 'edit')->name('edit');
            Route::put('/edit/{user}', 'update')->name('update');
            Route::delete('/{user}', 'destroy')->name('destroy');
        });

    Route::controller(RolesController::class)
        ->prefix('roles')
        ->name('roles.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/new', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{role}', 'show')->name('show');
            Route::get('/edit/{role}', 'edit')->name('edit');
            Route::put('/edit/{role}', 'update')->name('update');
            Route::delete('/{role}', 'destroy')->name('destroy');
        });

    Route::controller(GroupsController::class)
        ->prefix('groups')
        ->name('groups.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/new', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{group}', 'show')->name('show');
            Route::get('/edit/{group}', 'edit')->name('edit');
            Route::put('/edit/{group}', 'update')->name('update');
            Route::delete('/{group}', 'destroy')->name('destroy');
        });

    Route::controller(CategoriesController::class)
        ->prefix('categories')
        ->name('categories.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/new', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{category}', 'show')->name('show');
            Route::get('/edit/{category}', 'edit')->name('edit');
            Route::put('/edit/{category}', 'update')->name('update');
            Route::delete('/{category}', 'destroy')->name('destroy');
        });

    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate']);
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'doRegister']);
    Route::get('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('/forgot-password', [AuthController::class, 'doForgotPassword']);
    Route::get('/reset-password/{token}', [AuthController::class, 'resetPassword'])->name('reset-password');
    Route::post('/reset-password', [AuthController::class, 'doResetPassword'])->name('post-reset-password');
});
