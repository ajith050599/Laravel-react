<x-layouts.app :title="'Contact'">
    <div x-data="{ name: '', email: '', submitted: false }" class="p-6 bg-white shadow rounded-xl max-w-md mx-auto">
        <h1 class="text-2xl font-semibold mb-4">Contact Us</h1>

        <template x-if="!submitted">
            <form @submit.prevent="submitted = true" class="space-y-3">
                <input x-model="name" type="text" placeholder="Your Name" class="border p-2 w-full rounded" />
                <input x-model="email" type="email" placeholder="Your Email" class="border p-2 w-full rounded" />
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Send</button>
            </form>
        </template>

        <template x-if="submitted">
            <div class="text-center text-green-600 font-medium mt-4">
                <p>Thank you, <span x-text="name"></span>! We’ll get back to you at <span x-text="email"></span>.</p>
                <button @click="submitted = false" class="mt-4 bg-gray-200 px-3 py-1 rounded">Reset</button>
            </div>
        </template>
    </div>
</x-layouts.app>
