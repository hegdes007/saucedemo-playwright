import { test, expect } from "@playwright/test";
import products from "./fixtures/inventory.json";
import inventoryPOM from "./pages/inventoryPOM";

test.beforeEach(async ({ page }) => {
  // Page opens as user has already logged in
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test("User should be able to see Products and its details in the inventory page", async ({
  page,
}) => {
  await expect(page.locator("[data-test='title']")).toHaveText("Products");

  const inventoryItems = page.locator(".inventory_list .inventory_item");
  // Verify item count
  await expect(inventoryItems).toHaveCount(products.length);
  // Iterate through all inventory items for testing the data with json
  for (let i = 0; i < products.length; i++) {
    const item = inventoryItems.nth(i); // individual item from the page

    await expect(item.locator(".inventory_item_name")).toHaveText(
      products[i].name,
    );
    await expect(item.locator(".inventory_item_desc")).toHaveText(
      products[i].description,
    );
    await expect(item.locator(".inventory_item_price")).toHaveText(
      products[i].price,
    );
  }
});

// Iterating through multiple sorting options and dynamically adding the tests
for (const option of inventoryPOM().sortingOptions) {
  test(`Test Sorting in Inventory page: Sort products by ${option.name}`, async ({
    page,
  }) => {
    // Select the sorting option
    await page.locator(".product_sort_container").selectOption(option.value);

    // Function to sort the actual values to find the expected values
    const { actualValues, expectedValues } = await inventoryPOM().sorting(
      page,
      option,
    );

    expect(actualValues).toEqual(expectedValues);
  });
}

test("Verify Add to cart and Remove buttons with cart values in Inventory page", async ({
  page,
}) => {
  // Add two items to the cart
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await page.locator("#add-to-cart-sauce-labs-bike-light").click();
  // Verify Add button doesn't exist
  await expect(page.locator("#add-to-cart-sauce-labs-bike-light")).toHaveCount(
    0,
  );
  // Verify Cart Values
  await expect(page.locator(".shopping_cart_link")).toHaveAttribute(
    "aria-label",
    "Cart, 2 items",
  );
  // Remove an item from the cart
  await page.locator("#remove-sauce-labs-bike-light").click();
  // Verify Remove button doesn't exist
  await expect(page.locator("#remove-sauce-labs-bike-light")).toHaveCount(0);
  // Verify the Cart Value again
  await expect(page.locator(".shopping_cart_link")).toHaveAttribute(
    "aria-label",
    "Cart, 1 items",
  );
});
