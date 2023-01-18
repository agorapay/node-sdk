/**
 * AuthToken model to store token infos
 */
export default class AuthToken {
    tokenValue?: string;
    tokenExpiry: number;
    tokenId?: string;
    tokenMethod: "GET" | "POST";
    constructor(data: Partial<AuthToken>);
    get isInvalidOrExpired(): boolean;
    equals(other: AuthToken): boolean;
}
