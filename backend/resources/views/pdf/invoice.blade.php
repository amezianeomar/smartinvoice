<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture {{ $invoice->numero }}</title>
    <style>
        /* DOMPDF Compatible CSS - Premium Minimalist SaaS Aesthetic */
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 13px;
            color: #334155; /* slate-700 */
            margin: 0;
            padding: 30px;
            line-height: 1.5;
        }

        /* Watermark positioning */
        .watermark {
            position: absolute;
            top: 30%;
            left: 0;
            right: 0;
            text-align: center;
            z-index: -100;
            transform: rotate(-45deg);
            opacity: 0.04;
            font-size: 150px;
            font-weight: bold;
            color: #0f172a;
            pointer-events: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table {
            margin-bottom: 50px;
        }

        .header-left {
            width: 50%;
            vertical-align: top;
        }

        .header-right {
            width: 50%;
            vertical-align: top;
            text-align: right;
        }

        .invoice-title {
            margin: 0;
            color: #94a3b8; /* slate-400 */
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .invoice-number {
            margin: 5px 0 0 0;
            color: #0f172a; /* slate-900 */
            font-size: 16px;
            font-weight: bold;
        }

        .meta-table {
            width: 100%;
            margin-top: 20px;
        }

        .meta-table td {
            padding: 2px 0;
        }

        .meta-label {
            color: #64748b; /* slate-500 */
            font-weight: normal;
        }

        .meta-value {
            color: #0f172a;
            font-weight: bold;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            border: 1px solid #cbd5e1;
            background-color: #f8fafc;
            color: #475569;
        }

        .billing-table {
            width: 100%;
            margin-bottom: 50px;
        }

        .billing-table td {
            width: 50%;
            vertical-align: top;
        }

        .billing-heading {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94a3b8;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .billing-info {
            color: #0f172a;
            line-height: 1.6;
        }

        .billing-info strong {
            font-size: 15px;
            display: block;
            margin-bottom: 4px;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            margin-bottom: 40px;
        }

        .items-table th {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            border-bottom: 2px solid #e2e8f0;
            padding: 12px 10px;
            text-align: left;
            background-color: #f8fafc; /* slate-50 */
        }

        .items-table th.right, 
        .items-table td.right {
            text-align: right;
        }

        .items-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
        }

        .items-table tr:last-child td {
            border-bottom: 1px solid #e2e8f0;
        }

        .item-name {
            font-weight: bold;
            color: #0f172a;
        }

        /* Totals */
        .totals-container {
            width: 100%;
        }

        .totals-table {
            width: 350px;
            float: right;
        }

        .totals-table td {
            padding: 8px 10px;
            text-align: right;
        }

        .totals-label {
            color: #64748b;
        }

        .totals-value {
            color: #0f172a;
            font-weight: bold;
        }

        .totals-grand {
            border-top: 2px solid #e2e8f0;
            font-size: 16px;
        }

        .totals-grand td {
            padding-top: 15px;
        }

        .totals-grand .totals-value {
            color: #000;
        }

        /* Footer */
        .footer {
            position: fixed;
            bottom: -10px;
            left: 30px;
            right: 30px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
        }
    </style>
</head>
<body>

    <!-- Watermark Logic: Show unless user is PRO AND has enabled remove_watermark -->
    @if(!($invoice->user && strtolower($invoice->user->abonnement) === 'pro' && $invoice->user->remove_watermark))
        <div class="watermark">SI-PRO</div>
    @endif

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td class="header-left">
                <!-- Dynamic Logo Logic -->
                @if(!empty($logoData))
                    <img src="{{ $logoData }}" style="max-width: 160px; max-height: 60px; object-fit: contain;">
                @else
                    <h1 style="margin:0; font-size: 26px; color: #0f172a; font-weight: 800; letter-spacing: -0.5px;">SmartInvoice</h1>
                @endif
            </td>
            <td class="header-right">
                <h2 class="invoice-title">FACTURE</h2>
                <p class="invoice-number">#{{ $invoice->numero }}</p>
                
                <table class="meta-table">
                    <tr>
                        <td class="right meta-label">Date d'émission:</td>
                        <td class="right meta-value" style="width: 100px;">{{ \Carbon\Carbon::parse($invoice->date_emission)->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td class="right meta-label">Date d'échéance:</td>
                        <td class="right meta-value">{{ \Carbon\Carbon::parse($invoice->date_echeance)->format('d/m/Y') }}</td>
                    </tr>
                    @if(in_array(strtolower($invoice->statut), ['payee', 'payée']))
                    <tr>
                        <td class="right meta-label" style="padding-top: 10px;">Statut:</td>
                        <td class="right" style="padding-top: 10px;">
                            <span class="status-badge">{{ ucfirst($invoice->statut) }}</span>
                        </td>
                    </tr>
                    @endif
                </table>
            </td>
        </tr>
    </table>

    <!-- Billing Info Section -->
    <table class="billing-table">
        <tr>
            <td style="padding-right: 20px;">
                <div class="billing-heading">Émetteur</div>
                <div class="billing-info">
                    @if($invoice->user)
                        <strong>{{ $invoice->user->nom ?? $invoice->user->name }}</strong><br>
                        <span style="color: #64748b;">{{ $invoice->user->email }}</span><br>
                        @if($invoice->user->adresse_siege)
                            {!! nl2br(e($invoice->user->adresse_siege)) !!}<br>
                        @else
                            123 Rue de la Startup<br>
                            Casablanca, 20000<br>
                        @endif
                        <div style="margin-top: 5px; font-size: 11px; color: #64748b;">
                            @if($invoice->user->ice)
                                <strong>ICE:</strong> {{ $invoice->user->ice }}<br>
                            @endif
                            @if($invoice->user->patente)
                                <strong>Patente:</strong> {{ $invoice->user->patente }}<br>
                            @endif
                        </div>
                    @else
                        <strong>SmartInvoice Pro</strong>
                        <span style="color: #64748b; font-size: 12px;">contact@smartinvoice.ma</span>
                        <br>
                        123 Rue de la Startup<br>
                        Casablanca, 20000
                    @endif
                </div>
            </td>
            <td style="padding-left: 20px;">
                <div class="billing-heading">Facturé à</div>
                <div class="billing-info">
                    <strong>{{ $invoice->client->nom }}</strong>
                    @if($invoice->client->email)
                        <span style="color: #64748b; font-size: 12px;">{{ $invoice->client->email }}</span><br>
                    @endif
                    @if($invoice->client->adresse)
                        {!! nl2br(e($invoice->client->adresse)) !!}<br>
                    @endif
                    @if($invoice->client->telephone)
                        <span style="color: #64748b;">Tél:</span> {{ $invoice->client->telephone }}
                    @endif
                </div>
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th>Désignation</th>
                <th class="right" style="width: 15%;">Quantité</th>
                <th class="right" style="width: 20%;">Prix Unitaire</th>
                <th class="right" style="width: 20%;">Montant</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->invoiceItems as $item)
            <tr>
                <td>
                    <span class="item-name">{{ $item->designation }}</span>
                </td>
                <td class="right">{{ $item->quantite }}</td>
                <td class="right">{{ number_format($item->prix_unitaire, 2, ',', ' ') }} DH</td>
                <td class="right item-name">{{ number_format($item->montant_ligne, 2, ',', ' ') }} DH</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Totals Section -->
    <div class="totals-container">
        <table class="totals-table">
            <tr>
                <td class="totals-label">Total HT</td>
                <td class="totals-value">{{ number_format($invoice->total_ht, 2, ',', ' ') }} DH</td>
            </tr>
            <tr>
                <td class="totals-label">
                    @php
                        $rates = $invoice->invoiceItems->pluck('taux_tva')->unique();
                        $tvaLabel = 'TVA';
                        if ($rates->count() === 1) {
                            $rate = $rates->first();
                            if ($rate == 0) {
                                $tvaLabel = 'TVA (Exonéré)';
                            } else {
                                $tvaLabel = 'TVA (' . number_format($rate, 0) . '%)';
                            }
                        }
                    @endphp
                    {{ $tvaLabel }}
                </td>
                <td class="totals-value">{{ number_format($invoice->total_tva, 2, ',', ' ') }} DH</td>
            </tr>
            <tr class="totals-grand">
                <td class="totals-label"><strong>Total TTC</strong></td>
                <td class="totals-value">{{ number_format($invoice->total_ttc, 2, ',', ' ') }} DH</td>
            </tr>
        </table>
        <div style="clear: both;"></div>
    </div>

    @php
        $disclaimerRates = $invoice->invoiceItems->pluck('taux_tva')->unique();
        $isInvoiceExonere = $disclaimerRates->count() === 1 && $disclaimerRates->first() == 0;
    @endphp
    @if($isInvoiceExonere)
    <div style="text-align: center; margin-top: 30px;">
        <span style="font-size: 11px; font-style: italic; color: #64748b;">TVA non applicable, article 92 du Code Général des Impôts.</span>
    </div>
    @endif

    <!-- Footer -->
    <div class="footer">
        <p style="margin: 0 0 5px 0;">Merci de votre confiance. En cas de retard de paiement, des pénalités pourront être appliquées.</p>
        <p style="margin: 0; color: #cbd5e1;">Généré par SmartInvoice Pro</p>
    </div>

</body>
</html>
