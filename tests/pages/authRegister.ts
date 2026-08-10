import { type Locator,  type Page} from '@playwright/test';


export class AuthRegister {
    readonly page: Page;
    readonly registrationButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly DateOfBirth: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationButton = page.getByRole('link', {name: 'Register your account'});
        this.firstName = page.getByRole('textbox', {name: 'First Name'});
        this.lastName = page.getByRole('textbox', {name: 'Last Name'});
        this.DateOfBirth = page.getByRole('textbox', {name: 'Date of Birth'});
    }
}