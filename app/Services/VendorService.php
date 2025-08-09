<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorInvitation;
use App\Models\VendorMember;
use App\Models\VendorOwner;
use App\Repositories\VendorRepository;
use Illuminate\Validation\ValidationException;

class VendorService
{
  public function create(array $data)
  {
    $user = auth()->user();

    $vendor = $user->vendor()->create($data);

    $vendor->members()->create([
      'user_id' => $user->id,
      'email' => $user->email,
      'role' => 'owner'
    ]);

    VendorOwner::create([
      'user_id' => $user->id,
      'vendor_id' => $vendor->id
    ]);

    $user->update([
      "role" => "vendor_owner"
    ]);

    return $vendor;
  }

  public function inviteMember(Vendor $vendor, array $data)
  {
    $invitation = VendorInvitation::where('email', $data['email'])->first();
    $member = VendorMember::where('email', $data['email'])->first();

    if($invitation || $member) {
      throw ValidationException::withMessages([
        'email' => ['The user has already been invited to the vendor.']
      ]);
    }

    $user = User::where('email', $data['email'])->firstOrFail();

    $invitation = $vendor->invitations()->create([
      'user_id' => $user->id,
      'email' => $data['email']
    ]);

    return $invitation;
  }

  public function createMember(VendorInvitation $vendorInvitation)
  {
    $vendor = $vendorInvitation->vendor()->first();
    $user = User::where('id', $vendorInvitation->user_id)->first();

    $notification = Notification::where('reference_id', $vendorInvitation->id)
        ->where('reference_type', VendorInvitation::class)
        ->first();

    $vendor->members()->create([
      'user_id' => $user->id,
      'email' => $user->email
    ]);

    $vendorInvitation->update([
      'status' => 'accepted',
    ]);

    $notification->update([
      'action_taken' => 'Accepted',
    ]);

    $user->update([
      "role" => "seller"
    ]);

    return $vendor;
  }
}


