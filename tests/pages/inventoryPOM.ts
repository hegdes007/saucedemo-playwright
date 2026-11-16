export default function inventoryPOM() {
  // Array with all sorting options stored
  const sortingOptions = [
    { name: "Name (A to Z)", value: "az", type: "name", order: "asc" },
    { name: "Name (Z to A)", value: "za", type: "name", order: "desc" },
    { name: "Price (low to high)", value: "lohi", type: "price", order: "asc" },
    {
      name: "Price (high to low)",
      value: "hilo",
      type: "price",
      order: "desc",
    },
  ];

  //Function for sorting by A-Z, Z-A, Price high-low & low-high
  async function sorting(page: any, option: any) {
    let actualValues; //To store values from page

    if (option.type === "name") {
      actualValues = await page
        .locator(".inventory_item_name") //Store name if sorting by name
        .allTextContents();
    } else {
      const prices = await page
        .locator(".inventory_item_price") //Store price if sorting by price
        .allTextContents();
      actualValues = prices.map((price) => Number(price.replace("$", ""))); //Remove $ from the price
    }

    //sorted values are stored in expected values
    const expectedValues = [...actualValues].sort((a, b) => {
      if (option.type === "name") {
        const nameA = String(a);
        const nameB = String(b);
        return option.order === "asc"
          ? nameA.localeCompare(nameB) //Sort names by ascending order
          : nameB.localeCompare(nameA); //Sort names by descending order
      } else {
        const priceA = Number(a);
        const priceB = Number(b);
        return option.order === "asc"
          ? priceA - priceB //Sort prices by ascending order
          : priceB - priceA; //Sort prices by descending order
      }
    });

    return { actualValues, expectedValues };
  }

  return { sortingOptions, sorting };
}
