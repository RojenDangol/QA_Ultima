const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.cross = '//*[@id="modal-promo-popup"]/div[2]/div[1]';
    this.loginClick = '//*[@id="page-header-inner"]/div/div/div[3]/div/a[1]';
    this.usernameInput = '//*[@id="username"]';
    this.passwordInput = '//*[@id="password"]';
    this.loginButton = '//*[@id="customer_login"]/div[1]/div/form/button';
    this.validLoginValidation = '//*[@id="post-14"]/div/div/div[1]/div/div/h6';
    this.errorMessage = '//*[@id="error"]';
    // this.successMessage = "";
  }

  async login(username, password) {
    await this.page.locator(this.cross).click();
    await this.page.locator(this.loginClick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "rojendangol1"
    );
  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
