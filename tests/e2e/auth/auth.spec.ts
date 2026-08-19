import { expect, test } from '@playwright/test';
import { AuthRegister } from "../../../pages/authRegister";
import { LoginPage } from "../../../pages/login";
import { createAutoCzUser, manualTestUser } from "../../../test-data/testUser";
import {UserData} from "../../../ts-types/types";


let authPage: AuthRegister;
let loginPage: LoginPage;

test.describe('Auth/Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
        authPage = new AuthRegister(page);
        loginPage = new LoginPage(page);
    });

    /*
    Full registration validate UI path
    User has generated dynamically via Faker library
     */
    test('Full Auto Registration', async ({ page }): Promise<void> => {
        const autoUser : UserData = createAutoCzUser();

        await test.step('Register new user via UI', async () => {
            await authPage.fullRegistration(autoUser);
            await expect(page).toHaveURL('auth/login');
        });
    });

    /*
    Login UI Manual user generated via API in auth-setup file.
     */
    test('Manual Login', async ({ page }): Promise<void> => {
        await test.step('Manual Login', async (): Promise<void> => {
            await loginPage.manualLogin(manualTestUser.emailAddress, manualTestUser.password, loginPage.buttonLogin);
            await expect(page).toHaveURL('account');
        });
    });
});
