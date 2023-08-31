<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;

class ResetPassword
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(public User $user, public string $token)
    {
    }
}
