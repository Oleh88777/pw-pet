import { expect, type Locator, type Page } from '@playwright/test';
import { BillingAddress } from '../../ts-types/types';

export class CheckoutBilling {
    readonly page: Page;
    readonly country: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly proceedToCheckout: Locator;
    readonly billingTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.country = page.getByTestId('country');
        this.postalCode = page.getByRole('textbox', { name: 'Postal code' });
        this.houseNumber = page.getByRole('textbox', { name: 'House number' });
        this.street = page.getByRole('textbox', { name: 'Street' });
        this.city = page.getByRole('textbox', { name: 'City' });
        this.state = page.getByRole('textbox', { name: 'State' });
        this.proceedToCheckout = page.getByTestId('proceed-2');
        this.billingTitle = page.getByRole('heading', { name: 'Billing Address' });
    }

    async checkBillingFiledValues(data: BillingAddress): Promise<void> {
        await expect(this.postalCode).toHaveValue(data.postalCode);
        await expect(this.country).toHaveValue(data.country);
        await expect(this.houseNumber).toHaveValue(data.houseNumber);
        await expect(this.street).toHaveValue(data.street);
        await expect(this.city).toHaveValue(data.city);
        await expect(this.state).toHaveValue(data.state);
    }
}
