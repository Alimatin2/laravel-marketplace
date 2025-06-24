<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Repositories\VendorRepository;
use Inertia\Inertia;

class VendorOrdersController extends Controller
{
    public function __construct(
        protected VendorRepository $vendors
    ){}

    public function index(Vendor $vendor)
    {
        return Inertia::render('seller/orders/index', [
            'orders' => $this->vendors->getOrders($vendor),
            'vendor' => $vendor
        ]);
    }
}
