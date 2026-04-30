<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paiement;

class SubscriptionController extends Controller
{
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'abonnement' => 'required|string',
        ]);

        // In a real application, you would generate a Stripe Payment Intent here.
        // For now, we return a simulated intent token.
        
        $amount = $validated['abonnement'] === 'pro' ? 199.00 : 0.00;

        return response()->json([
            'success' => true,
            'message' => 'Intent de paiement généré avec succès.',
            'data' => [
                'clientSecret' => 'pi_simulated_secret_' . uniqid(),
                'amount' => $amount,
                'abonnement' => $validated['abonnement']
            ]
        ]);
    }

    public function success(Request $request)
    {
        $validated = $request->validate([
            'abonnement' => 'required|string',
            'amount' => 'required|numeric',
        ]);

        $user = $request->user();

        // Simulate a successful payment and update the user's subscription
        $user->update([
            'statut_abonnement' => 'actif',
            'abonnement' => $validated['abonnement'],
            'date_renouvellement' => now()->addDays(30),
        ]);

        // Record the transaction
        $paiement = Paiement::create([
            'user_id' => $user->id,
            'montant' => $validated['amount'],
            'abonnement' => $validated['abonnement'],
            'statut' => 'payé',
            'date_transaction' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Paiement réussi, votre abonnement est maintenant actif.',
            'data' => [
                'user' => $user,
                'paiement' => $paiement
            ]
        ]);
    }
}
