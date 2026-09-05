import {expect, Locator, test} from '@playwright/test';
import {readFile} from 'fs/promises';
import {ProductPage} from "../../../pages/shop/productPage";
import {CheckoutCart} from "../../../pages/checkout/checkoutCart";
import {CheckoutBilling} from "../../../pages/checkout/checkoutBilling";
import {BillingAddress, UserData} from "../../../ts-types/types";


test.describe('Payment Flow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('category/hand-tools');
    });


    test('Happy Path Payment Flow', async ({page}) => {
        const productPage = new ProductPage(page);
        const checkoutCart = new CheckoutCart(page);
        const checkoutBilling = new CheckoutBilling(page);



        // const item: Locator = page.getByRole('heading', {name: 'Combination Pliers'});
        // const buttAddCard: Locator = page.getByTestId('add-to-cart');
        const iconCard: Locator = page.getByTestId('nav-cart');
        const quantityCard: Locator = page.getByTestId('product-quantity');
        const cardTotal: Locator = page.getByTestId('cart-total');
        const proceedToCheckout: Locator = page.getByRole('button', {name: 'Proceed to checkout'});
        const proceedToCheckout2: Locator = page. getByTestId('proceed-2');
        const proceedToCheckout3: Locator = page. getByTestId('proceed-3');
        const selectCountry: Locator = page.getByTestId('country');





        await test.step('Add item to the Card and Validate that Card is Visible', async () => {
            await productPage.addItemToCart('Combination Pliers');
            await expect(page).toHaveURL(/\/product\//);
            await expect(iconCard).toBeVisible();
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
         await expect(checkoutBilling.billingTitle).toContainText("Billing Address");
        })

        await test.step('Validate the Billing form Fields', async () => {
            const rawUserData = await readFile('playwright/.checkout.user.data.json', 'utf-8');
            const user = JSON.parse(rawUserData) as UserData;

            const expected: BillingAddress = {
                country: user.country,
                postalCode: user.postalCode,
                houseNumber: user.houseNumber,
                street: user.street,
                city: user.city,
                state: user.state,
            };

            await expect(checkoutBilling.country).toHaveValue(expected.country);
            await expect(checkoutBilling.postalCode).toHaveValue(expected.postalCode);
            await expect(checkoutBilling.houseNumber).toHaveValue(expected.houseNumber);
            await expect(checkoutBilling.street).toHaveValue(expected.street);
            await expect(checkoutBilling.city).toHaveValue(expected.city);
            await expect(checkoutBilling.state).toHaveValue(expected.state);
        });
    });
});





// await iconCard.click();
// await expect(page).toHaveURL(/\/checkout/);
// await expect(quantityCard).toHaveValue('1');
// await expect(cardTotal).toContainText('14.15');
// await proceedToCheckout.click();
// await expect(page).toHaveURL(/\/checkout/);
// await proceedToCheckout2.click();
// await expect(page).toHaveURL(/\/checkout/);
// // await proceedToCheckout3.click(); //click button in the end after all prefield field are verified
// await expect(page).toHaveURL(/\/checkout/);
// await expect(selectCountry).toBeVisible();
// await selectCountry.selectOption('CZ');
// await expect(selectCountry).toHaveValue('CZ');