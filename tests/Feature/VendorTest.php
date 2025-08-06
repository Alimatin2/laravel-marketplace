<?php

use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorOwner;

use function Pest\Laravel\actingAs;

test('user can create a vendor and cant create more afterwards', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/seller-form')
        ->assertStatus(200);

    $this->actingAs($user)
        ->post('/seller-form', [
            'name' => 'Test Vendor',
        ])
        ->assertRedirect(route('dashboard.vendors'));

    $latest_vendor = Vendor::latest('id')->first();

    expect($latest_vendor->name)->toBe('Test Vendor');

    $this->actingAs($user)
        ->get('/seller-form')
        ->assertRedirect(route('dashboard.vendors'));

    $this->actingAs($user)
        ->post('/seller-form', [
            'name' => 'Test Vendor',
        ])
        ->assertStatus(403);
});

test('vendor creation validation', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/seller-form', [
            'name' => '',
        ])
        ->assertInvalid('name');
});

test('user can visit own vendor', function () {
    $seller = User::factory()->vendor_owner()->create();
    $vendor = Vendor::factory()->create([
            "name"=> "Somalia",
        ]);
    $vendor_owner = VendorOwner::factory()->create([
        "user_id" => $seller->id,
        "vendor_id"=> $vendor->id,
    ]);

    $this->actingAs($seller)
        ->get(route('dashboard.vendors'))
        ->assertStatus(200)
        ->assertSee($seller->name);
});
