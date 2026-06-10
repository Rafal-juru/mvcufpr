// Ponto de entrada para o Plesk (Passenger).
// O Plesk usa "app.js" na raiz do aplicativo como arquivo de inicialização
// padrão; aqui apenas carregamos o servidor Express real, que vive em server/.
import './server/server.js';
