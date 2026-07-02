<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/jwt.php';

function admin_login(string $email, string $password): array {
    $cfg = load_config();
    $admin = $cfg['admin'];

    $normalized = strtolower(trim($email));
    if ($normalized !== strtolower($admin['email']) || $password !== $admin['password']) {
        throw new RuntimeException('Email ou senha incorretos');
    }

    $user = ['id' => 1, 'email' => $admin['email'], 'name' => $admin['name']];
    $token = jwt_sign($user, $cfg['jwt_secret'], 86400);

    return ['token' => $token, 'user' => $user];
}

function bearer_token_from_headers(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$header && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $header = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    if (!str_starts_with($header, 'Bearer ')) {
        return null;
    }
    return substr($header, 7);
}

// Encerra a requisição com 401 se o token for ausente/inválido; senão retorna o payload.
function require_auth(): array {
    $cfg = load_config();
    $token = bearer_token_from_headers();

    if (!$token) {
        json_response(['error' => 'Token não fornecido'], 401);
    }

    try {
        return jwt_verify($token, $cfg['jwt_secret']);
    } catch (RuntimeException $e) {
        json_response(['error' => $e->getMessage()], 401);
    }
}
