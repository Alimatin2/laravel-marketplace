<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Reservation;
use App\Repositories\BookingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(
        protected BookingRepository $bookings,
    ){}

    public function store(Reservation $reservation, StoreBookingRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $booking = $reservation->bookings()->create($validated);

        auth()->user()->decrement('balance', $booking->price);
        
        return to_route('bookings');
    }

    public function index()
    {
        return Inertia::render('dashboard/bookings/index', [
            'bookings' => $this->bookings->getUserBookingsSorted(auth()->user()),
        ]);
    }
}
