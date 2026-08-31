import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCard {
    readonly page: Page;
    readonly iconCard: Locator;
    readonly btnProceedToCheckout: Locator;
    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly cardTotal: Locator
    readonly proceedToCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iconCard = page.getByTestId('nav-cart');
        this.btnProceedToCheckout = page.getByTestId('proceed-1');
        this.productName = page.getByTestId('product-title');
        this.productQuantity = page.getByTestId('product-quantity');
        this.cardTotal = page.getByTestId('cart-total');
        this.proceedToCheckout  = page.getByRole('button', {name: 'Proceed to checkout'});
    }

}


// const cardTotal: Locator = page.getByTestId('cart-total');
// const proceedToCheckout: Locator = page.getByRole('button', {name: 'Proceed to checkout'});