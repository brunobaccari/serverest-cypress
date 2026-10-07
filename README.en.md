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

Each spec creates a unique admin account and removes its own users, products and cart in teardown. No pre-existing account or CI credential is required. Run against the public demo only.

| Command | Execution |
| --- | --- |
| `npm run cy:run:api` | API |
| `npm run cy:run:frontend` | Frontend |
| `npm run cy:run:frontend:headed` | Frontend in headed Chrome |
| `npm run cy:run:ci` | Suite in headless Chrome |
| `npm run lint` | Static analysis |

## Environment and CI

Cypress 13 and Faker 10 run on Node 24. The workflow installs pinned dependencies with `npm ci`, runs lint, API and frontend tests, and collects artifacts. State is isolated by unique data; teardown removes only records created by this spec. A killed process or unavailable API can prevent cleanup. Run mode currently allows two retries; inspect attempts when investigating instability.

Open a run under **Actions**: its **Summary** shows API and frontend results, and **Artifacts** provides `cypress-results` (JUnit per spec), `cypress-videos` and screenshots when tests fail. Videos and screenshots use separate folders for each layer; artifacts are retained for 14 days. The [built-in Cypress JUnit reporter](https://docs.cypress.io/app/tooling/reporters) uses `[hash]` to avoid overwriting another spec's XML.

The Actions summary lists every scenario, duration, totals and blocking reason. The gate requires the count configured in the workflow, with no failures or skips; missing or invalid JUnit fails the gate. The summary is also included in the artifact.

Final-state screenshots are also captured for passing UI tests and stored in artifacts, outside Git.
