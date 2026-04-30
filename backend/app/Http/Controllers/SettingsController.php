<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Illuminate\Validation\ValidationException;

class SettingsController extends Controller
{
    public function updateLogo(Request $request)
    {
        try {
            $request->validate([
                'logo' => 'required|image|max:2048', // 2MB Max
            ]);

            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $file = $request->file('logo');
            $uploadApi = $cloudinary->uploadApi();
            
            $response = $uploadApi->upload($file->getRealPath(), [
                'folder' => 'smartinvoice_logos',
                'format' => 'png',
            ]);

            $logoUrl = $response['secure_url'];

            $user = $request->user();
            $user->update([
                'logo_url' => $logoUrl,
                'logo_path' => $logoUrl,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Logo mis à jour avec succès',
                'data' => [
                    'logo_url' => $logoUrl
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi vers Cloudinary',
                'errors' => []
            ], 500);
        }
    }

    public function getSettings(Request $request)
    {
        $user = $request->user();
        $recentPayment = \App\Models\Paiement::where('user_id', $user->id)
            ->latest('date_transaction')
            ->first();

        return response()->json([
            'success' => true,
            'message' => 'Paramètres récupérés avec succès',
            'data' => [
                'user' => $user,
                'recent_payment' => $recentPayment
            ]
        ]);
    }

    public function updateSettings(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $request->user()->id,
                'type_entreprise' => 'nullable|string|max:255',
                'ice' => 'nullable|string|max:255',
                'patente' => 'nullable|string|max:255',
                'taux_tva_defaut' => 'nullable|string|max:255',
                'adresse_siege' => 'nullable|string|max:255',
            ]);

            $user = $request->user();
            $user->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Paramètres mis à jour avec succès',
                'data' => $user
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        }
    }
}
