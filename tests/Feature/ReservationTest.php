<?php

use App\Http\Middleware\VendorMember;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorOwner;

// $seller = User::factory()->vendor_owner()->create();
// $vendor = Vendor::factory()->create([
//         "name"=> "Somalia",
//     ]);
// $vendor_owner = VendorOwner::factory()->create([
//     "user_id" => $seller->id,
//     "vendor_id"=> $vendor->id,
// ]);

test('seller can create a reservation', function () {
    $seller = User::factory()->vendor_owner()->create();
    $vendor = Vendor::factory()->create([
            "name"=> "Somalia",
        ]);
    $vendor_owner = VendorOwner::factory()->create([
        "user_id" => $seller->id,
        "vendor_id"=> $vendor->id,
    ]);
    $vendor->members()->create([
      'user_id' => $seller->id,
      'email' => $seller->email,
      'role' => 'owner'
    ]);

    $response = $this->actingAs($seller)
        ->post(route('seller.reservations.store',['vendor'=> $vendor->id]),[
            'name' => 'tests',
            'summary' => 'this is a test reservation',
            'description' => 'best reservation',
            'price' => 50000,
            'duration' => 10,
            'session_duration' => 60,
            'start' => '8:00',
            'end' => '17:00',
            'status' => true
        ])
        ->assertRedirect(route('seller.reservations', ['vendor' => $vendor->id]));

        $reservation = Reservation::latest('id')->first();
        expect($reservation->name)->toBe('tests'); 
});

test('reservation creation validation errors', function () {
    // Set up seller, vendor, vendor owner and membership
    $seller = User::factory()->vendor_owner()->create();
    $vendor = Vendor::factory()->create([
        "name" => "Somalia",
    ]);
    VendorOwner::factory()->create([
        "user_id" => $seller->id,
        "vendor_id" => $vendor->id,
    ]);
    $vendor->members()->create([
        'user_id' => $seller->id,
        'email' => $seller->email,
        'role' => 'owner'
    ]);

    // Make request with invalid data to trigger validation errors
    $response = $this->actingAs($seller)
        ->post(route('seller.reservations.store', ['vendor' => $vendor->id]), [
            'name' => '', // required
            'summary' => str_repeat('a', 300), // max 255
            'description' => null,
            'price' => 100, // min 50000
            'duration' => 5, // min 7
            'session_duration' => 10, // min 30
            'start' => '18:00', // should be before end
            'end' => '08:00', // should be after start
            'status' => 'not-a-boolean' // should be boolean
        ]);

    // Assert response contains validation errors
    $response->assertSessionHasErrors([
        'name',
        'summary',
        'price',
        'duration',
        'session_duration',
        'start',
        'end',
        'status',
    ]);
});

