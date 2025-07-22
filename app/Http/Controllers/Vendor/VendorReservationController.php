<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use App\Models\Vendor;
use App\Repositories\ReservationRepository;
use App\Repositories\VendorRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorReservationController extends Controller
{
    public function __construct(
        protected VendorRepository $vendors,
        protected ReservationRepository $reservations,
    ){}

    public function index(Vendor $vendor)
    {
        return Inertia::render('seller/reservations/index', [
            'vendor' => $vendor,
            'reservations' => $vendor->reservations,
        ]);
    }

    public function create(Vendor $vendor)
    {
        return Inertia::render('seller/reservations/create', [
            'vendor' => $vendor,
        ]);
    }

    public function store(StoreReservationRequest $request, Vendor $vendor)
    {
        $validated = $request->validated();

        $this->vendors->createReservation($vendor, $validated);

        return to_route('seller.reservations', ['vendor' => $vendor])->with('success', 'Reservation created.');
    }

    public function edit(Vendor $vendor, Reservation $reservation)
    {
        return Inertia::render('seller/reservations/edit', [
            'vendor' => $vendor,
            'reservation' => $reservation
        ]);
    }

    public function update(UpdateReservationRequest $request, Vendor $vendor, Reservation $reservation)
    {
        $validated = $request->validated();

        $this->reservations->update($reservation, $validated);

        return to_route('seller.reservations', ['vendor' => $vendor])->with('success', 'Reservation updated.');
    }

    public function indexBookings(Vendor $vendor)
    {
        return Inertia::render('seller/bookings/index', [
            'bookings' => $this->vendors->getBookings($vendor),
            'vendor' => $vendor
        ]);
    }
}

