<?php

return [
    [
        'key' => 'avg-dwell-time',
        'title' => 'Average Zone Dwell Time',
        'type' => 'metric',
        'description' => 'Displays the average time people spend within zones.',
        'icon' => '/images/widgets/avg-dwell-time.svg',
        'settings' => [
            'people_type' => null,
            'time_frame' => null,
            'location' => null,
            'zone' => null,
        ],
    ],

    [
        'key' => 'total-people',
        'title' => 'Total People',
        'type' => 'count',
        'description' => 'Shows the total number of people detected within the selected timeframe.',
        'icon' => '/images/widgets/total-people.svg',
        'settings' => [
            'people_type' => null,
            'time_frame' => null,
            'location' => null,
        ],
    ],

    [
        'key' => 'highest-zone-movements',
        'title' => 'Highest Zone Movements',
        'type' => 'count',
        'description' => 'Displays zones with the highest number of movements or transitions.',
        'icon' => '/images/widgets/highest-zone-movements.svg',
        'settings' => [
            'people_type' => null,
            'time_frame' => null,
            'zone_pairs' => null,
            'compare' => null,
        ],
    ],

    [
        'key' => 'dwell-time-analytics',
        'title' => 'Dwell Time Analytics',
        'type' => 'metric',
        'description' => 'Provides analytics on how long people stay in specific zones.',
        'icon' => '/images/widgets/dwell-time-analytics.svg',
        'settings' => [
            'people_type' => null,
            'time_frame' => null,
            'location' => null,
            'zone' => null,
            'compare' => null,
        ],
    ],

    [
        'key' => 'occupancy-over-time',
        'title' => 'Occupancy Over Time',
        'type' => 'metric',
        'description' => 'Shows occupancy trends and changes over the selected time period.',
        'icon' => '/images/widgets/occupancy-over-time.svg',
        'settings' => [
            'people_type' => null,
            'time_frame' => null,
            'location' => null,
            'hour_range' => null,
        ],
    ],
];
