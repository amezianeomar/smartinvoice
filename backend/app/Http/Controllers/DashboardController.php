<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Main dashboard widget data (used by Dashboard.jsx).
     * Scoped to the authenticated user.
     */
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
                'total_invoices'  => $totalInvoices,
                'total_revenue'   => (float) $totalRevenue,
                'pending_amount'  => (float) $pendingAmount,
                'recent_invoices' => $recentInvoices,
                'monthly_stats'   => $monthlyStats,
            ],
        ]);
    }

    /**
     * Detailed statistics for the Statistiques.jsx page.
     * ALL queries are strictly scoped to auth()->id() — no data leaks between users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserStats()
    {
        $userId = auth()->id();
        $year   = now()->year;

        // ── Revenue ──────────────────────────────────────────────────────────
        $totalRevenue = Invoice::where('user_id', $userId)
            ->where('statut', 'payée')
            ->sum('total_ttc');

        $pendingRevenue = Invoice::where('user_id', $userId)
            ->whereIn('statut', ['envoyée', 'en retard'])
            ->sum('total_ttc');

        // ── Counts ───────────────────────────────────────────────────────────
        $totalInvoices = Invoice::where('user_id', $userId)->count();

        $paidCount = Invoice::where('user_id', $userId)
            ->where('statut', 'payée')
            ->count();

        $pendingCount = Invoice::where('user_id', $userId)
            ->where('statut', 'envoyée')
            ->count();

        $overdueCount = Invoice::where('user_id', $userId)
            ->where('statut', 'en retard')
            ->count();

        $totalClients = Client::where('user_id', $userId)->count();

        // ── Monthly chart data (current year only) ───────────────────────────
        $isSqlite = DB::connection()->getDriverName() === 'sqlite';
        $monthRaw = $isSqlite
            ? 'strftime("%Y-%m", date_emission)'
            : 'DATE_FORMAT(date_emission, "%Y-%m")';

        $chartData = Invoice::select(
                DB::raw("{$monthRaw} as month"),
                DB::raw('SUM(CASE WHEN statut = "payée" THEN total_ttc ELSE 0 END) as paid'),
                DB::raw('SUM(CASE WHEN statut IN ("envoyée", "payée", "en retard") THEN total_ttc ELSE 0 END) as sent'),
                DB::raw('COUNT(id) as count')
            )
            ->where('user_id', $userId)
            ->where('statut', '!=', 'annulée')
            ->whereYear('date_emission', $year)
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // ── Derived metrics ──────────────────────────────────────────────────
        $unpaidRate = $totalInvoices > 0
            ? round(($overdueCount / $totalInvoices) * 100, 1)
            : 0;

        $paidPct    = $totalInvoices > 0 ? round(($paidCount    / $totalInvoices) * 100) : 0;
        $pendingPct = $totalInvoices > 0 ? round(($pendingCount / $totalInvoices) * 100) : 0;
        $overduePct = $totalInvoices > 0 ? max(0, 100 - $paidPct - $pendingPct)         : 0;

        return response()->json([
            'success' => true,
            'data' => [
                'total_revenue'   => (float) $totalRevenue,
                'pending_revenue' => (float) $pendingRevenue,
                'total_invoices'  => $totalInvoices,
                'total_clients'   => $totalClients,
                'paid_count'      => $paidCount,
                'pending_count'   => $pendingCount,
                'overdue_count'   => $overdueCount,
                'paid_pct'        => $paidPct,
                'pending_pct'     => $pendingPct,
                'overdue_pct'     => $overduePct,
                'unpaid_rate'     => $unpaidRate,
                'chart_data'      => $chartData,
            ],
        ]);
    }

    /**
     * Compute and return advanced metrics, Cash Flow, Donut Chart, and Current Year Line Chart.
     * All queries are strictly scoped to the authenticated user's ID.
     */
    public function getAdvancedStats()
    {
        $userId = auth()->id();
        $year   = now()->year;
        $currentMonth = now()->month;

        // ── 1. Cards statistics ──
        $revenus_encaisses = (float) Invoice::where('user_id', $userId)->where('statut', 'payée')->sum('total_ttc');
        $en_attente = (float) Invoice::where('user_id', $userId)->whereIn('statut', ['envoyée', 'en retard'])->sum('total_ttc');
        $total_factures = Invoice::where('user_id', $userId)->count();
        $clients_actifs = Client::where('user_id', $userId)->count();

        $total_sent = (float) Invoice::where('user_id', $userId)->whereIn('statut', ['payée', 'envoyée', 'en retard'])->sum('total_ttc');
        $taux_recouvrement = $total_sent > 0 ? round(($revenus_encaisses / $total_sent) * 100, 1) : 0.0;

        $overdueCount = Invoice::where('user_id', $userId)->where('statut', 'en retard')->count();
        $taux_impayes = $total_factures > 0 ? round(($overdueCount / $total_factures) * 100, 1) : 0.0;
        
        $couverture_clients = $clients_actifs > 0 ? round($total_factures / $clients_actifs, 1) : 0.0;

        // ── 2. Donut chart status distribution ──
        $paidCount = Invoice::where('user_id', $userId)->where('statut', 'payée')->count();
        $pendingCount = Invoice::where('user_id', $userId)->where('statut', 'envoyée')->count();

        $totalForChart = $paidCount + $pendingCount + $overdueCount;
        $paidPct = $totalForChart > 0 ? round(($paidCount / $totalForChart) * 100) : 0;
        $pendingPct = $totalForChart > 0 ? round(($pendingCount / $totalForChart) * 100) : 0;
        $overduePct = $totalForChart > 0 ? max(0, 100 - $paidPct - $pendingPct) : 0;

        $donut_chart = [
            ['name' => 'Payées', 'value' => (int) $paidPct],
            ['name' => 'En attente', 'value' => (int) $pendingPct],
            ['name' => 'En retard', 'value' => (int) $overduePct]
        ];

        // ── 3. Bar Chart & Line Chart preparation ──
        $invoices = Invoice::where('user_id', $userId)
            ->where('statut', '!=', 'annulée')
            ->select('statut', 'total_ttc', 'date_emission')
            ->get();

        // Cash flow (Last 6 Months bar chart)
        $bar_chart = [];
        for ($i = 5; $i >= 0; $i--) {
            $dt = now()->subMonths($i);
            $key = $dt->format('Y-m'); // "YYYY-MM" (e.g. "2026-05")
            $bar_chart[$key] = [
                'month' => $key,
                'total' => 0.0,
                'sent'  => 0.0,
                'paid'  => 0.0,
                'count' => 0
            ];
        }

        // Line Chart (Current year up to current month only!)
        $line_chart = [];
        for ($m = 1; $m <= $currentMonth; $m++) {
            $monthStr = str_pad($m, 2, '0', STR_PAD_LEFT);
            $key = "{$year}-{$monthStr}";
            $line_chart[$key] = [
                'month' => $key,
                'paid'  => 0.0
            ];
        }

        foreach ($invoices as $inv) {
            if (!$inv->date_emission) continue;
            try {
                $date = \Carbon\Carbon::parse($inv->date_emission);
                $ym = $date->format('Y-m');
                $val = (float) $inv->total_ttc;

                // Line chart (current year, up to current month)
                if ($date->year === $year && $date->month <= $currentMonth) {
                    if (isset($line_chart[$ym]) && $inv->statut === 'payée') {
                        $line_chart[$ym]['paid'] += $val;
                    }
                }

                // Bar chart (last 6 months)
                if (isset($bar_chart[$ym])) {
                    $bar_chart[$ym]['count']++;
                    $bar_chart[$ym]['total'] += $val;
                    if (in_array($inv->statut, ['payée', 'envoyée', 'en retard'])) {
                        $bar_chart[$ym]['sent'] += $val;
                    }
                    if ($inv->statut === 'payée') {
                        $bar_chart[$ym]['paid'] += $val;
                    }
                }
            } catch (\Exception $e) {
                // Skip errors
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'cards' => [
                    'revenus_encaisses'  => $revenus_encaisses,
                    'en_attente'         => $en_attente,
                    'total_factures'     => $total_factures,
                    'clients_actifs'     => $clients_actifs,
                    'taux_recouvrement'  => $taux_recouvrement,
                    'taux_impayes'       => $taux_impayes,
                    'couverture_clients' => $couverture_clients
                ],
                'donut_chart' => $donut_chart,
                'bar_chart'   => array_values($bar_chart),
                'line_chart'  => array_values($line_chart)
            ]
        ]);
    }
}
