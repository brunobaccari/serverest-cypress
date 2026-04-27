# Automação E2E com Cypress — ServeRest

[![Testes E2E e API](https://github.com/brunobaccari/serverest-challenge-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/brunobaccari/serverest-challenge-cypress/actions/workflows/cypress.yml)

Suíte de testes automatizados (E2E e API) para a plataforma ServeRest, cobrindo os fluxos de cadastro, login, gerenciamento de produtos e checkout de carrinho.

**Ambientes Testados:**
- **Frontend:** https://front.serverest.dev/
- **Swagger API:** https://serverest.dev/

## Tecnologias

- [Cypress](https://www.cypress.io/) v13
- [Faker.js](https://fakerjs.dev/) para dados dinâmicos
- ESLint + Prettier
- GitHub Actions (CI)

## Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── api/                  # Testes de API
│   └── frontend/             # Testes E2E de interface
├── pages/                    # Page Objects (POM)
│   ├── BasePage.js           # Classe base
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── ProductFormPage.js
│   └── UserFormPage.js
└── support/
    ├── selectors/            # Seletores CSS isolados
    ├── commands.js           # Comandos customizados
    ├── utils.js              # Geração de dados (Faker)
    └── index.d.ts            # Tipagem para IntelliSense
```

## Como Executar

```bash
# Clonar e instalar
git clone https://github.com/brunobaccari/serverest-challenge-cypress.git
cd serverest-challenge-cypress
npm install

# Configurar credenciais
cp .env.example .env
# Editar o .env com suas credenciais

# Executar
npm run cy:open              # Modo interativo
npm run cy:run:frontend      # Testes de frontend (headless)
npm run cy:run:api           # Testes de API (headless)
npm run cy:run:ci            # Suíte completa (CI)
```
