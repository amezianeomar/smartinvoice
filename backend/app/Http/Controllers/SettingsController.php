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
            $user->update(['logo_url' => $logoUrl]);

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
}
