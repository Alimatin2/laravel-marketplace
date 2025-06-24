<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorInvitation;

class VendorRepository
{
  public function getBySeller(User $user)
  {
    return $user->vendors;
  }

  public function create(User $user, array $data)
  {
    return $user->vendors()->create($data);
  }

  public function createProduct(Vendor $vendor, array $data)
  {
    return $vendor->products()->create($data);
  }

  public function createReservation(Vendor $vendor, array $data)
  {
    return $vendor->reservations()->create($data);
  }

  public function createInvitation(Vendor $vendor, array $data)
  {
    return $vendor->invitations()->create($data);
  }

  public function createMember(Vendor $vendor, array $data)
  {
    return $vendor->members()->create($data);
  }

  public function updateInvitationStatus(VendorInvitation $vendorInvitation, string $data)
  {
    return $vendorInvitation->update([
      'status' => $data
    ]);
  }

  public function updateNotificationStatus(Notification $notification, array $data)
  {
    return $notification->update($data);
  }

  public function getOrders(Vendor $vendor)
  {
    return $vendor->orders;
  }

  public function getBookings(Vendor $vendor)
  {
    return $vendor->bookings;
  }
}
