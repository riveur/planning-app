<?php

namespace App\Http\Controllers;

use App\Events\ResetPassword;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
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

    public function forgotPassword(): InertiaResponse
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function doForgotPassword(Request $request): RedirectResponse
    {

        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email']
        ]);

        $target = User::query()->where(['email' => $data['email']])->firstOrFail();
        $token = Password::createToken($target);

        try {
            ResetPassword::dispatch($target, $token);
        } catch (Exception) {
            return back()->withErrors(['message' => 'Erreur lors de l\'envoi de votre demande, réessayez plus tard.']);
        }

        return back()->with(['message' => 'Les instructions pour réinitialiser votre mot de passe ont été envoyées']);
    }

    public function resetPassword(string $token)
    {
        return Inertia::render('Auth/ResetPassword', compact('token'));
    }

    public function doResetPassword(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed']
        ]);

        $status = Password::reset(
            $request->only(['email', 'token', 'password', 'password_confirmation']),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET ?
            redirect()->route('login')->with(['message' => 'Mot de passe réinitialisé !']) :
            back()->withErrors(['message' => 'Votre demande a expiré, faites en une autre.']);
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
