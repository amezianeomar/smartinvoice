<!DOCTYPE html>
<html>
<head>
    <title>Votre Facture</title>
</head>
<body>
    <h2>Bonjour {{ $invoice->client->nom }},</h2>
    <p>Veuillez trouver ci-joint votre facture <strong>{{ $invoice->numero }}</strong> d'un montant de <strong>{{ number_format($invoice->total_ttc, 2, ',', ' ') }} DH</strong>.</p>
    <p>Date d'échéance : {{ \Carbon\Carbon::parse($invoice->date_echeance)->format('d/m/Y') }}</p>
    <p>Merci pour votre confiance !</p>
    <br>
    <p><small>Généré automatiquement par SmartInvoice Pro</small></p>
</body>
</html>
