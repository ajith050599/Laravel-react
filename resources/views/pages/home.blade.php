<x-layouts.app :title="'Home'">
    <div x-data="{ open: false }" class="p-6 bg-white shadow rounded-xl">
        <button @click="open = !open" class="px-4 py-2 bg-blue-600 text-white rounded">
            Toggle Message
        </button>

        <p x-show="open" class="mt-4 text-gray-700">
            Hello from Alpine inside Laravel + Tailwind!
        </p>
        <div
            x-data="{ 
    newTodo: '', 
    todos: ['Learn Alpine', 'Build a demo'], 
    addTodo() { 
      if (this.newTodo.trim()) this.todos.push(this.newTodo); 
      this.newTodo = ''; 
    },
    removeTodo(i) {
      this.todos.splice(i, 1);
    }
  }"
            class="p-6 bg-white rounded shadow max-w-md">
            <h2 class="text-lg font-semibold mb-4">Todo List</h2>

            <input x-model="newTodo" placeholder="New todo" class="border p-2 w-full mb-2" />
            <button @click="addTodo" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>

            <ul class="mt-4 list-disc ml-6">
                <template x-for="(todo, i) in todos" :key="i">
                    <li class="flex justify-between">
                        <span x-text="todo"></span>
                        <button @click="removeTodo(i)" class="text-red-500">x</button>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</x-layouts.app>