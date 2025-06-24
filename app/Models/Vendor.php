<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner_id',
        'status'
    ];

    protected $appends = ['owner_name'];

    public function getOwnerNameAttribute()
    {
        return $this->owner->name;
    }

    // public function getUsersAttribute()
    // {
    //     $invitations = $this->invitations()->user;
    //     $members = $this->members()->user;

    //     $users = array_merge($invitations, $members);

    //     return $users;
    // }

    public function members()
    {
        return $this->hasMany(VendorMember::class);
    }

    public function invitations()
    {
        return $this->hasMany(VendorInvitation::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function bookings()
    {
        return $this->hasManyThrough(Booking::class, Reservation::class);
    }

    public function orders()
    {
        return $this->hasManyThrough(OrderDetail::class, Product::class);
    }
}
