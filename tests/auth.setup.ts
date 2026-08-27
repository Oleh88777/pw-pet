
import {test as setup, expect} from '@playwright/test';
import {manualTestUser} from "../test-data/testUser";
import {LoginPage} from "../pages/login";
import {ApiAuth} from "../api-clas/authApi";


const authFile = 'playwright/.auth/user.json';

setup('authenticate auth', async ({page, request}) => {

    const loginPage = new LoginPage(page);
    const apiAuth = new ApiAuth(request);

    const apiRegisterNewUser = await apiAuth.manualRegister(manualTestUser);

    const apiStatus = apiRegisterNewUser.status();
    expect([201, 409]).toContain(apiStatus);

    await page.goto('/auth/login');

    await loginPage.manualLogin(manualTestUser.emailAddress, manualTestUser.password, loginPage.buttonLogin);
    await expect(page).toHaveURL(/\/account/);

    await page.context().storageState({ path: authFile });
});
