<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Client;
use App\Mail\InvoiceMail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
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
        $user = auth()->user();
        if (empty($user->nom) || empty($user->adresse_siege) || empty($user->ice) || empty($user->patente)) {
            return response()->json([
                'success' => false,
                'message' => 'Profile incomplet. Veuillez remplir vos informations légales (ICE, Patente, Adresse) pour générer une facture.',
                'error_code' => 'INCOMPLETE_PROFILE',
                'errors' => []
            ], 403);
        }

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
                'items.*.taux_tva' => 'required|numeric|min:0|max:100',
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
            $total_tva = 0;

            foreach ($validated['items'] as $itemData) {
                $montant_ligne = $itemData['quantite'] * $itemData['prix_unitaire'];
                $total_ht += $montant_ligne;
                
                $ligne_tva = $montant_ligne * ($itemData['taux_tva'] / 100);
                $total_tva += $ligne_tva;

                $invoice->invoiceItems()->create([
                    'designation' => $itemData['designation'],
                    'quantite' => $itemData['quantite'],
                    'prix_unitaire' => $itemData['prix_unitaire'],
                    'taux_tva' => $itemData['taux_tva'],
                    'montant_ligne' => $montant_ligne,
                ]);
            }

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
            'data' => $invoice->load('invoiceItems', 'client', 'user')
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $user = auth()->user();
        if (empty($user->nom) || empty($user->adresse_siege) || empty($user->ice) || empty($user->patente)) {
            return response()->json([
                'success' => false,
                'message' => 'Profile incomplet. Veuillez remplir vos informations légales (ICE, Patente, Adresse) pour générer une facture.',
                'error_code' => 'INCOMPLETE_PROFILE',
                'errors' => []
            ], 403);
        }

        if ($invoice->user_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        if (in_array(strtolower($invoice->statut), ['payee', 'payée'])) {
            return response()->json(['success' => false, 'message' => 'Cannot edit a paid invoice', 'errors' => []], 403);
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
                'items.*.taux_tva' => 'required|numeric|min:0|max:100',
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
                $total_tva = 0;

                foreach ($validated['items'] as $itemData) {
                    $montant_ligne = $itemData['quantite'] * $itemData['prix_unitaire'];
                    $total_ht += $montant_ligne;

                    $ligne_tva = $montant_ligne * ($itemData['taux_tva'] / 100);
                    $total_tva += $ligne_tva;

                    $invoice->invoiceItems()->create([
                        'designation' => $itemData['designation'],
                        'quantite' => $itemData['quantite'],
                        'prix_unitaire' => $itemData['prix_unitaire'],
                        'taux_tva' => $itemData['taux_tva'],
                        'montant_ligne' => $montant_ligne,
                    ]);
                }

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
                'data' => $invoice->load('invoiceItems', 'client', 'user')
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

        $logoData = null;
        if ($invoice->user && $invoice->user->logo_url) {
            $logoData = Cache::remember('user_logo_b64_' . $invoice->user->id, 86400, function () use ($invoice) {
                $context = stream_context_create(['http' => ['timeout' => 3]]);
                $image = @file_get_contents($invoice->user->logo_url, false, $context);
                return $image ? 'data:image/png;base64,' . base64_encode($image) : null;
            });
        }

        $pdf = Pdf::loadView('pdf.invoice', compact('invoice', 'logoData'));

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

        $user = auth()->user();
        $cacheKey = "user_emails_sent_" . $user->id;
        $sentTimestamps = [];

        // Quota check for free users: maximum 3 emails per rolling 24 hours
        if ($user->statut_abonnement !== 'actif') {
            $sentTimestamps = Cache::get($cacheKey, []);
            $now = time();
            $oneDayAgo = $now - 86400;

            // Filter out timestamps older than 24 hours
            $sentTimestamps = array_filter($sentTimestamps, function ($timestamp) use ($oneDayAgo) {
                return $timestamp >= $oneDayAgo;
            });

            if (count($sentTimestamps) >= 3) {
                return response()->json([
                    'message' => 'Payment required to access this feature.',
                    'error' => 'quota_exceeded'
                ], 403);
            }
        }

        try {
            $invoice->load('client', 'invoiceItems', 'user');

            $logoData = null;
            if ($invoice->user && $invoice->user->logo_url) {
                $logoData = Cache::remember('user_logo_b64_' . $invoice->user->id, 86400, function () use ($invoice) {
                    $context = stream_context_create(['http' => ['timeout' => 3]]);
                    $image = @file_get_contents($invoice->user->logo_url, false, $context);
                    return $image ? 'data:image/png;base64,' . base64_encode($image) : null;
                });
            }

            $pdf = Pdf::loadView('pdf.invoice', compact('invoice', 'logoData'));
            $pdfContent = $pdf->output();

            Mail::to($invoice->client->email)->send(new InvoiceMail($invoice, $pdfContent));

            // update invoice status to sent (envoyee)
            $invoice->update(['statut' => 'envoyee']);

            // Persist the email count if successfully sent
            if ($user->statut_abonnement !== 'actif') {
                $sentTimestamps[] = time();
                Cache::put($cacheKey, array_values($sentTimestamps), 86400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Invoice sent successfully',
                'data' => null
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Mail failed', 'message' => $e->getMessage()], 500);
        }
    }
}
