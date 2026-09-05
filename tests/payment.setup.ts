import { test as setup, expect } from '@playwright/test';
import { writeFile } from 'fs/promises';
import { createAutoCzUser } from '../test-data/testUser';
import { LoginPage } from '../pages/auth/login';
import { ApiAuth } from '../api-clas/auth/authApi';

const paymentAuth = 'playwright/.checkout.user.json';
const userBillingData = 'playwright/.checkout.user.data.json';

setup('authenticate checkout', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const apiAuth = new ApiAuth(request);

    const autoUser = createAutoCzUser();

    const apiRegisterAutoUser = await apiAuth.manualRegister(autoUser);
    const apiStatus = apiRegisterAutoUser.status();
    expect([201, 409]).toContain(apiStatus);

    await page.goto('/auth/login');

    await loginPage.manualLogin(autoUser.emailAddress, autoUser.password, loginPage.buttonLogin);
    await expect(page).toHaveURL(/\/account/);

    await page.context().storageState({ path: paymentAuth });
    await writeFile(userBillingData, JSON.stringify(autoUser, null, 2));
});
