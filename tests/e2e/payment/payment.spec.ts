import { expect, test } from '@playwright/test';
import { LoginPage } from "../../../pages/login";
import { createAutoCzUser } from "../../../test-data/testUser";
import {UserData} from "../../../ts-types/types";
import {ApiAuth} from "../../../api-clas/authApi";


let loginPage: LoginPage;

test.describe('Payment Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
        loginPage = new LoginPage(page);
    });

    test('Create User for Payment flow and Log In', async ({ request, page }) => {
        const authAPI = new ApiAuth(request);
        const paymentUser: UserData = createAutoCzUser();

        await test.step('Register new user via API', async () => {
            const createPaymentUser = await authAPI.manualRegister(paymentUser);
            expect(createPaymentUser.status()).toBe(201);
        });

        await test.step('Login with dynamically created user', async () => {
            await loginPage.manualLogin(paymentUser.emailAddress, paymentUser.password, loginPage.buttonLogin);
            await expect(page).toHaveURL('account');
        });
    });
});