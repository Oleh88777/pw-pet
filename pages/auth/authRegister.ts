import { type Locator,  type Page} from '@playwright/test';
import {UserData} from "../../ts-types/types";


export class AuthRegister {
    readonly page: Page;
    readonly registrationButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly dateOfBirth: Locator;
    readonly selectCountry: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly phoneNumber: Locator;
    readonly userEmail: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationButton = page.getByRole('link', {name: 'Register your account'});
        this.firstName = page.getByRole('textbox', {name: 'First Name'});
        this.lastName = page.getByRole('textbox', {name: 'Last Name'});
        this.dateOfBirth = page.getByRole('textbox', {name: 'Date of Birth'});
        this.selectCountry = page.locator('[data-test="country"]');
        this.postalCode = page.getByRole('textbox', {name: 'Postal code'});
        this.houseNumber = page.getByRole('textbox', {name: 'House number'});
        this.streetAddress = page.getByRole('textbox', {name: 'Street'});
        this.city = page.getByRole('textbox', {name: 'City'});
        this.state = page.getByRole('textbox', {name: 'State'});
        this.phoneNumber = page.getByRole('textbox', {name: 'Phone'});
        this.userEmail = page.getByRole('textbox', {name: 'Email address'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.registerButton = page.getByRole('button', {name: 'Register '});
    }

    async customerDetails(user: UserData): Promise<void> {
      await this.firstName.fill(user.firstName);
      await this.lastName.fill(user.lastName);
      await this.dateOfBirth.fill(user.dateOfBirth);
    }

    async customerAddressDetails(user: UserData): Promise<void> {
        await this.selectCountry.selectOption(['CZ']);
        await this.postalCode.fill(user.postalCode);
        await this.houseNumber.fill(user.houseNumber);
        await this.streetAddress.fill(user.street);
        await this.city.fill(user.city);
        await this.state.fill(user.state);
    }

    async customerContactsDetails(user: UserData): Promise<void> {
      await this.phoneNumber.fill(user.phone);
      await this.userEmail.fill(user.emailAddress);
    }

    async fullRegistration(user: UserData): Promise<void> {
        await this.registrationButton.click();
        await this.customerDetails(user);
        await this.customerAddressDetails(user);
        await this.customerContactsDetails(user);
        await this.password.fill(user.password);
        await this.registerButton.click();
    }
}
