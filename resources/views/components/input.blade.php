@props(['label' => '', 'model' => '', 'type' => 'text', 'error' => ''])

<div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ $label }}</label>
    <input 
        type="{{ $type }}" 
        x-model="{{ $model }}"
        {{ $attributes->merge(['class' => 'w-full border rounded p-2 focus:ring focus:ring-blue-300']) }}
    />
    <p x-show="{{ $error }}" x-text="{{ $error }}" class="text-red-500 text-sm mt-1"></p>
</div>
