<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\DashboardController;

// Quick Login Route to get a token for Postman testing
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->mot_de_passe)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('postman-testing')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
});

Route::get('/user', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'User profile retrieved',
        'data' => $request->user()
    ]);
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('clients', ClientController::class);
    
    // Invoice Extra Endpoints
    Route::get('invoices/{invoice}/pdf', [InvoiceController::class, 'generatePdf']);
    Route::post('invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail']);
    Route::apiResource('invoices', InvoiceController::class);
});
