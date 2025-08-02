<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)->get();

        return Inertia::render('products/index', ['products' => $products]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', ['product' => $product]);
    }
}
