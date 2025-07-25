<?php

namespace App\Listeners;

use App\Events\OrderVerified;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Queue\ShouldQueue;

class AdjustProductStock implements ShouldQueue
{
    /**
     * Create the event listener.
     */

    /**
     * Handle the event.
     */
    public function handle(OrderVerified $event): void
    {
        $order_details = $event->order->order_details;
        foreach($order_details as $order_detail){
            $order_detail->product->decrement('stock', $order_detail->quantity);
        }
    }
}
