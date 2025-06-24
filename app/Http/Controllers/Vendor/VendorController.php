<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorRequest;
use App\Models\Vendor;
use App\Repositories\VendorRepository;
use App\Services\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function __construct(
        protected VendorService $vendorService,
        protected VendorRepository $vendors
    ){}

    public function index()
    {
        return Inertia::render('dashboard/seller/index', [
            'vendors' => $this->vendorService->getBySeller(),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('dashboard/seller/create', [
            'status' => $request->session()->get('status')
        ]);
    }

    public function store(StoreVendorRequest $request)
    {
        $validated = $request->validated();

        $vendor = $this->vendorService->create($validated);

        return to_route('dashboard.vendors');
    }

    public function show(Vendor $vendor)
    {
        return Inertia::render('seller/index', [
            'vendor' => $vendor,
        ]);
    }
}
