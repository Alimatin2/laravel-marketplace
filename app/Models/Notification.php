<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $appends = ['message'];
    public function getMessageAttribute()
    {
        return match($this->reference_type) {
            VendorInvitation::class => "You have been invited to vendor " . $this->reference?->vendor->name,
            default => "You have a notification but an error has occured.",
        };
    }
    public function reference()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
