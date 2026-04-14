<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a main demo user
        $mainUser = User::factory()->create([
            'nom' => 'Demo User',
            'email' => 'demo@smartinvoice.com',
            'mot_de_passe' => Hash::make('password123'),
        ]);

        // 2. Create 10 clients for this user
        $clients = Client::factory(10)->create([
            'user_id' => $mainUser->id,
        ]);

        // 3. For each client, create 2 to 5 invoices
        foreach ($clients as $client) {
            $invoiceCount = rand(2, 5);
            
            for ($i = 0; $i < $invoiceCount; $i++) {
                $invoice = Invoice::factory()->create([
                    'user_id' => $mainUser->id,
                    'client_id' => $client->id,
                ]);

                // 4. For each invoice, create 1 to 4 items and calculate totals perfectly
                $itemsCount = rand(1, 4);
                $items = InvoiceItem::factory($itemsCount)->create([
                    'invoice_id' => $invoice->id,
                ]);

                $totalHt = $items->sum('montant_ligne');
                $totalTva = $totalHt * 0.20;
                $totalTtc = $totalHt + $totalTva;

                $invoice->update([
                    'total_ht' => $totalHt,
                    'total_tva' => $totalTva,
                    'total_ttc' => $totalTtc,
                ]);
            }
        }
    }
}
