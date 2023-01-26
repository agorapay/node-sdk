/**
 * AuthToken model to store token infos
 */
export default class AuthToken {
    accessToken?: string;
    tokenExpiry: number;
    tokenId: string;
    tokenMethod: "GET" | "POST";
    tokenType: "Bearer";
    constructor(data: Partial<AuthToken>);
    get isInvalidOrExpired(): boolean;
    equals(other?: AuthToken): boolean;
}
