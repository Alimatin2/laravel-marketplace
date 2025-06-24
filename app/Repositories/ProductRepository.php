<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function getAllActiveSorted()
    {
        return Product::where('is_active', true)->get();
    }

    public function update(Product $product, array $data)
    {
        return $product->update($data);
    }

    public function decreamentStock(Product $product, $amount)
    {
        return Product::where('product_id', $product->id)->decrement('stock', $amount);
    }
}