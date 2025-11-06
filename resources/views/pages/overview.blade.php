<x-layouts.app :title="'Overview'">
    <div
        id="react-root"
        data-widget-config='@json($widgetConfig)'
        data-widget-fields='@json($widgetFields)'></div>

    @viteReactRefresh
    @vite(['resources/js/react/overview.jsx'])
</x-layouts.app>