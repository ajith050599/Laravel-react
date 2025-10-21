<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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

Route::get('/form', function () {
    return view('pages.form');
});

Route::get('/feedback', function () {
    return view('pages.feedback');
});

Route::get('/tasks/{any?}', function () {
    return view('pages.task');
})->where('any', '.*');

Route::post('/api/submit-form', function (Request $request) {
    $data = $request->validate([
        'name' => 'required|string|max:50',
        'email' => 'required|email',
    ]);

    return response()->json([
        'message' => 'Form submitted successfully!',
        'data' => [
            'name_upper' => strtoupper($data['name']),
            'email_domain' => substr(strrchr($data['email'], "@"), 1),
        ],
    ]);
});

Route::post('/api/submit-feedback', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'message' => 'required|string|max:500',
    ]);

    return response()->json([
        'message' => "Thanks, {$validated['name']}! We got your feedback: {$validated['message']}"
    ]);
});
