<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
// Import the Storage facade
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('pages.home');
});

Route::get('/about', function () {
    return view('pages.about');
});

Route::get('/contact', function () {
    return view('pages.contact');
});

Route::get('/register', function () {
    return view('pages.register');
});


Route::get('/overview', function () {
    $widgetConfig = config('widgets');
    $widgetFields = config('widget_fields');

    return view('pages.overview', compact('widgetConfig', 'widgetFields'));
});


Route::get('/tasks/{any?}', function () {
    return view('pages.task');
})->where('any', '.*');



Route::get('/api/user-widgets', function () {
    $filePath = 'user_widgets_data.json';
    $defaultData = [
        [
            'id' => "1",
            'key' => "avg-dwell-time",
            'config' => [
                'location' => "location_1",
                'time_frame' => "7_days",
                'people_type' => "visitor"
            ],
        ],
        [
            'id' => "2",
            'key' => "total-people",
            'config' => [
                'location' => "location_2",
                'time_frame' => "today",
                'people_type' => "employee"
            ],
        ],
    ];

    if (Storage::disk('local')->exists($filePath)) {
        $data = json_decode(Storage::disk('local')->get($filePath));
    } else {
        $data = $defaultData;
        Storage::disk('local')->put($filePath, json_encode($data, JSON_PRETTY_PRINT));
    }

    return response()->json($data);
});


Route::post('/api/user-widgets/reorder', function (Request $request) {
    $validated = $request->validate([
        'widgets' => 'required|array',
        'widgets.*.id' => 'required|string|distinct',
        'widgets.*.key' => 'required|string',
        'widgets.*.config' => 'required|array',
        'widgets.*.config.location' => 'required|string',
        'widgets.*.config.time_frame' => 'required|string',
        'widgets.*.config.people_type' => 'required|string',
    ]);

    $widgetsToStore = $validated['widgets'];
    $filePath = 'user_widgets_data.json';

    Storage::disk('local')->put($filePath, json_encode($widgetsToStore, JSON_PRETTY_PRINT));

    return response()->json([
        'message' => 'User widgets reorder saved successfully.',
        'count' => count($widgetsToStore),
        'widgets' => $widgetsToStore
    ]);
});

Route::delete('/api/user-widgets/{id}', function ($id) {
    $filePath = 'user_widgets_data.json';

    if (!Storage::disk('local')->exists($filePath)) {
        return response()->json(['error' => 'Widget data not found'], 404);
    }

    $data = json_decode(Storage::disk('local')->get($filePath), true);

    $updatedData = array_filter($data, function ($widget) use ($id) {
        return $widget['id'] !== $id;
    });

    if (count($data) === count($updatedData)) {
        return response()->json(['error' => 'Widget not found'], 404);
    }

    Storage::disk('local')->put($filePath, json_encode(array_values($updatedData), JSON_PRETTY_PRINT));

    return response()->json([
        'message' => 'Widget deleted successfully.',
        'remaining' => count($updatedData),
    ]);
});

Route::post('/api/user-widgets', function (Request $request) {
    $validated = $request->validate([
        'id' => 'required|string',
        'key' => 'required|string',
        'config' => 'required|array',
    ]);

    $filePath = 'user_widgets_data.json';

    if (Storage::disk('local')->exists($filePath)) {
        $data = json_decode(Storage::disk('local')->get($filePath), true);
    } else {
        $data = [];
    }

    // append new widget into array
    $data[] = $validated;

    Storage::disk('local')->put($filePath, json_encode($data, JSON_PRETTY_PRINT));

    return response()->json([
        'message' => 'Widget created successfully.',
        'widget'  => $validated,
        'count'   => count($data),
        'widgets' => $data
    ]);
});

Route::patch('/api/user-widgets/{id}', function (Request $request, $id) {
    $validated = $request->validate([
        'key' => 'sometimes|string',
        'config' => 'sometimes|array',
    ]);

    $filePath = 'user_widgets_data.json';

    if (!Storage::disk('local')->exists($filePath)) {
        return response()->json(['error' => 'Widget data not found'], 404);
    }

    $data = json_decode(Storage::disk('local')->get($filePath), true);

    foreach ($data as &$widget) {
        if ($widget['id'] === $id) {
            $widget = array_merge($widget, $validated);
            break;
        }
    }

    Storage::disk('local')->put($filePath, json_encode($data, JSON_PRETTY_PRINT));

    return response()->json([
        'message' => 'Widget updated successfully.',
        'widgets' => $data
    ]);
});
Route::get('/api/user/locations', function () {
    return response()->json([
        ['label' => 'HQ Main Building', 'value' => 'hq'],
        ['label' => 'Warehouse East', 'value' => 'warehouse_east'],
        ['label' => 'Remote Office Dubai', 'value' => 'dubai_office'],
    ]);
});

Route::get('/api/zones', function () {
    return response()->json([
        ['label' => 'Lobby', 'value' => 'lobby'],
        ['label' => 'Parking', 'value' => 'parking'],
        ['label' => 'Cafeteria', 'value' => 'cafeteria'],
        ['label' => 'Server Room', 'value' => 'server_room'],
    ]);
});

Route::get('/api/zone-pairs', function () {
    return response()->json([
        ['label' => 'Lobby <-> Parking', 'value' => 'lobby_parking'],
        ['label' => 'Lobby <-> Cafeteria', 'value' => 'lobby_cafeteria'],
        ['label' => 'Cafeteria <-> Server Room', 'value' => 'cafeteria_server'],
    ]);
});

// Route::get('/api/people-count', function (Request $request) {
//     $timeframe = $request->query('timeframe', 'today');

//     return response()->json([
//         'timeframe' => $timeframe,
//         'total_people' => rand(100, 1000),
//         'timestamp' => now()->toDateTimeString(),
//     ]);
// });

// Route::get('/api/average-zone-dwell-time', function (Request $request) {
//     $location = $request->query('location', 'Decathlon Deira');

//     return response()->json([
//         'location' => $location,
//         'dwell_time' => rand(10, 40),
//         'timestamp' => now()->toDateTimeString(),
//     ]);
// });

Route::get('/api/people-count', function (Request $request) {
    return response()->json([
        'value' => rand(100, 1000),
    ]);
});

Route::get('/api/average-zone-dwell-time', function (Request $request) {
    return response()->json([
        'value' => rand(10, 40),
    ]);
});
