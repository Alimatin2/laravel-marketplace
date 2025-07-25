<?php

namespace App\Actions;

use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use App\Services\ZarinpalService;
use Illuminate\Support\Arr;

class CreateOrderAction
{
  public function __construct(
    protected ZarinpalService $zarinpal,
  ){}

  public function handle(array $data)
  {
    $order_data = Arr::except($data, ['order']); //exclude order items
    $order = auth()->user()->orders()->create($order_data);

    $order_details = json_decode($data['order'], true);

    foreach ($order_details as $order_detail) {
      $order->order_details()->create([
          'product_id' => $order_detail['id'],
          'quantity' => $order_detail['quantity'],
      ]);
    }

    $payment = auth()->user()->payments()->create([
        'order_id' => $order->id,
        'price' => $order->total_price,
    ]);

    $zarinpalResponse = $this->zarinpal->create($payment);

    $this->zarinpal->check($zarinpalResponse) &&
    $payment->update([
      'authority' => $zarinpalResponse['data']['authority']
    ]);;

    return $zarinpalResponse;
  }
}
