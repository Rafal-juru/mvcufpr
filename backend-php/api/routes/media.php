<?php
// GET /api/media?file=<nome> — serve a imagem da pasta uploads.

if ($method !== 'GET') {
    json_response(['message' => 'Not found'], 404);
}

$file = (string)($_GET['file'] ?? '');

// Bloqueia path traversal: nada de barras nem "..".
if ($file === '' || str_contains($file, '/') || str_contains($file, '\\') || str_contains($file, '..')) {
    json_response(['message' => 'Arquivo inválido'], 400);
}

$path = __DIR__ . '/../uploads/' . $file;

if (!is_file($path)) {
    json_response(['message' => 'Imagem não encontrada'], 404);
}

$mime = match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
    'jpg', 'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    default => 'application/octet-stream',
};

header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($path));
readfile($path);
exit;
