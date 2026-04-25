<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $totalInvoices = Invoice::where('user_id', $userId)->count();

        $totalRevenue = Invoice::where('user_id', $userId)
            ->where('statut', '!=', 'annulée')
            ->sum('total_ttc');

        $recentInvoices = Invoice::with('client')
            ->where('user_id', $userId)
            ->latest('date_emission')
            ->take(5)
            ->get();

        $pendingAmount = Invoice::where('user_id', $userId)
            ->whereIn('statut', ['envoyée', 'en retard'])
            ->sum('total_ttc');

        // Grouping by YYYY-MM for simple charts (MySQL specific as requested)
        $monthlyStats = Invoice::select(
            DB::raw((DB::connection()->getDriverName() === 'sqlite' ? 'strftime("%Y-%m", date_emission)' : 'DATE_FORMAT(date_emission, "%Y-%m")') . ' as month'),
            DB::raw('SUM(total_ttc) as total'),
            DB::raw('SUM(CASE WHEN statut IN ("envoyée", "en retard", "payée") THEN total_ttc ELSE 0 END) as sent'),
            DB::raw('SUM(CASE WHEN statut = "payée" THEN total_ttc ELSE 0 END) as paid'),
            DB::raw('COUNT(id) as count')
        )
        ->where('user_id', $userId)
        ->where('statut', '!=', 'annulée')
        ->groupBy('month')
        ->orderBy('month', 'asc')
        ->limit(12)
        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Dashboard data retrieved successfully',
            'data' => [
                'total_invoices' => $totalInvoices,
                'total_revenue' => (float) $totalRevenue,
                'pending_amount' => (float) $pendingAmount,
                'recent_invoices' => $recentInvoices,
                'monthly_stats' => $monthlyStats
            ]
        ]);
    }
}
