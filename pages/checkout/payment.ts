import {type Page, type Locator} from "@playwright/test";
import {PaymentMethod} from "../../ts-types/types";
import {cardNumber, cvv, getExpirationDate} from "../../utils/creditCard";

export class Payment {
    readonly page: Page;
    readonly selectPayment: Locator;
    readonly title: Locator;
    readonly buttonConfirm: Locator;
    readonly fieldCreditCardNumber: Locator;
    readonly messagePaymentSuccessful: Locator;
    readonly expirationDate: Locator;
    readonly cvv: Locator;
    readonly cardHolderName: Locator;
    readonly paymentButtonConfirm: Locator;
    readonly paymentSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectPayment = page.getByTestId('payment-method');
        this.title = page.getByRole('heading', {name: 'Payment'});
        this.buttonConfirm = page.getByRole('button', {name: 'Confirm'});
        this.fieldCreditCardNumber = page.getByTestId('credit_card_number');
        this.messagePaymentSuccessful = page.getByTestId('payment-success-message');
        this.expirationDate = page.getByTestId('expiration_date');
        this.cvv = page.getByTestId('cvv');
        this.cardHolderName = page.getByTestId('card_holder_name');
        this.paymentButtonConfirm = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    }

    async selectPaymentMethod(value: PaymentMethod): Promise<void> {
        await this.selectPayment.selectOption(value);
    }

    async fillCreditCardDetails(): Promise<void> {
        await this.fieldCreditCardNumber.fill(cardNumber());
        await this.cvv.fill(cvv());
        await this.expirationDate.fill(getExpirationDate());
        await this.cardHolderName.fill('Oleh Mykhayliv');
    }
}
