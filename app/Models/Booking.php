<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'reservation_id',
        'user_id',
        'notes',
        'date',
        'hour',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function vendor()
    {
        return $this->hasOneThrough(Vendor::class, Reservation::class);
    }
}
