<?php

namespace App\Http\Middleware;

use App\Models\Vendor;
use App\Models\VendorOwner;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class VendorCreationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $vendor = VendorOwner::where('user_id', $user->id)->get();
        
        if($vendor->toArray()) {
            if($request->isMethod('GET')) {
                return to_route('dashboard.vendors');
            }
            return response()->json([
                'message' => 'User already owns a vendor!',
            ], 403);
        }

        return $next($request);
    }
}
