import './commands';

// Hide fetch/XHR requests from the Cypress command log for cleaner output.
// Injects a CSS rule into the runner frame to hide request entries.
// Guard: only applies when window.top context is available.
if (window.top) {
  const app = window.top;
  if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
}
