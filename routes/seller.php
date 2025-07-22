<?php

use App\Http\Controllers\Vendor\VendorBookingsController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\Vendor\VendorReservationController;
use App\Http\Controllers\Vendor\VendorUserController;
use App\Http\Middleware\VendorCreationMiddleware;
use App\Http\Middleware\VendorMember;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/seller-form', [VendorController::class, 'create'])->name('seller.create');

  Route::post('/seller-form', [VendorController::class, 'store'])->middleware([VendorCreationMiddleware::class])->name('seller.store');




  Route::middleware([VendorMember::class])->group(function () {
    Route::get('/seller/{vendor}', [VendorController::class, 'show'])->name('seller.dashboard');

    Route::get('/seller/{vendor}/reservations', [VendorReservationController::class, 'index'])->name('seller.reservations');

    Route::get('/seller/{vendor}/reservations/create', [VendorReservationController::class, 'create'])->name('seller.reservations.create');

    Route::post('/seller/{vendor}/reservations', [VendorReservationController::class, 'store'])->name('seller.reservations.store');

    Route::get('/seller/{vendor}/r-{reservation}', [VendorReservationController::class, 'edit'])->name('seller.reservations.edit');

    Route::post('/seller/{vendor}/r-{reservation}', [VendorReservationController::class, 'update'])->name('seller.reservations.update');


    Route::get('/seller/{vendor}/users', [VendorUserController::class, 'index'])->name('seller.users');

    Route::get('/seller/{vendor}/users/invite', [VendorUserController::class, 'create'])->name('seller.users.create');

    Route::post('/seller/{vendor}/users', [VendorUserController::class, 'store'])->name('seller.users.store');


    Route::post('/seller/{vendor_invitation}/accept', [VendorUserController::class, 'accept'])->name('vendor.invitation.accept');

    // Route::post('/seller/{vendor_invitation}/decline', [VendorInvitationController::class, 'decline'])->name('vendor.invitation.decline');


    Route::get('/seller/{vendor}/bookings', [VendorReservationController::class, 'index'])->name('seller.bookings');
  });
});
