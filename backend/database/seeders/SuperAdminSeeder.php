<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@smartinvoice.com'],
            [
                'nom' => 'Super Admin',
                'mot_de_passe' => \Illuminate\Support\Facades\Hash::make('Admin123!'),
                'role' => 'admin',
                'statut_abonnement' => 'actif',
                'abonnement' => 'pro',
                // Filling profession and type_entreprise so the frontend completely bypasses the onboarding screen
                'profession' => 'Super Administrateur',
                'type_entreprise' => 'SmartInvoice HQ',
                'objectif_principal' => 'Gestion Plateforme'
            ]
        );
    }
}
