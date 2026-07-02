<?php
// Copie este arquivo para config.php no servidor (fora do Git) e preencha com
// os valores reais. Nunca versionar config.php.

return [
    'db' => [
        'host' => 'hostclt03.mgconecta.com.br',
        'user' => 'mvcufpr_user',
        'password' => 'sua_senha_do_banco',
        'name' => 'mvcufpr',
    ],
    'jwt_secret' => 'sua_chave_jwt_muito_segura_e_aleatoria_aqui',
    'admin' => [
        'email' => 'admin@cesmvc.ufpr.br',
        'password' => 'troque_esta_senha',
        'name' => 'Administrador',
    ],
    'smtp' => [
        'host' => '',
        'port' => 587,
        'secure' => false, // true = SSL implícito (porta 465), false = STARTTLS (porta 587)
        'user' => '',
        'pass' => '',
        'from' => '', // ex: "CESMVC UFPR <no-reply@seudominio.com>"
    ],
    'site_url' => '', // ex: https://ufpr.seudominio.com — usado em links de e-mail
];
