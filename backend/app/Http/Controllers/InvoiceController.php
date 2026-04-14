<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('client')->where('user_id', auth()->id())->latest()->get();
        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'numero' => 'required|string|unique:invoices,numero',
            'date_emission' => 'required|date',
            'date_echeance' => 'required|date|after_or_equal:date_emission',
            'statut' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.designation' => 'required|string|max:255',
            'items.*.quantite' => 'required|integer|min:1',
            'items.*.prix_unitaire' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Make sure the client belongs to the user
            $client = \App\Models\Client::find($validated['client_id']);
            if ($client->user_id !== auth()->id()) {
                return response()->json(['message' => 'Invalid client selected'], 403);
            }

            $invoice = Invoice::create([
                'user_id' => auth()->id(),
                'client_id' => $validated['client_id'],
                'numero' => $validated['numero'],
                'date_emission' => $validated['date_emission'],
                'date_echeance' => $validated['date_echeance'],
                'statut' => $validated['statut'] ?? 'brouillon',
                'total_ht' => 0,
                'total_tva' => 0,
                'total_ttc' => 0,
            ]);

            $total_ht = 0;

            foreach ($validated['items'] as $itemData) {
                $montant_ligne = $itemData['quantite'] * $itemData['prix_unitaire'];
                $total_ht += $montant_ligne;

                $invoice->invoiceItems()->create([
                    'designation' => $itemData['designation'],
                    'quantite' => $itemData['quantite'],
                    'prix_unitaire' => $itemData['prix_unitaire'],
                    'montant_ligne' => $montant_ligne,
                ]);
            }

            $total_tva = $total_ht * 0.20;
            $total_ttc = $total_ht + $total_tva;

            $invoice->update([
                'total_ht' => $total_ht,
                'total_tva' => $total_tva,
                'total_ttc' => $total_ttc,
            ]);

            DB::commit();

            return response()->json($invoice->load('invoiceItems', 'client'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error creating invoice: ' . $e->getMessage()], 500);
        }
    }

    public function show(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($invoice->load('invoiceItems', 'client'));
    }

    public function update(Request $request, Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'client_id' => 'sometimes|required|exists:clients,id',
            'numero' => 'sometimes|required|string|unique:invoices,numero,' . $invoice->id,
            'date_emission' => 'sometimes|required|date',
            'date_echeance' => 'sometimes|required|date|after_or_equal:date_emission',
            'statut' => 'nullable|string',
            'items' => 'sometimes|required|array|min:1',
            'items.*.designation' => 'required|string|max:255',
            'items.*.quantite' => 'required|integer|min:1',
            'items.*.prix_unitaire' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            if (isset($validated['client_id'])) {
                $client = \App\Models\Client::find($validated['client_id']);
                if ($client->user_id !== auth()->id()) {
                    return response()->json(['message' => 'Invalid client selected'], 403);
                }
            }

            $invoice->update($request->only(['client_id', 'numero', 'date_emission', 'date_echeance', 'statut']));

            if ($request->has('items')) {
                // For V1, the simplest way is to delete old and insert new ones
                $invoice->invoiceItems()->delete();

                $total_ht = 0;

                foreach ($validated['items'] as $itemData) {
                    $montant_ligne = $itemData['quantite'] * $itemData['prix_unitaire'];
                    $total_ht += $montant_ligne;

                    $invoice->invoiceItems()->create([
                        'designation' => $itemData['designation'],
                        'quantite' => $itemData['quantite'],
                        'prix_unitaire' => $itemData['prix_unitaire'],
                        'montant_ligne' => $montant_ligne,
                    ]);
                }

                $total_tva = $total_ht * 0.20;
                $total_ttc = $total_ht + $total_tva;

                $invoice->update([
                    'total_ht' => $total_ht,
                    'total_tva' => $total_tva,
                    'total_ttc' => $total_ttc,
                ]);
            }

            DB::commit();

            return response()->json($invoice->load('invoiceItems', 'client'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error updating invoice: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $invoice->delete();

        return response()->json(null, 204);
    }
}
