# Playwright Web Test Automation

End-to-end test automation project built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** pattern.

This project uses the [Practice Software Testing](https://practicesoftwaretesting.com/) website as a demonstration application, while serving as a reusable foundation for end-to-end test automation projects.

The project validates web application flows through UI and API interactions while keeping tests maintainable, scalable, and easy to understand.

---

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Dotenv
- Faker

---

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (LTS v24+)
- npm

Verify your installation:

```bash
node -v
npm -v
```

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install chromium
```

Validate TypeScript types:

```bash
npm run typecheck
```

---

## Environment Variables

Create a `.env` file in the project root.

You can use the provided `.env.example` file as a reference for the required variables and expected format.

Required variables:

```env
API_URL=
BASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

The test suite validates these variables during startup and will fail if any required variable is missing.

---

## Running Tests

By default, tests run in **headless mode**.

Run all tests:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/specs/login.spec.ts
```

Run tests matching a title:

```bash
npx playwright test -g "Login"
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Open Playwright UI Mode:

```bash
npx playwright test --ui
```

---

## Reporting

An HTML report is generated after each execution.

Report location:

```text
playwright-report/
```

Open the latest report:

```bash
npx playwright show-report
```

---

## Playwright Configuration

Current project settings:

- Chromium browser
- Headless execution by default
- Fully parallel execution
- Retries enabled in CI environments
- Screenshots captured on failure
- Video recording retained on failure
- Trace collection on first retry
- HTML reporting enabled

---

## Project Structure

```text
project-root/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
├── .env.example
│
├── tests/
│   ├── dtos/
│   │   ├── requests/
│   │   └── responses/
│   │
│   ├── factories/
│   │
│   ├── fixtures/
│   │
│   ├── mappers/
│   │
│   ├── models/
│   │
│   ├── pages/
│   │
│   ├── specs/
│   │   ├── login.spec.ts
│   │   ├── register.spec.ts
│   │   └── ...
│   │
│   └── utils/
│       ├── env-validator.ts
│       └── ...
│
├── playwright-report/
└── test-results/
```

---

## Test Architecture

This project follows the **Page Object Model (POM)** pattern and separates responsibilities by layer.

### Specs

Contain test scenarios and assertions.

### Pages

Contain Playwright locators and reusable UI actions.

### Models

Represent application entities and business objects.

### DTOs

Store request and response contracts used by APIs.

### Mappers

Handle transformations between DTOs and domain models.

### Factories

Generate test data and reusable objects for test execution.

### Fixtures

Provide dependency injection and shared setup for tests.

### Utils

Contain helper methods, validations, and reusable utilities.

---

## Example

```typescript
test("admin can login", async ({ loginPage }) => {
  await loginPage.login(email, password);

  await expect(loginPage.dashboardTitle).toBeVisible();
});
```

---

## CI/CD Behavior

The configuration automatically adjusts when running in a CI environment:

```typescript
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined
```

This provides:

- Retry support for unstable environments
- Single-worker execution when required
- Protection against accidentally committed `.only()` tests

---

## Useful Commands

| Command | Description |
|----------|-------------|
| `npx playwright test` | Run all tests in headless mode |
| `npx playwright test --headed` | Run tests with browser visible |
| `npx playwright test --debug` | Run tests using Playwright Inspector |
| `npx playwright test --ui` | Open Playwright UI Mode |
| `npm run typecheck` | Validate TypeScript types |
| `npx playwright show-report` | Open the latest HTML report |
| `npx playwright test tests/specs/login.spec.ts` | Run a specific test file |
| `npx playwright test -g "Login"` | Run tests matching a title |

---

## Best Practices

- Keep assertions inside test files.
- Keep locators and actions inside Page Objects.
- Avoid duplicated selectors.
- Use environment variables for sensitive information.
- Keep test data separated from test logic.
- Reuse fixtures and factories whenever possible.
- Prefer models and DTOs to improve maintainability and type safety.

---

## Author

[**Felseje**](https://github.com/felseje)
