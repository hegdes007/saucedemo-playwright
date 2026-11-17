# saucedemo-playwright

End-to-end UI automation of the SauceDemo application using Playwright and TypeScript.

The project uses the Page Object Model (POM), data-driven testing, and Playwright's storageState to reuse authenticated sessions.

# Features
- Page Object Model (POM)
- Data-driven testing
- Reusable authentication using storageState
- Cross-browser testing (Chromium, Firefox and WebKit)
- Allure reporting
- GitHub Actions CI/CD
- Automated report deployment using GitHub Pages

# Tech Stack
~~~
- Playwright
- TypeScript
- Node.js
- Allure Reports
- GitHub Actions
~~~

# Project Structure
~~~text
saucedemo-playwright/
│
├── .github/
│   └── workflows/              # GitHub Actions CI/CD workflows
│
├── tests/
│   ├── fixtures/                # Test data for data-driven testing
│   ├── pages/                   # Page Object Model
│   │
│   ├── auth.setup.js            # Authentication setup and storage state
│   ├── cartPage.spec.ts         # Cart page test cases
│   ├── checkOutPage.spec.ts     # Checkout page test cases
│   └── inventoryPage.spec.ts    # Inventory page test cases
│
├── allure-results/              # Generated Allure test results
├── allure-report/               # Generated Allure HTML report
│
├── allurerc.mjs                 # Allure configuration
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
└── README.md
~~~

Getting Started

Prerequisites: Node.js 22+ and npm.

# Clone the repository:
~~~bash
git clone https://github.com/hegdes007/saucedemo-playwright.git

cd saucedemo-playwright
~~~

# Install dependencies:
~~~bash
npm ci
~~~

# Install Playwright browsers:
~~~bash
npx playwright install
~~~

## Running Tests
Run tests across all configured browsers:

~~~bash
npm test
~~~

Run tests on a specific browser:

~~~bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
~~~

Launch Playwright UI mode:

~~~bash
npm run guiTest
~~~

## Allure Report

Generate the report:

~~~bash
npx allure generate
~~~

Open the report:

~~~bash
npx allure open
~~~

# Test Report

HTML Report - https://hegdes007.github.io/saucedemo-playwright/

# Repository

GitHub – SauceDemo Playwright - https://github.com/hegdes007/saucedemo-playwright/

