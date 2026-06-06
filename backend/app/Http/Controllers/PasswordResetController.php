<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\ResetPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * Send a password reset link to the user.
     */
    public function sendResetLink(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->first();

            // For security, if the user doesn't exist, we return a success response 
            // but don't send any email.
            if ($user) {
                $token = Str::random(60);

                DB::table('password_reset_tokens')->updateOrInsert(
                    ['email' => $user->email],
                    [
                        'token' => Hash::make($token),
                        'created_at' => now()
                    ]
                );

                Mail::to($user->email)->send(new ResetPasswordMail($user, $token));
            }

            return response()->json([
                'success' => true,
                'message' => 'Si cette adresse email est enregistrée, un lien de réinitialisation vous a été envoyé.'
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
                'message' => 'Une erreur est survenue lors de la demande.',
                'errors' => []
            ], 500);
        }
    }

    /**
     * Reset the user's password.
     */
    public function reset(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();

            if (!$record || !Hash::check($request->token, $record->token)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le jeton de réinitialisation est invalide.',
                    'errors' => ['email' => ['Le jeton de réinitialisation ou l\'adresse email est invalide.']]
                ], 422);
            }

            // Check if token is expired (60 minutes)
            if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
                DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                return response()->json([
                    'success' => false,
                    'message' => 'Le jeton de réinitialisation a expiré.',
                    'errors' => ['email' => ['Le jeton de réinitialisation a expiré. Veuillez refaire une demande.']]
                ], 422);
            }

            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur introuvable.',
                    'errors' => ['email' => ['Utilisateur introuvable.']]
                ], 422);
            }

            // Update user password and clear token
            $user->update([
                'mot_de_passe' => Hash::make($request->password)
            ]);

            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Votre mot de passe a été réinitialisé avec succès.'
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
                'message' => 'Une erreur est survenue lors de la réinitialisation.',
                'errors' => []
            ], 500);
        }
    }
}
