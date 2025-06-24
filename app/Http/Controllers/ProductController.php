<?php

namespace App\Http\Controllers;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        protected ProductRepository $products,
    ){}

    public function index()
    {
        $products = $this->products->getAllActiveSorted();

        return Inertia::render('products/index', ['products' => $products]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', ['product' => $product]);
    }
}
