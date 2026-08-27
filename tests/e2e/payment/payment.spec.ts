import {expect, Locator, test} from '@playwright/test';
import {LoginPage} from "../../../pages/login";



test.describe('Payment Flow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('category/hand-tools');
    });


    test('Happy Path Payment Flow', async ({page}) => {

        const item: Locator = page.getByRole('heading', {name: 'Combination Pliers'});
        const buttAddCard: Locator = page.getByTestId('add-to-cart');
        const iconCard: Locator = page.getByTestId('nav-cart');


        await test.step('Add item to the Card', async () => {
            await item.click();
            await expect(page).toHaveURL(/\/product\//);
            await buttAddCard.click();
            await iconCard.click();
            await expect(page).toHaveURL(/\/checkout/);
        });
    });
});