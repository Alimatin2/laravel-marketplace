<?php

namespace App\Repositories;

use App\Models\User;

class BookingRepository
{
  public function getUserBookingsSorted(User $user)
  {
    return $user->bookings()->latest()->get();
  }
}
