<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'summary',
        'description',
        'start',
        'end',
        'off_days',
        'exp_date',
        'status',
        'vendor_id'
    ];

    protected $casts = [
        'off_days' => 'array',
        'status' => 'boolean'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
