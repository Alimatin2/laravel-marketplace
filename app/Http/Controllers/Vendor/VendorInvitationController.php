<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\VendorInvitation;
use App\Services\VendorService;

class VendorInvitationController extends Controller
{
    public function __construct(
        protected VendorService $vendorService,
    ){}

    public function accept(VendorInvitation $vendor_invitation)
    {
        $this->vendorService->createMember($vendor_invitation);

        return to_route('notifications');
    }

    public function decline()
    {
        
    }
}
