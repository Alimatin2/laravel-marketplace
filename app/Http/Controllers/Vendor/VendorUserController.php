<?php

namespace App\Http\Controllers\Vendor;

use App\Events\NotificationEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\InviteVendorMemberRequest;
use App\Models\Vendor;
use App\Models\VendorInvitation;
use App\Repositories\VendorRepository;
use App\Services\VendorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorUserController extends Controller
{
    public function __construct(
        protected VendorService $vendorService,
    ){}

    public function index(Vendor $vendor)
    {
        $members = $vendor->members()->with(['user'])->get();

        return Inertia::render('seller/members/index', [
            'vendor' => $vendor,
            'members' => $members,
        ]);
    }

    public function indexInvitations(Vendor $vendor)
    {
        $invitations = $vendor->invitations()->with(['user'])->get();

        return Inertia::render('seller/invitations/index', compact('invitations', 'vendor'));
    }

    public function create(Vendor $vendor)
    {
        return Inertia::render('seller/invitations/create', [
            'vendor' => $vendor,
        ]);
    }

    public function store(Vendor $vendor, InviteVendorMemberRequest $request)
    {
        $validated = $request->validated();

        $invitation = $this->vendorService->inviteMember($vendor, $validated);

        event(new NotificationEvent($invitation, $invitation->user_id));

        return to_route('dashboard.vendors');
    }
    public function accept(VendorInvitation $vendor_invitation)
    {
        $this->vendorService->createMember($vendor_invitation);

        return to_route('notifications');
    }
}
