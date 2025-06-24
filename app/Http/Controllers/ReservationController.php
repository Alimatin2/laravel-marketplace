<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function __construct(
        protected ReservationService $reservationService,
    ){}

    public function show(Reservation $reservation)
    {
        return Inertia::render('reservations/show',[
            'reservation' => $reservation,
            'times' => $this->reservationService->getTimes($reservation),
        ]);
    }
}
