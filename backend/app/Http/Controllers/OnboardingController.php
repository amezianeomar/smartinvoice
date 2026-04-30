<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function saveOnboarding(Request $request)
    {
        $validatedData = $request->validate([
            'profession' => 'required|string|max:255',
            'type_entreprise' => 'required|string|max:255',
            'objectif_principal' => 'required|string|max:255',
        ]);

        $user = $request->user();
        
        $user->update([
            'profession' => $validatedData['profession'],
            'type_entreprise' => $validatedData['type_entreprise'],
            'objectif_principal' => $validatedData['objectif_principal'],
        ]);

        return response()->json([
            'message' => 'Onboarding data saved successfully',
            'user' => $user
        ]);
    }

    public function selectPlan(Request $request)
    {
        $validatedData = $request->validate([
            'abonnement' => 'required|string|max:255',
        ]);

        $user = $request->user();

        $user->update([
            'abonnement' => $validatedData['abonnement'],
        ]);

        return response()->json([
            'message' => 'Plan updated successfully',
            'user' => $user
        ]);
    }
}
