<?php

use App\Http\Controllers\Vendor\VendorBookingsController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\Vendor\VendorReservationController;
use App\Http\Controllers\Vendor\VendorUserController;
use App\Http\Middleware\VendorCreationMiddleware;
use App\Http\Middleware\VendorMember;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/seller-form', [VendorController::class, 'create'])->middleware([VendorCreationMiddleware::class])->name('seller.create');

  Route::post('/seller-form', [VendorController::class, 'store'])->middleware([VendorCreationMiddleware::class])->name('seller.store');

  Route::middleware([VendorMember::class])->group(function () {
    Route::get('/seller/{vendor}', [VendorController::class, 'show'])->name('seller.dashboard');

    Route::get('/seller/{vendor}/reservations', [VendorReservationController::class, 'index'])->name('seller.reservations');

    Route::get('/seller/{vendor}/reservations/create', [VendorReservationController::class, 'create'])->name('seller.reservations.create');

    Route::post('/seller/{vendor}/reservations', [VendorReservationController::class, 'store'])->name('seller.reservations.store');

    Route::get('/seller/{vendor}/r-{reservation}', [VendorReservationController::class, 'edit'])->name('seller.reservations.edit');

    Route::put('/seller/{vendor}/r-{reservation}', [VendorReservationController::class, 'update'])->name('seller.reservations.update');


    Route::get('/seller/{vendor}/members', [VendorUserController::class, 'index'])->name('seller.members');

    Route::get('/seller/{vendor}/invitations', [VendorUserController::class, 'indexInvitations'])->name('seller.invitations');

    Route::get('/seller/{vendor}/invite', [VendorUserController::class, 'create'])->name('seller.invitations.create');

    Route::post('/seller/{vendor}/invite', [VendorUserController::class, 'store'])->name('seller.invitations.store');


    Route::get('/seller/{vendor}/bookings', [VendorReservationController::class, 'indexBookings'])->name('seller.bookings');
  });

  Route::post('/seller/{vendor_invitation}/accept', [VendorUserController::class, 'accept'])->name('vendor.invitation.accept');

  // Route::post('/seller/{vendor_invitation}/decline', [VendorInvitationController::class, 'decline'])->name('vendor.invitation.decline');
});
