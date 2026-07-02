<?php
// /api/admin/posts[...], /api/admin/subscribers[...] — todas protegidas.
require_once __DIR__ . '/../lib/mailer.php';

require_auth();

function admin_base_url(): string {
    $cfg = load_config();
    if (!empty($cfg['site_url'])) return rtrim($cfg['site_url'], '/');
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return "{$scheme}://{$_SERVER['HTTP_HOST']}";
}

function subscriber_emails(): array {
    $stmt = db()->query('SELECT email FROM newsletter_subscribers');
    return array_column($stmt->fetchAll(), 'email');
}

$sub = $rest[0] ?? '';
$id = $rest[1] ?? null;

// ── Posts ────────────────────────────────────────────────────────────────
if ($sub === 'posts') {
    if ($method === 'GET' && $id === null) {
        $stmt = db()->query('SELECT * FROM posts ORDER BY published_at DESC, id DESC');
        json_response(array_map('row_to_post', $stmt->fetchAll()));
    }

    if ($method === 'GET' && $id !== null) {
        $stmt = db()->prepare('SELECT * FROM posts WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) json_response(['message' => 'Artigo não encontrado'], 404);
        json_response(row_to_post($row));
    }

    if ($method === 'POST' && $id === null) {
        $body = json_body();
        $slug = $body['slug'] ?? null;
        $title = $body['title'] ?? null;
        $content = $body['content'] ?? null;

        if (!$slug || !$title || !$content) {
            json_response(['message' => 'Slug, título e conteúdo são obrigatórios'], 400);
        }

        $status = ($body['status'] ?? '') === 'published' ? 'published' : 'draft';
        $readingMinutes = estimate_reading_minutes($content);

        try {
            $stmt = db()->prepare(
                'INSERT INTO posts (slug, title, excerpt, content, category, cover_image, author, status, published_at, reading_minutes)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $slug, $title, $body['excerpt'] ?? null, $content, $body['category'] ?? null,
                $body['coverImage'] ?? null, $body['author'] ?? null, $status,
                $body['publishedAt'] ?: null, $readingMinutes,
            ]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') json_response(['message' => 'Já existe um artigo com esse slug'], 409);
            throw $e;
        }

        $newId = db()->lastInsertId();
        $stmt2 = db()->prepare('SELECT * FROM posts WHERE id = ?');
        $stmt2->execute([$newId]);
        $post = row_to_post($stmt2->fetch());

        respond_and_continue($post, 201);

        if ($status === 'published') {
            try {
                send_post_broadcast($post, subscriber_emails(), admin_base_url());
            } catch (Throwable $e) {
                error_log('[newsletter] erro no broadcast (POST): ' . $e->getMessage());
            }
        }
        return;
    }

    if ($method === 'PUT' && $id !== null) {
        $body = json_body();
        $slug = $body['slug'] ?? null;
        $title = $body['title'] ?? null;
        $content = $body['content'] ?? null;

        if (!$slug || !$title || !$content) {
            json_response(['message' => 'Slug, título e conteúdo são obrigatórios'], 400);
        }

        $status = ($body['status'] ?? '') === 'published' ? 'published' : 'draft';

        $prevStmt = db()->prepare('SELECT status FROM posts WHERE id = ?');
        $prevStmt->execute([$id]);
        $prevRow = $prevStmt->fetch();
        if (!$prevRow) json_response(['message' => 'Artigo não encontrado'], 404);
        $wasPublished = $prevRow['status'] === 'published';

        $readingMinutes = estimate_reading_minutes($content);

        try {
            $stmt = db()->prepare(
                'UPDATE posts SET slug=?, title=?, excerpt=?, content=?, category=?, cover_image=?, author=?, status=?, published_at=?, reading_minutes=? WHERE id=?'
            );
            $stmt->execute([
                $slug, $title, $body['excerpt'] ?? null, $content, $body['category'] ?? null,
                $body['coverImage'] ?? null, $body['author'] ?? null, $status,
                $body['publishedAt'] ?: null, $readingMinutes, $id,
            ]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') json_response(['message' => 'Já existe um artigo com esse slug'], 409);
            throw $e;
        }

        $stmt2 = db()->prepare('SELECT * FROM posts WHERE id = ?');
        $stmt2->execute([$id]);
        $post = row_to_post($stmt2->fetch());

        respond_and_continue($post, 200);

        if (!$wasPublished && $status === 'published') {
            try {
                send_post_broadcast($post, subscriber_emails(), admin_base_url());
            } catch (Throwable $e) {
                error_log('[newsletter] erro no broadcast (PUT): ' . $e->getMessage());
            }
        }
        return;
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = db()->prepare('DELETE FROM posts WHERE id = ?');
        $stmt->execute([$id]);
        if ($stmt->rowCount() === 0) json_response(['message' => 'Artigo não encontrado'], 404);
        json_response(null, 204);
    }
}

// ── Newsletter subscribers ──────────────────────────────────────────────
if ($sub === 'subscribers') {
    if ($method === 'GET' && $id === null) {
        $stmt = db()->query('SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC');
        json_response($stmt->fetchAll());
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = db()->prepare('DELETE FROM newsletter_subscribers WHERE id = ?');
        $stmt->execute([$id]);
        if ($stmt->rowCount() === 0) json_response(['message' => 'Inscrito não encontrado'], 404);
        json_response(null, 204);
    }
}

json_response(['message' => 'Not found'], 404);
