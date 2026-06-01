# Backend do Blog — PHP + MySQL (Plesk)

Este documento descreve o contrato da API e o schema do banco que o frontend
(`src/lib/api.ts`) espera. Enquanto o backend não estiver no ar, o frontend roda
em **modo mock** (localStorage) e tudo funciona para demonstração.

## Como ligar a API real

1. Suba os endpoints abaixo no Plesk, sob o mesmo domínio, com o prefixo `/api`.
2. Crie um arquivo `.env` na raiz do projeto com:

   ```
   VITE_USE_MOCK=false
   ```

3. Rode `npm run build` e publique o conteúdo de `dist/` no Plesk.

Como o frontend e a API ficam no **mesmo domínio**, não há configuração de CORS.
O `public/.htaccess` já preserva as rotas `/api/*` e faz o fallback de SPA para o
restante.

## Banco de dados (MySQL)

Crie o banco pelo painel do Plesk (MySQL) e rode o schema abaixo.

```sql
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120)  NOT NULL,
  email         VARCHAR(180)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,          -- password_hash() do PHP (bcrypt)
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE posts (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  slug            VARCHAR(200)  NOT NULL UNIQUE,
  title           VARCHAR(255)  NOT NULL,
  excerpt         TEXT          NOT NULL,
  content         MEDIUMTEXT    NOT NULL,         -- Markdown
  category        VARCHAR(120)  NOT NULL,
  cover_image     VARCHAR(500)  NOT NULL DEFAULT '',
  author          VARCHAR(160)  NOT NULL,
  status          ENUM('draft','published') NOT NULL DEFAULT 'draft',
  reading_minutes INT           NOT NULL DEFAULT 1,
  published_at    DATE          NOT NULL,
  created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status_published_at (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Crie o primeiro usuário admin com a senha já hasheada:

```php
<?php
// gere o hash uma vez e insira no banco
echo password_hash('sua-senha-forte', PASSWORD_BCRYPT);
```

```sql
INSERT INTO users (name, email, password_hash)
VALUES ('Administrador CESMVC', 'admin@cesmvc.ufpr.br', '<hash gerado acima>');
```

## Contrato da API

O JSON dos posts deve usar **camelCase** (o frontend consome direto). Mapeie as
colunas `cover_image` → `coverImage`, `reading_minutes` → `readingMinutes`,
`published_at` → `publishedAt` na resposta.

### Público

| Método | Rota                | Resposta            | Observação                         |
|--------|---------------------|---------------------|------------------------------------|
| GET    | `/api/posts`        | `BlogPost[]`        | Apenas `status = 'published'`, mais recentes primeiro |
| GET    | `/api/posts/{slug}` | `BlogPost`          | 404 se não publicado/inexistente   |

### Autenticação

| Método | Rota              | Body                    | Resposta              |
|--------|-------------------|-------------------------|-----------------------|
| POST   | `/api/auth/login` | `{ email, password }`   | `{ token, user }`     |

`user` = `{ id, name, email }`. O `token` pode ser um JWT ou um token opaco
guardado em tabela de sessões. O frontend o envia em todas as rotas admin no
header `Authorization: Bearer <token>`.

### Admin (exigem `Authorization: Bearer <token>`)

| Método | Rota                   | Body            | Resposta        |
|--------|------------------------|-----------------|-----------------|
| GET    | `/api/admin/posts`     | —               | `BlogPost[]` (todos, inclusive rascunhos) |
| GET    | `/api/admin/posts/{id}`| —               | `BlogPost`      |
| POST   | `/api/admin/posts`     | `BlogPostInput` | `BlogPost` (201)|
| PUT    | `/api/admin/posts/{id}`| `BlogPostInput` | `BlogPost`      |
| DELETE | `/api/admin/posts/{id}`| —               | `204 No Content`|

`BlogPostInput` = todos os campos de `BlogPost` exceto `id` e `readingMinutes`
(o backend calcula `reading_minutes` a partir do `content`).

### Formato de erro

Retorne JSON `{ "message": "texto do erro" }` com o status HTTP apropriado
(`400`, `401`, `404`, `422`...). O frontend exibe `message` ao usuário.

## Segurança

- Hash de senha com `password_hash()` / `password_verify()` (bcrypt). Nunca
  armazenar senha em texto puro.
- Validar o token em **todas** as rotas `/api/admin/*`.
- Usar prepared statements (PDO) em todas as queries.
- Nunca commitar credenciais de banco — usar variáveis de ambiente do Plesk ou
  um `config.php` fora do controle de versão.
- Servir tudo sob HTTPS.
