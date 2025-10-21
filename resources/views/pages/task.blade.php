<x-layouts.app :title="'Task Manager'">
    <div id="task-root"></div>

    @viteReactRefresh
    @vite(['resources/js/react/taskManager.jsx'])
</x-layouts.app>
