import {expect, type Locator, type Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly buttonLogin: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.getByRole('textbox', { name: /Email address/i });
        this.password = page.getByRole('textbox', { name: /Password/i });
        this.buttonLogin = page.getByRole('button', { name: /Login/i });
    }

    async manualLogin(email: string, password: string, buttonLogin: Locator): Promise<void>  {
        await this.email.fill(email);
        await this.password.fill(password);
        await expect(buttonLogin).toBeVisible();
        await this.buttonLogin.click();
    }
}
