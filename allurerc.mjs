import { defineConfig } from "allure";

export default defineConfig({
  name: "Playwright Automation Report for saucedemo website",

  output: "./allure-report",

  resultsDir: "./allure-results",

  // Preserve test history between CI runs
  historyPath: "./allure-history/history.jsonl",

  plugins: {
    awesome: {
      options: {
        reportName: "Playwright Automation Report for saucedemo website",
        singleFile: false,
        reportLanguage: "en",
        open: false,
      },
    },
  },
});
