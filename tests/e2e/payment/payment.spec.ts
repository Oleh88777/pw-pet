import { expect, test } from '@playwright/test';
import { readFile } from 'fs/promises';
import { ProductPage } from '../../../pages/shop/productPage';
import { CheckoutCart } from '../../../pages/checkout/checkoutCart';
import { CheckoutBilling } from '../../../pages/checkout/checkoutBilling';
import { UserData } from '../../../ts-types/types';

test.describe('Payment Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('category/hand-tools');
    });

    test('Happy Path Payment Flow', async ({ page }) => {
        const productPage = new ProductPage(page);
        const checkoutCart = new CheckoutCart(page);
        const checkoutBilling = new CheckoutBilling(page);

        await test.step('Add item to the Card and Validate that Card is Visible', async () => {
            await productPage.addItemToCart('Combination Pliers');
            await expect(page).toHaveURL(/\/product\//);
            await expect(checkoutCart.iconCard).toBeVisible();
        });

        await test.step('Validate the Item Name, Quantity, inside the Card', async () => {
            await checkoutCart.iconCard.click();
            await expect(page).toHaveURL('checkout');
            await expect(checkoutCart.productName).toBeVisible();
            await expect(checkoutCart.productName).toContainText('Combination Pliers');
            await expect(checkoutCart.productQuantity).toBeVisible();
            await expect(checkoutCart.productQuantity).toHaveValue('1');
        });

        await test.step('Validate Item, Price, proceed to the Billing', async () => {
            await expect(checkoutCart.cardTotal).toBeVisible();
            await expect(checkoutCart.cardTotal).toContainText(/\$?14\.15/);
            await expect(checkoutCart.buttonDeleteItems).toBeVisible();
            await checkoutCart.proceedToCheckout.click();
            await expect(page).toHaveURL('checkout');
            await checkoutCart.checkUserIsSignIn();
            await checkoutCart.proceedToCheckout.click();
            await expect(checkoutBilling.billingTitle).toBeVisible();
            await expect(checkoutBilling.billingTitle).toContainText('Billing Address');
        });

        await test.step('Validate the Billing form Fields', async () => {
            const rawUserData = await readFile('playwright/.checkout.user.data.json', 'utf-8');
            const user = JSON.parse(rawUserData) as UserData;
            await checkoutBilling.checkBillingFiledValues(user);
        });
    });
});
