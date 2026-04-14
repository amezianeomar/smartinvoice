<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Client;
use App\Models\User;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        $dateEmission = fake()->dateTimeBetween('-1 year', 'now');
        $dateEcheance = (clone $dateEmission)->modify('+30 days');

        return [
            'user_id' => User::factory(),
            'client_id' => Client::factory(),
            'numero' => 'INV-' . strtoupper(fake()->unique()->bothify('????-####')),
            'date_emission' => $dateEmission->format('Y-m-d'),
            'date_echeance' => $dateEcheance->format('Y-m-d'),
            'total_ht' => 0,
            'total_tva' => 0,
            'total_ttc' => 0,
            'statut' => fake()->randomElement(['brouillon', 'envoyée', 'payée', 'annulée']),
        ];
    }
}
