const { expect } = require("@playwright/test");

let count = 0;
let cross = 1;
exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;

    this.shop = '//*[@id="menu-primary"]/li[2]/a/div/span';
    // this.itemSelect =
    //   '//*[@id="minimog-main-post"]/div/div[2]/div[1]/div[1]/div[2]/a/div/m-image/img';
    this.itemSelect = '(//div[contains(@class, "product-main-image")])[1]';
    this.addButton = '(//span[contains(text(),"Add to basket")])[1]';
    this.basket = '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[1]/h3';
    // this.increase =
    //   '//*[@id="woo-single-info"]/div/div[2]/div/div/form/div[2]/div[2]/div/div/div/button[2]';
    this.increase =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';
    this.remove = '//a[contains(text(),"Remove")]';
    this.emptyCart = '//h2[contains(text(),"Your basket is currently empty")]';
    this.crossButton = '//*[@id="btn-close-fly-cart"]';
  }

  async addToCart(message) {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.addButton).click();
    await this.page.locator(this.increase).click();
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator(this.basket)).toHaveText(message);
  }

  async removeQuantity() {
    await this.page.locator(this.remove).click();
    await expect(this.page.locator(this.emptyCart)).toHaveText(
      "Your basket is currently empty"
    );
  }

  async addMultipleItem() {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    for (let i = 1; i <= 3; i++) {
      await this.page.locator(this.addButton).click();
      count++;
      while (cross < 3) {
        await this.page.locator(this.crossButton).click();
        cross++;
        break;
      }
    }
    await this.page.waitForTimeout(3000);

    const inputElement = this.page
      .locator(".quantity .input-text.qty.text")
      .nth(1);
    const value = await inputElement.inputValue();
    console.log(value);
    if (count == value) {
      console.log("Test Successful!");
    } else {
      console.log("Test Failed!");
    }
  }
};
