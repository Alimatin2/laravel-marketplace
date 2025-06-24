<?php

namespace App\Listeners;

use App\Events\OrderVerified;
use App\Repositories\ProductRepository;

class AdjustProductStock
{
    /**
     * Create the event listener.
     */
    public function __construct(
        protected ProductRepository $products,
    ){}

    /**
     * Handle the event.
     */
    public function handle(OrderVerified $event): void
    {
        $order_details = $event->order->order_details;
        foreach($order_details as $order_detail){
            $this->products->decreamentStock($order_detail->product, $order_detail->quantity);
        }
    }
}
