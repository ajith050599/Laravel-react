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
    return view('pages.overview');
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
            'config' => ['location' => "location_1", 'timeframe' => "15 days", 'peopletype' => "visitor"],
        ],
        [
            'id' => "2",
            'key' => "avg-dwell-time",
            'config' => ['location' => "location_2", 'timeframe' => "3 days", 'peopletype' => "employee"],
        ],
        [
            'id' => "3",
            'key' => "total-people",
            'config' => ['location' => "location_3", 'timeframe' => "1 day", 'peopletype' => "visitor"],
        ],
        [
            'id' => "4",
            'key' => "total-people",
            'config' => ['location' => "location_4", 'timeframe' => "7 days", 'peopletype' => "employee"],
        ],
        [
            'id' => "5",
            'key' => "occupancy-over-time",
            'config' => ['location' => "location_5", 'timeframe' => "10 days", 'peopletype' => "visitor"],
        ],
        [
            'id' => "6",
            'key' => "occupancy-over-time",
            'config' => ['location' => "location_6", 'timeframe' => "1 week", 'peopletype' => "employee"],
        ],
        [
            'id' => "7",
            'key' => "highest-zone-movements",
            'config' => ['location' => "location_7", 'timeframe' => "15 days", 'peopletype' => "visitor"],
        ],
        [
            'id' => "8",
            'key' => "highest-zone-movements",
            'config' => ['location' => "location_8", 'timeframe' => "3 days", 'peopletype' => "employee"],
        ],
        [
            'id' => "9",
            'key' => "highest-zone-movements",
            'config' => ['location' => "location_9", 'timeframe' => "1 day", 'peopletype' => "visitor"],
        ],
        [
            'id' => "10",
            'key' => "highest-zone-movements",
            'config' => ['location' => "location_10", 'timeframe' => "2 weeks", 'peopletype' => "employee"],
        ],
        [
            'id' => "11",
            'key' => "dwell-time-analytics",
            'config' => ['location' => "location_11", 'timeframe' => "5 days", 'peopletype' => "visitor"],
        ],
        [
            'id' => "12",
            'key' => "dwell-time-analytics",
            'config' => ['location' => "location_12", 'timeframe' => "30 days", 'peopletype' => "employee"],
        ],
        [
            'id' => "13",
            'key' => "dwell-time-analytics",
            'config' => ['location' => "location_13", 'timeframe' => "10 days", 'peopletype' => "visitor"],
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
        'widgets.*.config.timeframe' => 'required|string',
        'widgets.*.config.peopletype' => 'required|string',
    ]);

    $widgetsToStore = $validated['widgets'];
    $filePath = 'user_widgets_data.json';

    Storage::disk('local')->put($filePath, json_encode($widgetsToStore, JSON_PRETTY_PRINT));

    return response()->json([
        'message' => 'User widgets reorder saved successfully.',
        'count' => count($widgetsToStore),
    ]);
});
