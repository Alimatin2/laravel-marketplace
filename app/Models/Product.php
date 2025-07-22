<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Product extends Model
{

    use HasFactory;
    protected $fillable = ['name', 'description', 'price', 'stock', 'image', 'discount', 'is_active'];

    public function getDiscountedPriceAttribute()
    {
        if ($this->discount) {
            return $this->price - ($this->price * $this->discount / 100);
        }
        return null;
    }

    protected $appends = ['discounted_price'];

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
