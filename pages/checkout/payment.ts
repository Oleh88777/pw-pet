import {type Page, type Locator} from "@playwright/test";
import {PaymentMethod} from "../../ts-types/types";

export class Payment {
    readonly page: Page;
    readonly selectPayment: Locator;
    readonly title: Locator;
    readonly buttonConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectPayment = page.getByTestId('payment-method');
        this.title = page.getByRole('heading', {name: 'Payment'});
        this.buttonConfirm = page.getByRole('button', {name: 'Confirm'});
    }

    async selectPaymentMethod (value: PaymentMethod) {
        await this.selectPayment.selectOption(value);
    }
}