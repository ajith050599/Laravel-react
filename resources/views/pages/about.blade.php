<x-layouts.app :title="'About'">
    <div class="p-6 bg-white shadow rounded-xl">
        <h1 class="text-2xl font-semibold mb-4">About This App</h1>
        <p class="text-gray-700 mb-4">
            This is a small Laravel + Alpine.js playground where you can experiment with interactive UI components
            without needing a big frontend framework.
        </p>

        <div x-data="{ show: false }">
            <button @click="show = !show" class="bg-blue-600 text-white px-4 py-2 rounded">
                Toggle Details
            </button>

            <div x-show="show" class="mt-4 border-t pt-4 text-gray-600">
                <p>Built using Laravel Blade components, Tailwind CSS, and Alpine.js for interactivity.</p>
            </div>
            <button
                @click="console.log('Navigating to feedback page'); window.location.href='/feedback'"
                class="bg-blue-600 text-white px-3 py-2 rounded mt-6">
                Go to Feedback Page
            </button>
        </div>

    </div>
</x-layouts.app>