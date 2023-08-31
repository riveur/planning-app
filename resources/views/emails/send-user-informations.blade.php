<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>
</head>

<body>
    <p>Bonjour {{ $user->fullname }},</p>
    <p>Un compte à été créé pour vous, pour accéder à notre plateforme, voici les informations de connexion:</p>
    <ul>
        <li>Email: {{ $user->email }}</li>
        <li>Mot de passe: {{ $tempPassword }}</li>
    </ul>
    <p>
        <strong>Information</strong>: Le mot de passe ci-dessus, est un mot de passe généré aléatoirement.
        Pour plus de sécurité, veuillez le changer une fois connecté.
    </p>
    Notre plateforme: <a href="{{ config('app.url') }}">{{ config('app.url') }}</a>
</body>

</html>
