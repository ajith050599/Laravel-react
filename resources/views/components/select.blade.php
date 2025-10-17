@props(['label' => '', 'model' => '', 'options' => '[]', 'error' => ''])

<div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $label }}</label>
    <select 
        x-model="{{ $model }}"
        {{ $attributes->merge(['class' => 'w-full border rounded p-2 focus:ring focus:ring-blue-300']) }}
    >
        <option value="">Select...</option>
        <template x-for="option in {{ $options }}" :key="option">
            <option x-text="option" :value="option"></option>
        </template>
    </select>
    <p x-show="{{ $error }}" x-text="{{ $error }}" class="text-red-500 text-sm mt-1"></p>
</div>
