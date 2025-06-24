<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotificationListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NotificationEvent $event): void
    {
        $model = $event->model;
        $user_id = $event->user_id;

        Notification::create([
            'reference_id' => $model->id,
            'reference_type' => get_class($model),
            'user_id' => $user_id
        ]);
    }
}
