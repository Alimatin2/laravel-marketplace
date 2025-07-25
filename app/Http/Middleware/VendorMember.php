<?php

namespace App\Http\Middleware;

use App\Models\Vendor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VendorMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $vendor = Vendor::find($request->route('vendor'))->first();
        $user = auth()->user();

        if (!$user->vendors->contains('id', $vendor->id)) {
            return redirect()->route('dashboard.vendors');
        }

        return $next($request);
    }
}
