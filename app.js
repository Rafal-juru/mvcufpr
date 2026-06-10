// Ponto de entrada para o Plesk (Passenger).
// Além de carregar o servidor real (server/server.js), captura qualquer erro de
// inicialização num arquivo legível (boot-error.log na raiz do app), porque o
// Passenger em produção esconde o stack real ("application process exited
// prematurely"). Assim conseguimos diagnosticar pelo Gerenciador de Arquivos.
import { writeFileSync } from 'fs';

const logFile = new URL('./boot-error.log', import.meta.url);

function logBoot(tag, err) {
  const line = `[${new Date().toISOString()}] ${tag}: ${err && err.stack ? err.stack : err}\n`;
  try {
    writeFileSync(logFile, line, { flag: 'a' });
  } catch {
    /* sem permissão de escrita — segue para o console */
  }
  console.error(line);
}

// Handlers impedem que uma exceção/rejeição derrube o processo no boot,
// e registram a causa.
process.on('unhandledRejection', (err) => logBoot('unhandledRejection', err));
process.on('uncaughtException', (err) => logBoot('uncaughtException', err));

// Importa o servidor; se o módulo falhar ao carregar (ex.: dependência ausente),
// o erro real é gravado no boot-error.log.
import('./server/server.js').catch((err) => logBoot('import server/server.js', err));
