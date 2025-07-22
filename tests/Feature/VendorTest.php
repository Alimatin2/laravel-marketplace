<?php

use App\Models\User;
use App\Models\Vendor;

use function Pest\Laravel\actingAs;

test('user can create a vendor', function () {
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
    expect($latest_vendor->owner_id)->toBe($user->id);
    expect($latest_vendor->status)->toBe('pending');
});

test('vendor owner cant create a vendor', function () {
    $user = User::factory()->seller()->create();
    $vendor = Vendor::factory()->create([
        'owner_id' => $user->id,
    ]);

    //This is bad behaviour from the app but whatever
    $this->actingAs($user)
        ->get('/seller-form')
        ->assertStatus(200);

    $this->actingAs($user)
        ->post('/seller-form', [
            'name' => 'Test Vendor',
        ])
        ->assertRedirect(route('seller.create'))
        ->assertSessionHas('status', 'User already owns a vendor.');
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
    $user = User::factory()->seller()->create();

    $vendor = Vendor::factory()->create([
        'owner_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard.vendors'))
        ->assertStatus(200)
        ->assertSee($user->name);
});
