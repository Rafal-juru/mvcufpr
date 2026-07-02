<?php
// POST /api/auth/login

if ($method !== 'POST' || ($rest[0] ?? '') !== 'login') {
    json_response(['error' => 'Not found'], 404);
}

$body = json_body();
$email = $body['email'] ?? null;
$password = $body['password'] ?? null;

if (!$email || !$password) {
    json_response(['error' => 'Email e senha são obrigatórios'], 400);
}

try {
    json_response(admin_login($email, $password));
} catch (RuntimeException $e) {
    json_response(['error' => $e->getMessage()], 401);
}
