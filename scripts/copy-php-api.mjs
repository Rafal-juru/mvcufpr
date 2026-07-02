// Copia backend-php/api/ (fonte PHP versionada) para server/public/api/
// (pasta de deploy, regenerada a cada build:deploy). O config.php real do
// servidor nunca é versionado, então nunca é copiado por aqui — só o
// config.example.php viaja.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptsDir = fileURLToPath(new URL('.', import.meta.url));
const root = path.join(scriptsDir, '..');
const src = path.join(root, 'backend-php', 'api');
const dest = path.join(root, 'server', 'public', 'api');

if (!existsSync(src)) {
  throw new Error(`Fonte não encontrada: ${src}`);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

// Garante que a pasta de uploads exista no destino (não é parte do fonte
// PHP versionado — imagens enviadas em runtime não devem ir pro Git).
const uploadsDir = path.join(dest, 'uploads');
mkdirSync(uploadsDir, { recursive: true });
writeFileSync(path.join(uploadsDir, '.gitkeep'), '');

console.log(`✓ backend-php/api copiado para server/public/api`);
