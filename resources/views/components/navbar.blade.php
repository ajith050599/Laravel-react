<nav x-data="{ open: false }" class="bg-blue-600 text-white p-4 flex justify-between items-center relative">
    <h1 class="font-bold">Sample POC</h1>

    <button @click="open = !open" class="bg-blue-800 px-3 py-1 rounded">
        Menu
    </button>

    <ul x-show="open" @click.outside="open = false"
        class="absolute top-14 right-4 bg-white text-black rounded shadow p-2 space-y-1">
        <li><a href="/" class="block hover:bg-gray-200 px-2 py-1 rounded">Home</a></li>
        <li><a href="/about" class="block hover:bg-gray-200 px-2 py-1 rounded">About</a></li>
        <li><a href="/contact" class="block hover:bg-gray-200 px-2 py-1 rounded">Contact</a></li>
        <li><a href="/register" class="block hover:bg-gray-200 px-2 py-1 rounded">Register</a></li>
        <li><a href="/form" class="block hover:bg-gray-200 px-2 py-1 rounded">Normal form</a></li>
        <li><a href="/feedback" class="block hover:bg-gray-200 px-2 py-1 rounded">feedback</a></li>
    </ul>
</nav>