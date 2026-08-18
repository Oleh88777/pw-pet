import { APIRequestContext, APIResponse } from "@playwright/test";
import { UserData } from "../ts-types/types";

export class ApiAuth {
    readonly request: APIRequestContext;
    readonly baseUrl: string = "https://api.practicesoftwaretesting.com";

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async manualRegister(userData: UserData): Promise<APIResponse> {
        return await this.request.post(`${this.baseUrl}/users/register`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            },
            data: {
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.emailAddress,
                password: userData.password,
                dob: userData.dateOfBirth,
                phone: userData.phone,
                address: {
                    street: userData.street,
                    house_number: userData.houseNumber,
                    city: userData.city,
                    state: userData.state,
                    country: userData.country,
                    postal_code: userData.postalCode,
                },
            },
        });
    }


}
