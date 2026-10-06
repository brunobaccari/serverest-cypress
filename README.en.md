# Cypress · ServeRest

[Versão em português](README.md)

Frontend and API tests for [ServeRest](https://serverest.dev/), using Page Objects, shared commands and Faker-generated data.

## Coverage

- Login, form validation and user registration.
- Product creation and deletion through the frontend.
- Authentication, users, products and a cart journey through the API.

Tests live in `cypress/e2e/frontend` and `cypress/e2e/api`; pages and selectors live in `cypress/pages` and `cypress/support`.

## Run

```sh
git clone https://github.com/brunobaccari/serverest-cypress.git
cd serverest-cypress
npm ci
cp .env.example .env
npm run cy:open
```

Set `USER_NAME`, `USER_EMAIL`, `USER_PASSWORD` and `USER_ADMIN` in `.env` for a ServeRest test account. In PowerShell, use `Copy-Item .env.example .env`. Do not use personal credentials.

| Command | Execution |
| --- | --- |
| `npm run cy:run:api` | API |
| `npm run cy:run:frontend` | Frontend |
| `npm run cy:run:frontend:headed` | Frontend in headed Chrome |
| `npm run cy:run:ci` | Suite in headless Chrome |
| `npm run lint` | Static analysis |

## Environment and CI

This project uses Cypress 13 and Faker 10. `.nvmrc` and the workflow still use Node 18, while Faker declares Node 20.19, 22.13, 23.5 or 24+. Aligning those versions remains pending; dependencies were preserved. The [output validation run](https://github.com/brunobaccari/serverest-cypress/actions/runs/37475395660) passed all 13 tests, and its XML reports and videos were downloaded and inspected.

The `.github/workflows/cypress.yml` workflow installs dependencies, runs lint, API and frontend tests, and collects artifacts. CI credentials come from `USER_EMAIL` and `USER_PASSWORD` secrets. Run mode allows two retries.

Open a run under **Actions**: its **Summary** shows API and frontend results, and **Artifacts** provides `cypress-results` (JUnit per spec), `cypress-videos` and screenshots when tests fail. Videos and screenshots use separate folders for each layer; artifacts are retained for 14 days. The [built-in Cypress JUnit reporter](https://docs.cypress.io/app/tooling/reporters) uses `[hash]` to avoid overwriting another spec's XML.
