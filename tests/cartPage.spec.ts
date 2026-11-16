import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Add cart-items via local storage for testing before page load
  await page.addInitScript(() => {
    localStorage.setItem("cart-contents", JSON.stringify([4, 0, 1]));
  });
  // Page opens as user has already logged in
  await page.goto("https://www.saucedemo.com/cart.html");
});

test("Verify Cart contents and buttons in Cart Page", async ({ page }) => {
  // Verify the Cart items by removing them from cart page
  await expect(page.locator(".cart_item")).toHaveCount(3);
  await page.locator("#remove-sauce-labs-bolt-t-shirt").click();
  await expect(page.locator(".cart_item")).toHaveCount(2);
  await expect(page.locator(".shopping_cart_link")).toHaveAttribute(
    "aria-label",
    "Cart, 2 items",
  );
  // Verify the product link button and cart button
  await page.locator("#item_4_title_link").click();
  await expect(page.locator(".inventory_details_container")).toBeVisible();
  await page.locator(".shopping_cart_link").click();
  await expect(page.getByText("Your Cart")).toBeVisible();
  // Verify the Continue Shopping button and cart button
  await page.locator("#continue-shopping").click();
  await expect(page.locator(".inventory_container")).toBeVisible();
  await page.locator(".shopping_cart_link").click();
  await expect(page.getByText("Your Cart")).toBeVisible();
});
