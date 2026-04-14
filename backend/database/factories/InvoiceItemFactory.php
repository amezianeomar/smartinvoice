<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Invoice;

class InvoiceItemFactory extends Factory
{
    public function definition(): array
    {
        $quantite = fake()->numberBetween(1, 10);
        $prixUnitaire = fake()->randomFloat(2, 50, 1000);
        
        return [
            'invoice_id' => Invoice::factory(),
            'designation' => fake()->sentence(3),
            'quantite' => $quantite,
            'prix_unitaire' => $prixUnitaire,
            'montant_ligne' => $quantite * $prixUnitaire,
        ];
    }
}
