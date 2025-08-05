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
    ){}

    public function index()
    {
        $vendors = auth()->user()->vendors()->with(['owner'])->get();
            
        return Inertia::render('dashboard/seller/index', compact('vendors'));
    }

    public function create(Request $request)
    {
        return Inertia::render('dashboard/seller/create');
    }

    public function store(StoreVendorRequest $request)
    {
        //This function runs through the vendor creation middleware
        $validated = $request->validated();

        $this->vendorService->create($validated);

        return to_route('dashboard.vendors');
    }

    public function show(Vendor $vendor)
    {  
        $vendor->load(['owner']);

        return Inertia::render('seller/index', [
            'vendor' => $vendor,
        ]);
    }
}
