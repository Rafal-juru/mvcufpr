<?php

function json_response($data, int $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    if ($status !== 204) {
        echo json_encode($data);
    }
    exit;
}

function json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// Envia a resposta ao cliente e mantém o script rodando (pra broadcast de
// e-mail em segundo plano), espelhando o fire-and-forget do Node.
function respond_and_continue($data, int $status = 200): void {
    ignore_user_abort(true);
    $body = json_encode($data);

    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Length: ' . strlen($body));
    header('Connection: close');
    echo $body;

    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
        return;
    }

    if (ob_get_level() > 0) {
        ob_end_flush();
    }
    flush();
}
