import { APIRequestContext, APIResponse } from "@playwright/test";

export class CardApi  {
    readonly request: APIRequestContext;
    readonly baseUrl: string = "https://api.practicesoftwaretesting.com";

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createNewCard (): Promise<APIResponse> {
        return await this.request.post(`${this.baseUrl}/carts/`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            },
        })

    }}
