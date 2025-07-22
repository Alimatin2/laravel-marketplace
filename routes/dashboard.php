<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Vendor\VendorController;
use App\Models\Order;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
      return Inertia::render('dashboard/index', [
        'orders' => Order::where('user_id', auth()->user()->id)->get(),
      ]);
  })->name('dashboard');

  Route::get('dashboard/vendors', [VendorController::class, 'index'])->name('dashboard.vendors');

  Route::get('dashboard/orders', [OrderController::class, 'index'])->name('orders');

  Route::get('dashboard/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

  Route::get('dashboard/bookings', [BookingController::class, 'index'])->name('bookings');

  Route::get('dashboard/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');

  Route::get('/dashboard/notifications', [NotificationController::class, 'index'])->name('notifications');
});
