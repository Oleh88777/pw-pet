import {expect, test} from '@playwright/test';
import {AuthRegister} from "../pages/authRegister";
import {faker} from "@faker-js/faker";

let authPage: AuthRegister;
const randomFirstName = faker.person.firstName('male');
const randomLastName = faker.person.lastName('male');
const randomDateOfBirth = faker.date.birthdate({ mode: 'age', min: 21, max: 55 }).toISOString().split('T')[0];


test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    await page.goto('/auth/login');
    authPage = new AuthRegister(page);
});


test('Full Registration', async ({ page }): Promise <void> => {
  await authPage.registrationButton.click();
  await expect(page).toHaveURL('/auth/register');
  await authPage.firstName.fill(randomFirstName);
  await authPage.lastName.fill(randomLastName);
  await authPage.DateOfBirth.fill(String(randomDateOfBirth));
});
