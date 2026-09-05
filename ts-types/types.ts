/* Here is located data as user types
Userdata mostly user in the API requests related to the login, registration, billing details.
 */

export interface UserData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    phone: string;
    emailAddress: string;
    password: string;
}

/* Billing details */

export interface BillingAddress {
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
}