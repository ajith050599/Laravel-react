<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Alpine Practice' }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100 text-gray-900">
    <x-navbar /> <!-- Navbar component -->

    <main class="p-6">
        {{ $slot }} <!-- Slot for page content -->
    </main>
</body>

</html>