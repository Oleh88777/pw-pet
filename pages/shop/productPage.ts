import {type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addCart: Locator;
    readonly iconCard: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addCart = page.getByTestId('add-to-cart');
        this.iconCard = page.getByTestId('nav-cart');
    }

    async addItemToCart(productName: string): Promise<void> {
        const item = this.page.getByRole('heading', { name: productName });
        await item.click();
        await this.addCart.click();
    }
}