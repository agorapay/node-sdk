"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing a config. */
var Config = /** @class */ (function () {
    /**
     *
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    function Config(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout) {
        if (timeout === void 0) { timeout = 0; }
        this.tokenExpiry = 0;
        this.tokenMethod = 'POST';
        this.tokenUser = tokenUser;
        this.tokenPassword = tokenPassword;
        this.tokenUrl = tokenUrl;
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }
    return Config;
}());
exports.default = Config;
