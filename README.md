# Cypress · ServeRest

[English version](README.en.md)

Testes de frontend e API do [ServeRest](https://serverest.dev/), com Page Objects, comandos compartilhados e dados gerados com Faker.

## Cobertura

- Login, validação de formulários e cadastro de usuários.
- Cadastro e exclusão de produtos pelo frontend.
- Autenticação, usuários, produtos e jornada de carrinho pela API.

Os testes ficam em `cypress/e2e/frontend` e `cypress/e2e/api`; páginas e seletores ficam em `cypress/pages` e `cypress/support`.

## Executar

```sh
git clone https://github.com/brunobaccari/serverest-cypress.git
cd serverest-cypress
npm ci
cp .env.example .env
npm run cy:open
```

Preencha `.env` com uma conta de teste do ServeRest: `USER_NAME`, `USER_EMAIL`, `USER_PASSWORD` e `USER_ADMIN`. No PowerShell, use `Copy-Item .env.example .env`. Não use credenciais pessoais.

| Comando | Execução |
| --- | --- |
| `npm run cy:run:api` | API |
| `npm run cy:run:frontend` | Frontend |
| `npm run cy:run:frontend:headed` | Frontend no Chrome visível |
| `npm run cy:run:ci` | Suíte no Chrome headless |
| `npm run lint` | Análise estática |

## Ambiente e CI

O projeto usa Cypress 13 e Faker 10. A configuração histórica de Node 18 em `.nvmrc` e no workflow precisa ser alinhada ao requisito do Faker 10 antes de reproduzir o ambiente. Essa revisão dos READMEs não atualizou dependências nem reexecutou a suíte.

O workflow `.github/workflows/cypress.yml` instala dependências, executa lint, API e frontend e coleta artefatos. As credenciais do CI vêm dos secrets `USER_EMAIL` e `USER_PASSWORD`. A configuração permite duas novas tentativas no modo de execução.

Na aba **Actions**, abra uma execução: o **Summary** mostra API e frontend, e **Artifacts** oferece `cypress-results` (JUnit por spec), `cypress-videos` e screenshots quando houver falhas. Vídeos e screenshots usam pastas separadas por camada; os artifacts ficam disponíveis por 14 dias. O [reporter JUnit nativo do Cypress](https://docs.cypress.io/app/tooling/reporters) usa `[hash]` para não sobrescrever o XML de outra spec.
