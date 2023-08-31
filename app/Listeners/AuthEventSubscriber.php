<?php

namespace App\Listeners;

use App\Events\ResetPassword;
use App\Events\UserCreated;
use App\Mail\SendPasswordResetLink;
use App\Mail\SendUserInformations;
use Illuminate\Events\Dispatcher;
use Illuminate\Mail\Mailer;

class AuthEventSubscriber
{

    public function __construct(private Mailer $mailer)
    {
    }

    public function handleUserCreated(UserCreated $event): void
    {
        $this->mailer->send(new SendUserInformations($event->user, $event->tempPassword));
    }

    public function handleResetPassword(ResetPassword $event)
    {
        $url = route('reset-password', ['token' => $event->token], true);
        $this->mailer->send(new SendPasswordResetLink($event->user->email, $url));
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            UserCreated::class => 'handleUserCreated',
            ResetPassword::class => 'handleResetPassword'
        ];
    }
}
