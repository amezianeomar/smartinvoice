<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SuperAdminController;

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:6,1');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/user/logo', [SettingsController::class, 'updateLogo']);
    Route::get('/settings', [SettingsController::class, 'getSettings']);
    Route::put('/settings', [SettingsController::class, 'updateSettings']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/onboarding', [OnboardingController::class, 'saveOnboarding']);
    Route::post('/select-plan', [OnboardingController::class, 'selectPlan']);
    
    // Admin Routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/dashboard-stats', [SuperAdminController::class, 'getDashboardStats']);
        Route::get('/users', [SuperAdminController::class, 'getUsers']);
        Route::get('/ledger', [SuperAdminController::class, 'getLedger']);
        Route::get('/reports', [SuperAdminController::class, 'getFinancialReports']);
    });
    
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('clients', ClientController::class);
    
    // Subscription endpoints
    Route::post('/subscription/checkout', [SubscriptionController::class, 'checkout']);
    Route::post('/subscription/success', [SubscriptionController::class, 'success']);

    // Invoice Extra Endpoints
    Route::get('invoices/{invoice}/pdf', [InvoiceController::class, 'generatePdf']);
    Route::post('invoices/{invoice}/send-email', [InvoiceController::class, 'sendEmail']);
    
    // Protected Invoice Routes
    Route::apiResource('invoices', InvoiceController::class)->except(['index', 'show'])->middleware('subscription');
    Route::apiResource('invoices', InvoiceController::class)->only(['index', 'show']);
});
