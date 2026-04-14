<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// For testing the PDF design visually in browser:
Route::get('/invoice', function(){
    // Fetch a real seeded invoice so the blade template has data to display
    $invoice = \App\Models\Invoice::with('client', 'invoiceItems')->first();
    
    // If no invoices exist, abort or handle gracefully
    if (!$invoice) {
        return "Please run php artisan db:seed first so there is at least one invoice.";
    }

    return view('pdf.invoice', compact('invoice'));
});