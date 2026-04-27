import './commands';

// Oculta requisições fetch/XHR do log de comandos do Cypress para saída mais limpa.
// Injeta uma regra CSS no frame do runner para esconder as entradas de request.
// Guarda: aplica somente quando há acesso ao contexto do `window.top`.
if (window.top) {
  const app = window.top;
  if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
}
