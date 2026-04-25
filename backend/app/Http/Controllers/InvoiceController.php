<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Client;
use App\Mail\InvoiceMail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with('client')->where('user_id', auth()->id());

        // Filtering logic
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->has('date_from')) {
            $query->whereDate('date_emission', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('date_emission', '<=', $request->date_to);
        }

        $invoices = $query->latest('date_emission')->get();

        return response()->json([
            'success' => true,
            'message' => 'Invoices retrieved successfully',
            'data' => $invoices
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'client_id' => 'required|exists:clients,id',
                'numero' => 'required|string|unique:invoices,numero',
                'date_emission' => 'required|date',
                'date_echeance' => 'required|date|after_or_equal:date_emission',
                'statut' => 'nullable|string',
                'notes' => 'nullable|string',
                'items' => 'required|array|min:1',
                'items.*.designation' => 'required|string|max:255',
                'items.*.quantite' => 'required|integer|min:1',
                'items.*.prix_unitaire' => 'required|numeric|min:0',
            ]);

            DB::beginTransaction();

            $client = Client::find($validated['client_id']);
            if ($client->user_id !== auth()->id()) {
                DB::rollBack();
                return response()->json(['success' => false, 'message' => 'Invalid client selected', 'errors' => []], 403);
            }

            $invoice = Invoice::create([
                'user_id' => auth()->id(),
                'client_id' => $validated['client_id'],
                'numero' => $validated['numero'],
                'date_emission' => $validated['date_emission'],
                'date_echeance' => $validated['date_echeance'],
                'statut' => $validated['statut'] ?? 'brouillon',
                'notes' => $validated['notes'] ?? null,
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

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'data' => $invoice->load('invoiceItems', 'client')
            ], 201);
            
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Error creating invoice', 'errors' => []], 500);
        }
    }

    public function show(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'data' => $invoice->load('invoiceItems', 'client')
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        try {
            $validated = $request->validate([
                'client_id' => 'sometimes|required|exists:clients,id',
                'numero' => 'sometimes|required|string|unique:invoices,numero,' . $invoice->id,
                'date_emission' => 'sometimes|required|date',
                'date_echeance' => 'sometimes|required|date|after_or_equal:date_emission',
                'statut' => 'nullable|string',
                'notes' => 'nullable|string',
                'items' => 'sometimes|required|array|min:1',
                'items.*.designation' => 'required|string|max:255',
                'items.*.quantite' => 'required|integer|min:1',
                'items.*.prix_unitaire' => 'required|numeric|min:0',
            ]);

            DB::beginTransaction();

            if (isset($validated['client_id'])) {
                $client = Client::find($validated['client_id']);
                if ($client->user_id !== auth()->id()) {
                    DB::rollBack();
                    return response()->json(['success' => false, 'message' => 'Invalid client selected', 'errors' => []], 403);
                }
            }

            $invoice->update($request->only(['client_id', 'numero', 'date_emission', 'date_echeance', 'statut', 'notes']));

            if ($request->has('items')) {
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

            return response()->json([
                'success' => true,
                'message' => 'Invoice updated successfully',
                'data' => $invoice->load('invoiceItems', 'client')
            ]);
            
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Error updating invoice', 'errors' => []], 500);
        }
    }

    public function destroy(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        $invoice->delete();

        return response()->json([
            'success' => true,
            'message' => 'Invoice deleted successfully',
            'data' => null
        ], 200);
    }

    public function generatePdf(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        $invoice->load('client', 'invoiceItems', 'user');

        $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));

        return $pdf->download('facture_' . $invoice->numero . '.pdf');
    }

    public function sendEmail(Invoice $invoice)
    {
        if ($invoice->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        if (!$invoice->client || !$invoice->client->email) {
            return response()->json(['success' => false, 'message' => 'Client has no email address', 'errors' => []], 400);
        }

        try {
            $invoice->load('client', 'invoiceItems', 'user');
            $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));
            $pdfContent = $pdf->output();

            Mail::to($invoice->client->email)->send(new InvoiceMail($invoice, $pdfContent));

            // update invoice status to sent (envoyee)
            $invoice->update(['statut' => 'envoyee']);

            return response()->json([
                'success' => true,
                'message' => 'Invoice sent successfully',
                'data' => null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invoice email',
                'errors' => []
            ], 500);
        }
    }
}
