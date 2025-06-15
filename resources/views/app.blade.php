<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarefas</title>
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
</head>
<body>
    @inertia
</body>
</html>