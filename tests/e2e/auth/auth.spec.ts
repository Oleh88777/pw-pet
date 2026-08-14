import { expect, test } from '@playwright/test';
import {AuthRegister} from "../../../pages/authRegister";
import {fakerCS_CZ} from "@faker-js/faker";
import {LoginPage} from "../../../pages/login";
import {manualTestUser} from "../../../test-data/testUser";
import {UserData} from "../../../ts-types/types";


let authPage: AuthRegister;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    authPage = new AuthRegister(page);
    loginPage = new LoginPage(page);
});


test('Full Registration', async ({ page }): Promise <void> => {
  // Random test data
    const randomFirstName: string = fakerCS_CZ.person.firstName('male');
    const randomLastName: string = fakerCS_CZ.person.lastName('male');
    const randomDateOfBirth: string = fakerCS_CZ.date.birthdate({ mode: 'age', min: 21, max: 40 }).toISOString().split('T')[0];
    const buildingNumber: string = fakerCS_CZ.location.buildingNumber();
    const streetName: string = fakerCS_CZ.location.street();
    const city: string = fakerCS_CZ.location.city();
    const state: string = fakerCS_CZ.location.state();
    const postalCode: string = fakerCS_CZ.location.zipCode();
    const phone: string = `7${fakerCS_CZ.number.int({ min: 20, max: 99 })}${fakerCS_CZ.number.int({ min: 100, max: 999 })}${fakerCS_CZ.number.int({ min: 100, max: 999 })}`;
    const emailAddress: string = fakerCS_CZ.internet.email();
    const password: string = `Qa1!${fakerCS_CZ.internet.password({ length: 10 })}`;

    const autoUser: UserData = {
        firstName: randomFirstName,
        lastName: randomLastName,
        dateOfBirth: randomDateOfBirth,
        country: 'CZ',
        houseNumber: buildingNumber,
        street: streetName,
        city: city,
        state: state,
        postalCode: postalCode,
        phone: phone,
        emailAddress: emailAddress,
        password: password,
    };

    // Go to registration Page.
    await authPage.registrationButton.click();

    await test.step('Fill Customer Details', async () => {
        await authPage.customerDetails(autoUser);
    });

    await test.step('Fill Customer Address Details', async () => {
        await authPage.customerAddressDetails(autoUser);
    });

    await test.step('Fill Customer Contact Details', async () => {
        await authPage.customerContactsDetails(autoUser);
    });

    await test.step('Fill password', async () => {
        await authPage.password.fill(autoUser.password);
    });

    await test.step('Finish Registration, by tap Register button', async () => {
        await authPage.registerButton.click();
        await expect(page).toHaveURL('auth/login');
    });

});

test('Manual Login', async ({ page }): Promise <void> => {
    await test.step('Manual Login', async () : Promise <void> => {
        await loginPage.manualLogin(manualTestUser.emailAddress, manualTestUser.password, loginPage.buttonLogin);
        await expect(page).toHaveURL('account');
    });
});
