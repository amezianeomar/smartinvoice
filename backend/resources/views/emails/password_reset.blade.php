<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Réinitialisation de mot de passe</title>
    <style>
        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 40px 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
            border: 1px solid rgba(82, 110, 156, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        h2 {
            font-size: 20px;
            font-weight: 800;
            margin-top: 0;
            margin-bottom: 16px;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        p {
            font-size: 14px;
            line-height: 1.6;
            color: #526e9c;
            margin-bottom: 24px;
        }
        .btn-container {
            text-align: center;
            margin: 32px 0;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #221ab7 0%, #18adf2 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 32px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(24, 173, 242, 0.25);
        }
        .footer {
            margin-top: 40px;
            border-top: 1px solid rgba(82, 110, 156, 0.1);
            padding-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <span style="font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #0f172a;">SI<span style="color: #18adf2;">-</span>PRO</span>
        </div>
        <h2>Bonjour {{ $user->nom }},</h2>
        <p>Vous recevez cet email car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte SmartInvoice Pro.</p>
        
        <div class="btn-container">
            <a href="{{ $resetUrl }}" class="btn" target="_blank">Réinitialiser mon mot de passe</a>
        </div>
        
        <p>Ce lien de réinitialisation expirera dans 60 minutes.</p>
        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise de votre part.</p>
        
        <div class="footer">
            <p style="margin: 0; font-size: 11px; color: #94a3b8;">Généré automatiquement par SmartInvoice Pro.</p>
        </div>
    </div>
</body>
</html>
