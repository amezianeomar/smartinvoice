<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    /**
     * Redirect the user to the provider's authentication page.
     */
    public function redirect($provider)
    {
        $validatedProvider = $this->validateProvider($provider);

        return Socialite::driver($validatedProvider)->stateless()->redirect();
    }

    /**
     * Obtain the user information from the provider.
     */
    public function callback($provider)
    {
        $validatedProvider = $this->validateProvider($provider);

        try {
            $socialUser = Socialite::driver($validatedProvider)->stateless()->user();
            
            // Check if user already exists
            $user = User::where('email', $socialUser->getEmail())->first();

            if ($user) {
                // If user exists but doesn't have provider set, link it
                if (!$user->provider_id) {
                    $user->update([
                        'provider' => $validatedProvider,
                        'provider_id' => $socialUser->getId(),
                    ]);
                }
            } else {
                // Create new user
                $user = User::create([
                    'nom' => $socialUser->getName() ?? 'Utilisateur',
                    'email' => $socialUser->getEmail(),
                    'provider' => $validatedProvider,
                    'provider_id' => $socialUser->getId(),
                    'mot_de_passe' => null,
                ]);
            }

            // Create a token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect back to frontend with the token
            // Get frontend URL from config
            $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
            return redirect()->to($frontendUrl . '/oauth/callback?token=' . urlencode($token));

        } catch (\Exception $e) {
            // Log the error
            \Log::error('OAuth Callback Error: ' . $e->getMessage());
            $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
            return redirect()->to($frontendUrl . '/login?error=' . urlencode('Authentication failed. Please try again.'));
        }
    }

    /**
     * Ensure the provider is supported.
     */
    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['google', 'azure'])) {
            abort(404, 'Provider not supported');
        }

        return $provider;
    }
}
