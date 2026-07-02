<?php
// JWT HS256 minimalista — algoritmo fixado no código (não lido do header do
// token), para evitar ataques de confusão de algoritmo.

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4));
}

function jwt_sign(array $payload, string $secret, int $ttlSeconds = 86400): string {
    $header = ['alg' => 'HS256', 'typ' => 'JWT'];
    $payload['iat'] = $payload['iat'] ?? time();
    $payload['exp'] = $payload['exp'] ?? (time() + $ttlSeconds);

    $segments = [
        base64url_encode(json_encode($header)),
        base64url_encode(json_encode($payload)),
    ];
    $signature = hash_hmac('sha256', implode('.', $segments), $secret, true);
    $segments[] = base64url_encode($signature);

    return implode('.', $segments);
}

function jwt_verify(string $token, string $secret): array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        throw new RuntimeException('Token inválido ou expirado');
    }
    [$headerB64, $payloadB64, $sigB64] = $parts;

    $expected = base64url_encode(hash_hmac('sha256', "$headerB64.$payloadB64", $secret, true));
    if (!hash_equals($expected, $sigB64)) {
        throw new RuntimeException('Token inválido ou expirado');
    }

    $payload = json_decode(base64url_decode($payloadB64), true);
    if (!is_array($payload) || !isset($payload['exp']) || time() >= $payload['exp']) {
        throw new RuntimeException('Token inválido ou expirado');
    }

    return $payload;
}
