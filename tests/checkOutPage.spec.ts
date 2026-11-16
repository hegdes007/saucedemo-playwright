import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Add cart-items via local storage for testing before page load
  await page.addInitScript(() => {
    localStorage.setItem("cart-contents", JSON.stringify([4, 0, 1]));
  });
  // Page opens as user has already logged in
  await page.goto("https://www.saucedemo.com/checkout-step-one.html");
});

test("Verify Cancel button in Checkout Page", async ({ page }) => {
  // Verify the Cancel button
  await page.locator("#cancel").click();
  await expect(page.getByText("Your Cart")).toBeVisible();
  // Verify Checkout button
  await page.locator("#checkout").click();
  await expect(page.getByText("Checkout: Your Information")).toBeVisible();
});

test("Checkout cart by filling the details", async ({ page }) => {
  //Verify Error message on blank fields
  await page.locator("#continue").click();
  await expect(page.locator(".error-button")).toBeVisible();
  //Fill in the details
  await page.locator("#first-name").fill("John");
  await page.locator("#last-name").fill("Doe");
  await page.locator("#postal-code").fill("6769");
  // Once user clicks continue Overview page should be visible
  await page.locator("#continue").click();
  await expect(page.getByText("Checkout: Overview")).toBeVisible();
  await expect(page.locator(".checkout_summary_container")).toBeVisible();
  // Once user clicks Finish button items should be ordered
  await page.locator("#finish").click();
  await expect(page.getByText("Checkout: Complete")).toBeVisible();
  await expect(page.locator(".checkout_complete_container")).toBeVisible();
});
