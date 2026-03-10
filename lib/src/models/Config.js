"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing a config. */
class Config {
    /**
     *
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    constructor(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout = 0) {
        this.tokenExpiry = 0;
        this.tokenMethod = 'POST';
        this.tokenUser = tokenUser;
        this.tokenPassword = tokenPassword;
        this.tokenUrl = tokenUrl;
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }
}
exports.default = Config;
