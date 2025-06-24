<?php

namespace App\Services;

use App\Models\Reservation;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ReservationService
{
  public function getDays($start_date, $duration)
  {
    $days = [];

    $start_date = Carbon::parse($start_date);

    $period = CarbonPeriod::create($start_date->copy(), $duration);

    foreach($period as $date) {
        $days[] = $date->toDateString();
    }

    return $days;
  }

  public function getHours($start_hour, $end_hour, $duration)
  {
    $hours = [];

    $start_hour = Carbon::createFromFormat('H:i', $start_hour);
    $end_hour = Carbon::createFromFormat('H:i', $end_hour);

    while ($start_hour <= $end_hour) {
        $hours[] = $start_hour->format('H:i');
        $start_hour->addMinutes($duration);
    }

    return $hours;
  }

  public function getTimes(Reservation $reservation)
  {
    $times = [];

    $bookings = [];
    
    foreach ($reservation->bookings as $booking) {
        $date = explode("T", $booking->date)[0];
        $bookings[$date][] = $booking->time;
    }

    $hours = $this->getHours($reservation->start, $reservation->end, $reservation->session_duration);
    $days = $this->getDays($reservation->created_at, $reservation->duration);

    foreach ($days as $day) {
      $available_hours = $hours;

      if (isset($bookings[$day])) {
          $available_hours = array_filter($hours, function ($hour) use ($bookings, $day) {
              return !in_array($hour, $bookings[$day]);
          });
      }

      $times[$day] = array_values($available_hours);
    }

    return $times;
  }
}
