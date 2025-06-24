<?php

namespace App\Http\Controllers;

use App\Actions\CreateOrderAction;
use App\Events\OrderVerified;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\OrderRepository;
use App\Services\ZarinpalService;

class OrderController extends Controller
{
    public function __construct(
        protected OrderRepository $orders,
        protected CreateOrderAction $createOrder,
        protected ZarinpalService $zarinpal
    ){}

    public function index()
    {
        return Inertia::render('dashboard/orders/index', [
            'orders' => $this->orders->getUserOrdersSorted(auth()->user()),
        ]);
    }
    public function show(Order $order)
    {
        if ($order->user_id !== auth()->user()->id) {
            return redirect()->route('orders');
        }

        return Inertia::render('dashboard/orders/show', [
            'order' => $order->order_details,
        ]);
    }
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();

        $response = $this->createOrder->handle($validated);

        if ($this->zarinpal->check($response)) {
            return Inertia::render('dashboard/checkout/create', [
            'order' => $response,
            'redirect_url' => "https://sandbox.zarinpal.com/pg/StartPay/" . $response['data']['authority'],
            ]);
        } else {
            return Inertia::render('payment-failed', [
                'data' => $response,
            ]);
        }
    }
}
