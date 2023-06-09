"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AuthToken model to store token infos
 */
class AuthToken {
    accessToken;
    tokenExpiry = 0;
    tokenId;
    tokenMethod = "POST";
    tokenType = "Bearer";
    constructor(data) {
        this.accessToken = data.accessToken;
        this.tokenExpiry = data.tokenExpiry ?? 0;
        this.tokenId = data.tokenId ?? "";
        this.tokenMethod = data.tokenMethod ?? "POST";
        this.tokenType = data.tokenType ?? "Bearer";
    }
    get isInvalidOrExpired() {
        return !this.accessToken || !this.tokenExpiry || this.tokenExpiry < Date.now();
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.accessToken === other.accessToken
            && this.tokenExpiry === other.tokenExpiry
            && this.tokenId === other.tokenId
            && this.tokenMethod === other.tokenMethod
            && this.tokenType === other.tokenType;
    }
}
exports.default = AuthToken;
