<?php

return [

    'people_type' => [
        'title' => 'People Type',
        'label' => 'Select people type',
        'type' => 'select',
        'source' => 'static',
        'options' => [
            ['label' => 'All People', 'value' => 'all'],
            ['label' => 'Employee', 'value' => 'employee'],
            ['label' => 'Contractor', 'value' => 'contractor'],
            ['label' => 'Visitor', 'value' => 'visitor'],
        ],
    ],

    'time_frame' => [
        'title' => 'Time Frame',
        'label' => 'Select time frame',
        'type' => 'select',
        'source' => 'static',
        'options' => [
            ['label' => 'Today', 'value' => 'today'],
            ['label' => 'Last 7 Days', 'value' => '7_days'],
            ['label' => 'Last 30 Days', 'value' => '30_days'],
        ],
    ],

    'location' => [
        'title' => 'Location',
        'label' => 'Select location',
        'type' => 'select',
        'source' => 'api',
        'endpoint' => 'user/locations', 
    ],

    'zone' => [
        'title' => 'Zone',
        'label' => 'Select zone',
        'type' => 'select',
        'source' => 'api',
        'endpoint' => '/zones',
    ],

    'zone_pairs' => [
        'title' => 'Zone Pairs',
        'label' => 'Select zone pairs',
        'type' => 'multi-select',
        'source' => 'api',
        'endpoint' => '/zone-pairs',
    ],

    'hour_range' => [
        'title' => 'Hour Range',
        'label' => 'Select hour range',
        'type' => 'select',
        'source' => 'static',
        'options' => [
            ['label' => 'Morning (6 AM - 12 PM)', 'value' => 'morning'],
            ['label' => 'Afternoon (12 PM - 6 PM)', 'value' => 'afternoon'],
            ['label' => 'Evening (6 PM - 12 AM)', 'value' => 'evening'],
            ['label' => 'Night (12 AM - 6 AM)', 'value' => 'night'],
        ],
    ],

    'compare' => [
        'title' => 'Compare',
        'label' => 'Select comparison period',
        'type' => 'select',
        'source' => 'static',
        'options' => [
            ['label' => 'Previous Day', 'value' => 'prev_day'],
            ['label' => 'Previous Week', 'value' => 'prev_week'],
            ['label' => 'Previous Month', 'value' => 'prev_month'],
        ],
    ],

];
