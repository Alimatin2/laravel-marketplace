<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'phone', 'address', 'postal_code', 'authority'];

    public function getTotalPriceAttribute()
    {
        return $this->order_details->sum('price');
    }

    protected $appends = ['total_price'];

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
    
}
