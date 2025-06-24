<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Vendor;
use App\Repositories\ProductRepository;
use App\Repositories\VendorRepository;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function __construct(
        protected VendorRepository $vendors,
        protected ProductRepository $products,
    ){}

    public function index(Vendor $vendor)
    {
        return Inertia::render('seller/products/index', [
            'products' => $vendor->products,
            'vendor' => $vendor,
        ]);
    }

    public function create(Vendor $vendor)
    {
        return Inertia::render('seller/products/create', [
            'vendor' => $vendor,
        ]);
    }

    public function store(Vendor $vendor, StoreProductRequest $request)
    {
        $validated = $request->validated();
        $this->vendors->createProduct($vendor, $validated);

        return to_route('seller.products', ['vendor' => $vendor]);
    }

    public function edit(Vendor $vendor, Product $product)
    {
        return Inertia::render('seller/products/edit', [
            'vendor' => $vendor,
            'product' => $product
        ]);
    }

    public function update(Vendor $vendor, Product $product, UpdateProductRequest $request)
    {
        $validated = $request->validated();
        $this->products->update($product, $validated);

        return to_route('seller.dashboard', ['vendor' => $vendor]);
    }
}
