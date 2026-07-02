<?php
// Conversão entre a linha do banco (snake_case) e o array BlogPost que o
// frontend espera (camelCase). Espelha server/mapPost.js.

function row_to_post(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'excerpt' => $row['excerpt'] ?? '',
        'content' => $row['content'],
        'category' => $row['category'] ?? '',
        'coverImage' => $row['cover_image'] ?? '',
        'author' => $row['author'] ?? '',
        'status' => $row['status'],
        'publishedAt' => $row['published_at'] ?? '',
        'readingMinutes' => isset($row['reading_minutes']) ? (int)$row['reading_minutes'] : 1,
    ];
}

function estimate_reading_minutes(string $content): int {
    $text = trim(preg_replace('/\s+/', ' ', strip_tags($content)));
    $words = $text === '' ? 0 : count(preg_split('/\s+/', $text));
    return max(1, (int)round($words / 200));
}
