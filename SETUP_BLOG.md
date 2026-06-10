# Setup - Blog com Banco de Dados

## 1. No Hosting (hostclt04.mgconecta.com.br)

### 1.1 Criar Subdomínio
- Acesse: https://hostclt04.mgconecta.com.br:8443/login_up.php
- Login com suas credenciais
- Crie um subdomínio: **`ufpr.devjoelchagas.com.br`**
- Aponte para a pasta `/blog` ou `/ufpr`

### 1.2 Criar Banco de Dados MySQL
- No painel, vá para **MySQL/Banco de Dados**
- Crie um novo banco:
  - **Nome**: `mvcufpr`
  - **Usuário**: `mvcufpr_user` (ou outro nome)
  - **Senha**: `[escolha uma senha forte]`
  - **Host**: `localhost` (ou o host fornecido)

**Anote essas credenciais — você vai usar em breve.**

---

## 2. Setup Local (seu computador)

### 2.1 Configurar variáveis de ambiente do servidor
1. Copie o arquivo `server/.env.example` para `server/.env`
2. Preencha com as credenciais do banco:

```env
DB_HOST=localhost
DB_USER=mvcufpr_user
DB_PASSWORD=sua_senha_aqui
DB_NAME=mvcufpr
PORT=3001
ADMIN_SECRET=uma_chave_muito_forte_e_secreta_12345
```

### 2.2 Instalar dependências do servidor
```bash
cd server
npm install
node server.js
```

Você verá: `🚀 Servidor rodando em http://localhost:3001`

### 2.3 Configurar frontend para apontar à API
Crie um arquivo `.env` na raiz do projeto (se não existir):

```env
VITE_API_URL=http://localhost:3001
```

---

## 3. Usar o Blog

### Ver posts (público)
- http://localhost:5173 (ou a porta do Vite)
- Os posts aparecem na seção "Artigos e Recursos"

### Admin - Criar/Editar Posts
1. Acesse em breve: `http://localhost:5173/admin`
2. Use a **ADMIN_SECRET** do `.env` para autenticar
3. Preencha o formulário e clique "Criar Post"

---

## 4. Deploy no Hosting

Quando pronto para subir no hosting:

### 4.1 Build da aplicação
```bash
npm run build
```
Arquivos gerados em `dist/`

### 4.2 Upload via FTP
1. Faça upload do conteúdo de `dist/` para `ufpr.devjoelchagas.com.br`
2. Faça upload da pasta `server/` para um diretório no hosting
3. No painel, configure a aplicação Node.js para rodar em `server/server.js`

### 4.3 Definir variáveis de produção
No hosting, configure as variáveis de ambiente (`server/.env` com dados reais do banco)

---

## 5. API Endpoints

O backend segue o contrato definido em `src/lib/api.ts`. Os campos seguem o
formato `BlogPost` (camelCase: `slug`, `coverImage`, `status`, `publishedAt`, …).

```
Público
  GET    /api/posts              — Lista artigos PUBLICADOS (mais recentes primeiro)
  GET    /api/posts/:slug        — Um artigo publicado, pelo slug

Autenticação
  POST   /api/auth/login         — { token, user }   body: { email, password }

Admin (requer header Authorization: Bearer <token JWT>)
  GET    /api/admin/posts        — Lista TODOS os artigos (inclusive rascunhos)
  GET    /api/admin/posts/:id    — Um artigo, pelo id
  POST   /api/admin/posts        — Cria artigo (BlogPostInput)
  PUT    /api/admin/posts/:id    — Atualiza artigo
  DELETE /api/admin/posts/:id    — Remove artigo (204)
  POST   /api/upload-image       — Upload de imagem (multipart, campo "image") → { url }
```

### Credenciais de acesso ao painel
- **Email:** `admin@cesmvc.ufpr.br`
- **Senha:** `cesmvc2025`
- Definidas em `server/auth.js` (`ADMIN_USERS`).

### Imagens
As imagens enviadas pelo painel são salvas no **servidor**, na pasta
`server/uploads/`, e servidas em `/uploads/<arquivo>`. A URL completa é
gravada no campo `coverImage` do post.

---

## ⚠️ Segurança

- **JWT_SECRET**: defina um valor forte e aleatório no `server/.env`.
- Troque a senha padrão do admin antes de ir para produção (em `server/auth.js`).
- Em produção, mova as credenciais do admin para o banco de dados com hash (bcrypt).
