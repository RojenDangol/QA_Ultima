const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const { LoginPage } = require("../../pageObjects/login.po");
const { DashboardPage } = require("../../pageObjects/dashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await login.verifyValidLogin();
});

test.describe("Dashboard CRUD", () => {
  test("Add to cart", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.addToCart("Shopping Basket");
    await dashboard.removeQuantity();
  });
});
