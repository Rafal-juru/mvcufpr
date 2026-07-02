<?php
require_once __DIR__ . '/config.php';

function db(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $cfg = load_config()['db'];
    $dsn = "mysql:host={$cfg['host']};dbname={$cfg['name']};charset=utf8mb4";

    $pdo = new PDO($dsn, $cfg['user'], $cfg['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    ensure_tables($pdo);
    return $pdo;
}

function ensure_tables(PDO $pdo): void {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            slug VARCHAR(191) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            excerpt VARCHAR(500),
            content LONGTEXT NOT NULL,
            category VARCHAR(100),
            cover_image VARCHAR(1000),
            author VARCHAR(150),
            status ENUM('draft','published') NOT NULL DEFAULT 'draft',
            published_at DATE,
            reading_minutes INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_status (status),
            INDEX idx_published_at (published_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(191) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
}
