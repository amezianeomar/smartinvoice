<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture {{ $invoice->numero }}</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #333; margin: 0; padding: 20px; }
        .header { display: table; width: 100%; margin-bottom: 40px; }
        .company-info { display: table-cell; width: 50%; }
        .invoice-details { display: table-cell; width: 50%; text-align: right; }
        .client-info { margin-bottom: 40px; padding: 15px; background: #f9f9f9; border-left: 4px solid #0052cc; }
        h1 { color: #0052cc; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #0052cc; color: #fff; }
        .totals { float: right; width: 300px; }
        .totals table th { background: transparent; color: #333; text-align: right; padding-right: 20px; width: 50%; }
        .totals table td { text-align: right; font-weight: bold; }
        .footer { clear: both; margin-top: 50px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-info">
            <h1>SmartInvoice Pro</h1>
            <p>123 Rue de la Startup<br>Casablanca, 20000<br>contact@smartinvoice.ma</p>
        </div>
        <div class="invoice-details">
            <h2>FACTURE</h2>
            <p><strong>N°:</strong> {{ $invoice->numero }}</p>
            <p><strong>Date d'émission:</strong> {{ \Carbon\Carbon::parse($invoice->date_emission)->format('d/m/Y') }}</p>
            <p><strong>Date d'échéance:</strong> {{ \Carbon\Carbon::parse($invoice->date_echeance)->format('d/m/Y') }}</p>
            <p><strong>Statut:</strong> {{ ucfirst($invoice->statut) }}</p>
        </div>
    </div>

    <div class="client-info">
        <h3>Facturé à:</h3>
        <p><strong>{{ $invoice->client->nom }}</strong></p>
        @if($invoice->client->email)<p>{{ $invoice->client->email }}</p>@endif
        @if($invoice->client->telephone)<p>{{ $invoice->client->telephone }}</p>@endif
        @if($invoice->client->adresse)<p>{{ nl2br(e($invoice->client->adresse)) }}</p>@endif
    </div>

    <table>
        <thead>
            <tr>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Montant</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->invoiceItems as $item)
            <tr>
                <td>{{ $item->designation }}</td>
                <td>{{ $item->quantite }}</td>
                <td>{{ number_format($item->prix_unitaire, 2, ',', ' ') }} DH</td>
                <td>{{ number_format($item->montant_ligne, 2, ',', ' ') }} DH</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr>
                <th>Total HT:</th>
                <td>{{ number_format($invoice->total_ht, 2, ',', ' ') }} DH</td>
            </tr>
            <tr>
                <th>TVA (20%):</th>
                <td>{{ number_format($invoice->total_tva, 2, ',', ' ') }} DH</td>
            </tr>
            <tr>
                <th>Total TTC:</th>
                <td style="font-size: 1.2em; color: #0052cc;">{{ number_format($invoice->total_ttc, 2, ',', ' ') }} DH</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p>Merci pour votre confiance. En cas de retard de paiement, des pénalités pourront être appliquées.</p>
        <p>Généré par SmartInvoice Pro (V1 PFE)</p>
    </div>
</body>
</html>
