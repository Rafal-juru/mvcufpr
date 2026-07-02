<?php
require_once __DIR__ . '/lib/response.php';
require_once __DIR__ . '/lib/config.php';
require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/posts.php';

$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$segments = $path === '' ? [] : explode('/', $path);

// O .htaccess encaminha /api/* pra cá — remove o prefixo "api" se presente.
if (($segments[0] ?? '') === 'api') {
    array_shift($segments);
}

$resource = $segments[0] ?? '';
$rest = array_slice($segments, 1);
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($resource) {
        case 'health':
            require __DIR__ . '/routes/health.php';
            break;
        case 'auth':
            require __DIR__ . '/routes/auth.php';
            break;
        case 'posts':
            require __DIR__ . '/routes/posts.php';
            break;
        case 'admin':
            require __DIR__ . '/routes/admin.php';
            break;
        case 'upload-image':
            require __DIR__ . '/routes/upload.php';
            break;
        case 'media':
            require __DIR__ . '/routes/media.php';
            break;
        case 'newsletter':
            require __DIR__ . '/routes/newsletter.php';
            break;
        default:
            json_response(['message' => 'Not found'], 404);
    }
} catch (Throwable $e) {
    error_log('[api] erro: ' . $e->getMessage());
    json_response(['message' => 'Erro interno'], 500);
}
