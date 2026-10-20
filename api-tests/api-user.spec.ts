import { test, expect } from '@playwright/test';
import { ApiAuth } from '../api-pages/auth/authApi';
import { createAutoCzUser, manualTestUser } from '../test-data/testUser';

test.describe('POST /users/register', () => {
    test('creates a new user', async ({ request }) => {
        const api = new ApiAuth(request);
        const user = createAutoCzUser();

        const res = await api.registerUser(user);

        expect(res.status()).toBe(201);
        expect(res.headers()['content-type']).toContain('application/json');
        const body = await res.json();
        expect(body.email).toBe(user.emailAddress);
        expect(body).toHaveProperty('id');
        expect(body).not.toHaveProperty('password');
    });

    test('rejects duplicate email', async ({ request }) => {
        const api = new ApiAuth(request);
        const user = createAutoCzUser();
    
        // Arrange: перша реєстрація має пройти
        const first = await api.registerUser(user);
        expect(first.status()).toBe(201);
    
        // Act: друга реєстрація з тим самим email
        const duplicate = await api.registerUser(user);
    
        
        expect(duplicate.status()).toBe(422);
        // const body = await duplicate.json();
        // expect(body).toHaveProperty('errors');
    });
});
