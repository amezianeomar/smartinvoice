<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    /**
     * Handle an inbound sales inquiry from the landing page.
     *
     * 1. Validates the payload (422 on failure).
     * 2. Persists the lead to contact_messages table.
     * 3. Sends a plain-text notification email to the admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSalesEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'company' => 'required|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // 1. Persist the lead to the database first
        ContactMessage::create([
            'name'    => $data['name'],
            'email'   => $data['email'],
            'company' => $data['company'],
            'message' => $data['message'],
            // status defaults to 'nouveau' via the migration
        ]);

        // 2. Send admin notification email
        $body =
            "========================================\n" .
            "  New Business Lead — SmartInvoice Pro\n" .
            "========================================\n\n" .
            "Name    : {$data['name']}\n" .
            "Email   : {$data['email']}\n" .
            "Company : {$data['company']}\n\n" .
            "--- Message ---\n" .
            "{$data['message']}\n\n" .
            "========================================\n" .
            "Reply directly to: {$data['email']}\n";

        Mail::raw($body, function ($message) use ($data) {
            $message
                ->to('solaymangame2006@gmail.com', 'SmartInvoice Admin')
                ->subject("💼 Sales Inquiry from {$data['name']} — {$data['company']}")
                ->replyTo($data['email'], $data['name']);
        });

        return response()->json([
            'message' => 'Email sent successfully.',
        ], 200);
    }
}
