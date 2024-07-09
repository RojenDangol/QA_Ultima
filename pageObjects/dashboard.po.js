const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;

    this.shop = '//*[@id="menu-primary"]/li[2]/a/div/span';
    this.itemSelect =
      '//*[@id="minimog-main-post"]/div/div[2]/div[1]/div[1]/div[2]/a/div/m-image/img';
    this.addButton =
      '//*[@id="woo-single-info"]/div/div[2]/div/div/form/div[2]/div[2]/div/button[1]';
    this.basket = '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[1]/h3';
    this.increase =
      '//*[@id="woo-single-info"]/div/div[2]/div/div/form/div[2]/div[2]/div/div/div/button[2]';
    this.remove =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/a';
  }

  async addToCart(message) {
    await this.page.locator(this.shop).click();
    await this.page.locator(this.itemSelect).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.increase).click();

    await this.page.locator(this.addButton).click();
    await expect(this.page.locator(this.basket)).toHaveText(message);
  }

  async removeQuantity() {
    await this.page.locator(this.remove).click();
  }
};
