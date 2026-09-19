export function randomDigitsCardNumber(): string {
    return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
}

export function cardNumber(): string {
    return `${randomDigitsCardNumber()}-${randomDigitsCardNumber()}-${randomDigitsCardNumber()}-${randomDigitsCardNumber()}`;
}

export function randomCvv(): string {
    return String(Math.floor(Math.random() * 10000)).padStart(3, '0');
}

export function cvv(): string {
    return `${randomCvv()}`;
}


export function getExpirationDate (): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear() + 1;

    return `${month}/${year}`;
}
