<?php
// GET /api/posts, GET /api/posts/{slug} — apenas artigos publicados.

if ($method === 'GET' && count($rest) === 0) {
    $stmt = db()->query("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, id DESC");
    json_response(array_map('row_to_post', $stmt->fetchAll()));
}

if ($method === 'GET' && count($rest) === 1) {
    $stmt = db()->prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'");
    $stmt->execute([$rest[0]]);
    $row = $stmt->fetch();
    if (!$row) {
        json_response(['message' => 'Artigo não encontrado'], 404);
    }
    json_response(row_to_post($row));
}

json_response(['message' => 'Not found'], 404);
