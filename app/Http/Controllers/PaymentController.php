<?php

namespace App\Http\Controllers;

use App\Events\OrderVerified;
use App\Models\Order;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use App\Services\ZarinpalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentRepository $payments,
        protected ZarinpalService $zarinpal,
        protected OrderRepository $orders,
    ){}

    public function verify(Request $request)
    {
        $responseData = $this->zarinpal->verify($request->Authority);

        if ($this->zarinpal->check($responseData)) {
            $payment = $this->payments->getByAuthority($request->Authority);

            if($payment->order_id) {
                $order = $payment->order;
                $this->orders->update($order, [
                    'status' => 'pending',
                ]);
                event(new OrderVerified($order));
            } else {
                auth()->user()->increment('balance', $payment->price);
            }

            return Inertia::render('payment-verify', [
                'payment' => $responseData['payment'],
                'order' => $order ?? null,
                'responseData' => $responseData['data'],
            ]);
        } else {
            return Inertia::render('payment-failed', [
                'data' => $responseData,
            ]);
        }
    }
}
