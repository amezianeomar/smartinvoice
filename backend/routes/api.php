<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingsController;

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:6,1');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/user/logo', [SettingsController::class, 'updateLogo']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('clients', ClientController::class);
    
    // Invoice Extra Endpoints
    Route::get('invoices/{invoice}/pdf', [InvoiceController::class, 'generatePdf']);
    Route::post('invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail']);
    Route::apiResource('invoices', InvoiceController::class);
});
