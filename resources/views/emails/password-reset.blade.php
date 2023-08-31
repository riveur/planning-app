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
    <p>Bonjour,</p>
    <p>
        Vous avez fait une demande de réinitialiasation de mot de passe, veuillez suivre le lien ci-dessous pour le
        faire:
    </p>
    <p><strong>Lien:</strong> <a href="{{ $url }}">{{ $url }}</a></p>
</body>

</html>
