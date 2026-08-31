import {expect, Locator, test} from '@playwright/test';
import {ProductPage} from "../../../pages/shop/productPage";
import {CheckoutCard} from "../../../pages/checkout/checkout";


test.describe('Payment Flow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('category/hand-tools');
    });


    test('Happy Path Payment Flow', async ({page}) => {
        const productPage = new ProductPage(page);
        const checkoutCard = new CheckoutCard(page);



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
           await checkoutCard.iconCard.click();
           await expect(page).toHaveURL('checkout');
           await expect(checkoutCard.productName).toBeVisible();
           await expect(checkoutCard.productName).toContainText('Combination Pliers');

           await expect(checkoutCard.productQuantity).toBeVisible();
           await expect(checkoutCard.productQuantity).toHaveValue('1');
        });

        await test.step('Validate Item Price, button Proceed to Checkout', async () => {
         await expect(checkoutCard.cardTotal).toBeVisible();
         await expect(checkoutCard.cardTotal).toContainText(/\$?14\.15/);
         await expect(checkoutCard.proceedToCheckout).toBeVisible();
        })
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