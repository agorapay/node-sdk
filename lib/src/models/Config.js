"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../utils/Utils");
/**
 * Class representing a config.
 */
var Config = /** @class */ (function () {
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    function Config(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout, debug) {
        if (timeout === void 0) { timeout = 0; }
        if (debug === void 0) { debug = false; }
        /** Enable debug mode. Default is `false`. */
        this.debug = false;
        this.tokenUser = tokenUser;
        this.tokenPassword = tokenPassword;
        this.tokenUrl = tokenUrl;
        this.baseUrl = baseUrl;
        this.timeout = Utils_1.default.hasIntegerOrDefault(timeout, 0);
        this.debug = debug !== null && debug !== void 0 ? debug : false;
    }
    return Config;
}());
exports.default = Config;