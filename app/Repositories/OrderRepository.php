<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use App\Models\User;

class OrderRepository
{
    public function getAllSorted()
    {
      return Order::orderByDesc('created_at')->get();
    }
    public function getUserOrdersSorted(User $user)
    {
        return Order::where("user_id", $user->id)->orderByDesc("created_at")->get();
    }

    public function getByAuthority($authority)
    {
        return Payment::where('authority', $authority)->first()->order;
    }

    public function create(User $user, array $data)
    {
        return $user->orders()->create($data);
    }

    public function createDetail(Order $order, array $data)
    {
        return $order->order_details()->create($data);
    }

    public function update(Order $order, array $data)
    {
        return $order->update($data);
    }

    public function createPayment(Order $order, string $authority)
    {
        return $order->payment()->create([
            'user_id' => $order->user_id,
            'authority' => $authority
        ]);
    }
}