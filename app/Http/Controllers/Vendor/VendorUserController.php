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
        protected VendorRepository $vendors,
        protected VendorService $vendorService,
    ){}

    public function index(Vendor $vendor)
    {
        $invitations = $vendor->invitations;
        $members = $vendor->members;

        $users = $invitations->merge($members);

        foreach($users as $user) {
            $user->user;
        }

        return Inertia::render('seller/users/index', [
            'vendor' => $vendor,
            'users' => $users,
        ]);
    }

    public function create(Vendor $vendor)
    {
        return Inertia::render('seller/users/create', [
            'vendor' => $vendor,
        ]);
    }

    public function store(Vendor $vendor, InviteVendorMemberRequest $request)
    {
        $validated = $request->validated();

        $invitation = $this->vendorService->inviteMember($vendor, $validated);

        event(new NotificationEvent($invitation, $invitation->user_id));

        return to_route('dashboard');
    }
    public function accept(VendorInvitation $vendor_invitation)
    {
        $this->vendorService->createMember($vendor_invitation);

        return to_route('notifications');
    }
}
