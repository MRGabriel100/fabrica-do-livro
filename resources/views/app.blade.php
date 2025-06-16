<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarefas</title>
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    <script src="https://kit.fontawesome.com/0051d3e61f.js" crossorigin="anonymous"></script>
</head>
<body>
    @inertia
</body>
</html>