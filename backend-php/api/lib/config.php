<?php
// Carrega config.php (real, gitignored) com fallback pro exemplo em dev local.

function load_config(): array {
    static $config = null;
    if ($config !== null) return $config;

    $real = __DIR__ . '/../config.php';
    $example = __DIR__ . '/../config.example.php';

    $config = file_exists($real) ? require $real : require $example;
    return $config;
}
