// Entrypoint CommonJS para o Passenger.
// Alguns Passenger/Node (especialmente versões antigas, como o Node 17 deste
// host) carregam o arquivo de inicialização via require(), que FALHA em arquivos
// ESM ("import ..."). Este arquivo é CommonJS (.cjs) — portanto require()-ável —
// e carrega o servidor real (ESM) via import() dinâmico, que funciona em CJS.
const { writeFileSync } = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'boot-error.log');

function logBoot(tag, err) {
  const line = `[${new Date().toISOString()}] ${tag}: ${err && err.stack ? err.stack : err}\n`;
  try {
    writeFileSync(logFile, line, { flag: 'a' });
  } catch (_) {
    /* sem permissão de escrita — segue para o console/stderr */
  }
  console.error(line);
}

process.on('unhandledRejection', (err) => logBoot('unhandledRejection', err));
process.on('uncaughtException', (err) => logBoot('uncaughtException', err));

// import() dinâmico carrega o módulo ES mesmo a partir de um arquivo CommonJS.
import('./server/server.js').catch((err) => logBoot('import server/server.js', err));
