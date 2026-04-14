<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_user_can_list_their_clients()
    {
        Client::factory(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/clients');

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonCount(3, 'data');
    }

    public function test_user_can_create_a_client()
    {
        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/clients', [
            'nom' => 'Test Corp',
            'email' => 'contact@testcorp.com',
            'telephone' => '123456789',
            'adresse' => '123 Test St.'
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('data.nom', 'Test Corp');

        $this->assertDatabaseHas('clients', ['nom' => 'Test Corp']);
    }
}
