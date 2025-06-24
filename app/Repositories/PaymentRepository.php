<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;

class PaymentRepository
{
  public function getByAuthority(string $authority)
  {
    return Payment::where('authority', $authority)->first();
  }

  public function create(User $user, array $data)
  {
    return $user->payments()->create($data);
  }

  public function updateAuthority(Payment $payment, string $authority)
  {
    return $payment->update([
      'authority' => $authority,
    ]);
  }
}
