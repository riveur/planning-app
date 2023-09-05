<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->only(['firstname', 'lastname', 'fullname', 'username', 'email']) : null,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'can' => function () use ($request) {
                return $request->user() ? [
                    'viewAnyEvent' => $request->user()->can('viewAny', 'App\\Models\\Event') ?? false,
                    'viewAnyUser' => $request->user()->can('viewAny', 'App\\Models\\User') ?? false,
                    'viewAnyGroup' => $request->user()->can('viewAny', 'App\\Models\\Group') ?? false,
                    'viewAnyRole' => $request->user()->can('viewAny', 'App\\Models\\Role') ?? false,
                    'viewAnyCategory' => $request->user()->can('viewAny', 'App\\Models\\Category') ?? false,
                ] : [];
            }
        ]);
    }
}
