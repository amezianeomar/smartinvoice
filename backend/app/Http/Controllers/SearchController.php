<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Invoice;

class SearchController extends Controller
{
    /**
     * Global search for clients and invoices.
     */
    public function search(Request $request)
    {
        $userId = auth()->id();
        $query = $request->input('query', '');

        if (empty(trim($query))) {
            return response()->json([
                'success' => true,
                'data' => [
                    'clients' => [],
                    'invoices' => []
                ]
            ]);
        }

        $clients = Client::where('user_id', $userId)
            ->where(function ($q) use ($query) {
                $q->where('nom', 'LIKE', "%{$query}%")
                  ->orWhere('email', 'LIKE', "%{$query}%")
                  ->orWhere('telephone', 'LIKE', "%{$query}%")
                  ->orWhere('adresse', 'LIKE', "%{$query}%");
            })
            ->limit(10)
            ->get();

        $clientIds = $clients->pluck('id')->toArray();

        // Pre-fetch invoice IDs matching items to avoid slow orWhereHas
        $itemInvoiceIds = \Illuminate\Support\Facades\DB::table('invoice_items')
            ->join('invoices', 'invoices.id', '=', 'invoice_items.invoice_id')
            ->where('invoices.user_id', $userId)
            ->where('invoice_items.designation', 'LIKE', "%{$query}%")
            ->limit(50)
            ->pluck('invoice_items.invoice_id')
            ->toArray();

        // Search invoices by multiple fields, related items, or matching client IDs
        $invoices = Invoice::with('client')
            ->where('user_id', $userId)
            ->where(function ($q) use ($query, $clientIds, $itemInvoiceIds) {
                $q->where('numero', 'LIKE', "%{$query}%")
                  ->orWhere('total_ht', 'LIKE', "%{$query}%")
                  ->orWhere('total_ttc', 'LIKE', "%{$query}%")
                  ->orWhere('statut', 'LIKE', "%{$query}%")
                  ->orWhere('notes', 'LIKE', "%{$query}%");
                
                if (!empty($clientIds)) {
                    $q->orWhereIn('client_id', $clientIds);
                }
                if (!empty($itemInvoiceIds)) {
                    $q->orWhereIn('id', $itemInvoiceIds);
                }
            })
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'clients' => $clients,
                'invoices' => $invoices
            ]
        ]);
    }
}
