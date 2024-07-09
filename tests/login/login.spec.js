const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
// const contactData = require("../../fixture/contact.json");
const { LoginPage } = require("../../pageObjects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Valid Login tests", () => {
  test("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    // await page.waitForTimeout(2000);
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();
  });
});

test.describe("Invalid Login Tests", () => {
  test("Invalid login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUserPass.username,
      testData.invalidUserPass.password
    );
    // await page.waitForTimeout(2000);

    await login.invalidLogin();
  });
});
