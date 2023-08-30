<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AuthController extends Controller
{

    /**
     * Login page
     */
    public function login(): InertiaResponse
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Register page
     */
    public function register(): InertiaResponse
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Check and authenticate with credentials
     */
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended();
        }

        return back()->withErrors([
            'email' => 'Identifiants incorrect',
        ])->onlyInput('email');
    }

    /**
     * Validate and register a user
     */
    public function doRegister(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'firstname' => ['required'],
            'lastname' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed'],
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create(Arr::only($data, ['firstname', 'lastname', 'username', 'email', 'password']));

        return redirect()->route('login');
    }

    /**
     * Log out the authenticated user
     */
    public function logout(): RedirectResponse
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
