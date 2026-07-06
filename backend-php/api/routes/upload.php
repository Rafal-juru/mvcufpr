<?php
// POST /api/upload-image — protegido, só admin autenticado.

require_auth();

if ($method !== 'POST') {
    json_response(['message' => 'Not found'], 404);
}

$uploadsDir = load_config()['uploads_dir'] ?: (__DIR__ . '/../uploads');
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    json_response(['message' => 'Nenhuma imagem enviada'], 400);
}

$file = $_FILES['image'];

if ($file['size'] > 5 * 1024 * 1024) {
    json_response(['message' => 'Apenas imagens são permitidas (JPEG, PNG, GIF)'], 400);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExt = ['jpeg', 'jpg', 'png', 'gif'];
$allowedMime = ['image/jpeg', 'image/png', 'image/gif'];

if (!in_array($ext, $allowedExt, true) || !in_array($file['type'], $allowedMime, true)) {
    json_response(['message' => 'Apenas imagens são permitidas (JPEG, PNG, GIF)'], 400);
}

$filename = ((string)round(microtime(true) * 1000)) . '-' . random_int(0, 999999999) . '.' . $ext;
$dest = $uploadsDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    json_response(['message' => 'Falha ao salvar a imagem'], 500);
}

// URL servida via /api/media (sem extensão no caminho), pra ficar portável
// entre hosts que interceptam extensões estáticas fora do document root.
json_response(['url' => '/api/media?file=' . rawurlencode($filename)]);
