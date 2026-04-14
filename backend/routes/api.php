<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;

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
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('invoices', InvoiceController::class);
});
