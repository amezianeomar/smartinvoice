<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Paiement;

class SuperAdminController extends Controller
{
    public function getDashboardStats(Request $request)
    {
        $totalUsers = User::where('role', '!=', 'admin')->count();
        
        // Ensure to match 'payé' for the payment status
        $totalRevenue = Paiement::where('statut', 'payé')->sum('montant');
        
        // Ensure to match 'actif' for subscription status
        $activeSubscriptions = User::where('role', '!=', 'admin')->where('statut_abonnement', 'actif')->count();

        $recentUsers = User::where('role', '!=', 'admin')->latest()->take(5)->get();

        return response()->json([
            'success' => true,
            'message' => 'Admin dashboard stats retrieved successfully',
            'data' => [
                'total_users' => $totalUsers,
                'total_revenue' => $totalRevenue,
                'active_subscriptions' => $activeSubscriptions,
                'recent_users' => $recentUsers
            ]
        ]);
    }

    public function getUsers(Request $request)
    {
        $users = User::where('role', '!=', 'admin')->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function getLedger(Request $request)
    {
        $payments = Paiement::with('user')->orderBy('date_transaction', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    public function getFinancialReports(Request $request)
    {
        $monthlyRevenue = Paiement::where('statut', 'payé')
            ->selectRaw('SUM(montant) as total, DATE_FORMAT(date_transaction, "%Y-%m") as month')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();
            
        $totalRevenue = Paiement::where('statut', 'payé')->sum('montant');

        return response()->json([
            'success' => true,
            'data' => [
                'monthly' => $monthlyRevenue,
                'total' => $totalRevenue
            ]
        ]);
    }
}
