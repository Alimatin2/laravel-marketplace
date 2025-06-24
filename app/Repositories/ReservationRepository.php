<?php

namespace App\Repositories;

use App\Models\Reservation;

class ReservationRepository
{
  public function update(Reservation $reservation, array $data)
  {
    return $reservation->update($data);
  }
}
