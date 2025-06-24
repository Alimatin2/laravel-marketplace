<?php

namespace App\Services;

use App\Events\OrderVerified;
use App\Repositories\OrderRepository;
use App\Models\Order;
use App\Models\Payment;
use App\Repositories\PaymentRepository;
use Illuminate\Support\Facades\Http;

//TODO
//Abstract requests, response checks and more

class ZarinpalService
{
  public function __construct(
    protected OrderRepository $orders,
    protected PaymentRepository $payments
  ){}

  public function create(Payment $payment)
  {
    $zarinpalResponse = Http::withHeaders([
      'Accept' => 'application/json',
    ])->post('https://sandbox.zarinpal.com/pg/v4/payment/request.json', [
        'merchant_id' => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        'amount' => $payment->price,
        'callback_url' => route('payment.verify'),
        'description' => 'پرداخت سفارش شماره ' . $payment->id,
        'metadata' => [
            'email' => $payment->order->email ?? auth()->user()->email,
            'order_id' => strval($payment->id),
        ],
    ]);

    $responseData = $zarinpalResponse->json();

    return $responseData;
  }

  public function verify(string $authority)
  {
    $payment = $this->payments->getByAuthority($authority);

    $zarinpalResponse = Http::withHeaders([
      'Accept' => 'application/json',
    ])->post('https://sandbox.zarinpal.com/pg/v4/payment/verify.json', [
        'merchant_id' => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        'amount' => $payment->price,
        'authority' => $authority,
    ]);

    $responseData = $zarinpalResponse->json();

    return [
        'payment' => $payment,
        'data' => $responseData['data'],
    ];
  }

  public function check($response)
  {
    if(!empty($response['data']) && $response['data']['code'] == 100) {
      return true;
    } else {
      return false;
    }
  }
}