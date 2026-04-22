<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceMail;
use Tests\TestCase;

class InvoiceEmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_send_invoice_email_successfully()
    {
        Mail::fake();

        $user = User::factory()->create([
            'nom' => 'Test User',
            'mot_de_passe' => bcrypt('password123'),
        ]);

        $client = Client::factory()->create([
            'user_id' => $user->id,
            'email' => 'client@example.com',
        ]);

        $invoice = Invoice::create([
            'user_id' => $user->id,
            'client_id' => $client->id,
            'numero' => 'INV-001',
            'date_emission' => now(),
            'date_echeance' => now()->addDays(7),
            'statut' => 'brouillon',
            'total_ht' => 100,
            'total_tva' => 20,
            'total_ttc' => 120,
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson("/api/invoices/{$invoice->id}/send-email");

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Invoice sent successfully'
        ]);

        $this->assertEquals('envoyee', $invoice->fresh()->statut);

        Mail::assertSent(InvoiceMail::class, function ($mail) use ($client) {
            return $mail->hasTo($client->email);
        });
    }
}
