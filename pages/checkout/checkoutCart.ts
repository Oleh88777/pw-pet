import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCart {
    readonly page: Page;
    readonly iconCard: Locator;
    readonly btnProceedToCheckout: Locator;
    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly cardTotal: Locator;
    readonly proceedToCheckout: Locator;
    readonly buttonDeleteItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iconCard = page.getByTestId('nav-cart');
        this.btnProceedToCheckout = page.getByTestId('proceed-1');
        this.productName = page.getByTestId('product-title');
        this.productQuantity = page.getByTestId('product-quantity');
        this.cardTotal = page.getByTestId('cart-total');
        this.proceedToCheckout = page.getByRole('button', { name: 'Proceed to checkout' });
        this.buttonDeleteItems = page.locator('a:has(svg[data-icon="xmark"])');
    }

    async checkUserIsSignIn() {
        const loggedInText = this.page.getByText(/you are already logged in/i);
        await expect(loggedInText).toBeVisible();
    }
}
