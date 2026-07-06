<?php
// Carrega config.php (real, gitignored) com fallback pro exemplo em dev local.
//
// Prioriza um caminho fora do document root (var de ambiente
// MVCUFPR_CONFIG_PATH, setada via .htaccess) — sobrevive a um clone limpo
// do Git Deploy da Hostinger, que apaga tudo não versionado dentro de
// public_html. Sem essa var (ex.: dev local), cai pro config.php dentro de
// api/, e por fim pro config.example.php versionado.

function load_config(): array {
    static $config = null;
    if ($config !== null) return $config;

    $external = getenv('MVCUFPR_CONFIG_PATH');
    $real = __DIR__ . '/../config.php';
    $example = __DIR__ . '/../config.example.php';

    if ($external && file_exists($external)) {
        $config = require $external;
    } elseif (file_exists($real)) {
        $config = require $real;
    } else {
        $config = require $example;
    }

    return $config;
}
