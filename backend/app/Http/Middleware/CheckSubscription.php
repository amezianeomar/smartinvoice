<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // If the user has an active subscription, let them pass
        if ($user && $user->statut_abonnement === 'actif') {
            return $next($request);
        }

        // If not active, enforce quota on POST (creation) requests
        if ($request->isMethod('post')) {
            $invoiceCount = $user->invoices()->where('created_at', '>=', now()->subDay())->count();

            if ($invoiceCount >= 3) {
                return response()->json([
                    'message' => 'Payment required to access this feature.',
                    'error' => 'quota_exceeded'
                ], 403);
            }
        }

        return $next($request);
    }
}
