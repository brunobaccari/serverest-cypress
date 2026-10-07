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

Cada spec cria uma conta admin exclusiva e remove seus próprios usuários, produtos e carrinho no teardown. Não precisa de conta prévia nem secrets no CI. Execute somente no ambiente público de demonstração.

| Comando | Execução |
| --- | --- |
| `npm run cy:run:api` | API |
| `npm run cy:run:frontend` | Frontend |
| `npm run cy:run:frontend:headed` | Frontend no Chrome visível |
| `npm run cy:run:ci` | Suíte no Chrome headless |
| `npm run lint` | Análise estática |

## Ambiente e CI

Cypress 13 e Faker 10 executam com Node 24. O workflow instala dependências pelo lockfile com `npm ci`, executa lint, API e frontend e coleta artifacts. Dados exclusivos isolam o estado; o teardown remove somente registros criados pela spec. Processo interrompido ou API indisponível pode impedir a limpeza. O modo de execução mantém duas tentativas adicionais; confira as tentativas ao investigar instabilidade.

Na aba **Actions**, abra uma execução: o **Summary** mostra API e frontend, e **Artifacts** oferece `cypress-results` (JUnit por spec), `cypress-videos` e screenshots quando houver falhas. Vídeos e screenshots usam pastas separadas por camada; os artifacts ficam disponíveis por 14 dias. O [reporter JUnit nativo do Cypress](https://docs.cypress.io/app/tooling/reporters) usa `[hash]` para não sobrescrever o XML de outra spec.

O summary do Actions lista cada cenário, duração, totais e motivo de bloqueio. O gate exige a quantidade prevista no workflow, sem falhas ou skips; JUnit ausente ou inválido reprova. O resumo também acompanha o artifact.

Screenshots do estado final também são capturados nos testes de interface aprovados e ficam nos artifacts, fora do Git.
