<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $client;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create([
            'nom' => 'Test Business',
            'adresse_siege' => '123 Test Street',
            'ice' => '123456789012345',
            'patente' => '98765432',
        ]);
        $this->client = Client::factory()->create(['user_id' => $this->user->id]);
    }

    public function test_user_can_create_invoice_and_calculate_totals_correctly()
    {
        $payload = [
            'client_id' => $this->client->id,
            'numero' => 'INV-TEST-001',
            'date_emission' => '2026-04-14',
            'date_echeance' => '2026-05-14',
            'statut' => 'brouillon',
            'items' => [
                [
                    'designation' => 'Web Design',
                    'quantite' => 2,
                    'prix_unitaire' => 1000,
                    'taux_tva' => 20
                ]
            ]
        ];

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/invoices', $payload);

        $response->assertStatus(201)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.total_ht', 2000)
                 ->assertJsonPath('data.total_tva', 400) // 20%
                 ->assertJsonPath('data.total_ttc', 2400)
                 ->assertJsonCount(1, 'data.invoice_items');

        $this->assertDatabaseHas('invoices', ['numero' => 'INV-TEST-001']);
    }

    public function test_user_with_incomplete_profile_is_blocked_from_creating_invoice()
    {
        $incompleteUser = User::factory()->create(); // missing legal info
        $client = Client::factory()->create(['user_id' => $incompleteUser->id]);

        $payload = [
            'client_id' => $client->id,
            'numero' => 'INV-TEST-002',
            'date_emission' => '2026-04-14',
            'date_echeance' => '2026-05-14',
            'statut' => 'brouillon',
            'items' => [
                [
                    'designation' => 'Web Design',
                    'quantite' => 2,
                    'prix_unitaire' => 1000,
                    'taux_tva' => 20
                ]
            ]
        ];

        $response = $this->actingAs($incompleteUser, 'sanctum')->postJson('/api/invoices', $payload);

        $response->assertStatus(403)
                 ->assertJsonPath('success', false)
                 ->assertJsonPath('error_code', 'INCOMPLETE_PROFILE');
    }

    public function test_dashboard_aggregates_are_accurate()
    {
        Invoice::factory(2)->create([
            'user_id' => $this->user->id,
            'client_id' => $this->client->id,
            'total_ttc' => 1200,
            'statut' => 'payée'
        ]);

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/dashboard');

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.total_invoices', 2)
                 ->assertJsonPath('data.total_revenue', 2400); 
    }
}
