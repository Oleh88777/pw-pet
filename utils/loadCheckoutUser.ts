import { readFile } from 'fs/promises';
import { UserData } from '../ts-types/types';

const CHECKOUT_USER_DATA_PATH = 'playwright/.checkout.user.data.json';

export async function loadCheckoutUser(): Promise<UserData> {
    try {
        const rawUserData = await readFile(CHECKOUT_USER_DATA_PATH, 'utf-8');
        return JSON.parse(rawUserData) as UserData;
    } catch (err) {
        const message: string = err instanceof Error ? err.message : String(err);
        throw new Error(
            `Failed to load checkout user data from ${CHECKOUT_USER_DATA_PATH}: ${message}`
        );
    }
}
