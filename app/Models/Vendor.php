<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status'
    ];

    public function members()
    {
        return $this->hasMany(VendorMember::class);
    }

    public function invitations()
    {
        return $this->hasMany(VendorInvitation::class);
    }

    public function owner()
    {
        return $this->hasOne(VendorOwner::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function bookings()
    {
        return $this->hasManyThrough(Booking::class, Reservation::class);
    }
}
