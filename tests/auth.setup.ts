import {test as setup, expect} from '@playwright/test';
import {manualTestUser} from "../test-data/testUser";
import {LoginPage} from "../pages/login";


const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page, request}) => {

    const loginPage = new LoginPage(page);

    const apiRegisterNewUser = await request.post('https://api.practicesoftwaretesting.com/users/register', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
        },
        data: {
            first_name: manualTestUser.firstName,
            last_name: manualTestUser.lastName,
            email: manualTestUser.emailAddress,
            password: manualTestUser.password,
            dob: manualTestUser.dateOfBirth,
            phone: manualTestUser.phone,
            address: {
                street: manualTestUser.street,
                house_number: manualTestUser.houseNumber,
                city: manualTestUser.city,
                state: manualTestUser.state,
                country: manualTestUser.country,
                postal_code: manualTestUser.postalCode,
            },
        },
    })

    const apiStatus = apiRegisterNewUser.status();
    expect([201, 409]).toContain(apiStatus);

    await page.goto('/auth/login');

    await loginPage.manualLogin(manualTestUser.emailAddress, manualTestUser.password, loginPage.buttonLogin);
    await expect(page).toHaveURL(/\/account/);

    await page.context().storageState({ path: authFile });
});
