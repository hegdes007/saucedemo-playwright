import { test, expect } from "@playwright/test";

test("User should be able to log out from the inventory page", async ({
  page,
}) => {
  // Page starts already logged in
  await page.goto("https://www.saucedemo.com/inventory.html");

  await expect(page.locator(".app_logo")).toBeVisible();
});
