"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../../utils/Utils");
/**
 * Class representing a config.
 */
class Config {
    /** Token authentication username. */
    tokenUser;
    /** Token authentication password. */
    tokenPassword;
    /** Token authentication URL. */
    tokenUrl;
    /** CAPS Payment URL */
    baseUrl;
    /** HTTP requests timeout. Default is `0` (no timeout). */
    timeout;
    /** Enable debug mode. Default is `false`. */
    debug = false;
    /** Enable debug mode for logging responses. Default is `false`. */
    logResponse = false;
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     * @param debug Enable debug mode. Default is `false`.
     * @param logResponse Enable debug mode for logging responses. Default is `false`.
     */
    constructor(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout = 0, debug = false, logResponse = false) {
        this.tokenUser = tokenUser;
        this.tokenPassword = tokenPassword;
        this.tokenUrl = tokenUrl;
        this.baseUrl = baseUrl;
        this.timeout = Utils_1.default.hasIntegerOrDefault(timeout, 0);
        this.debug = debug ?? false;
        this.logResponse = logResponse ?? false;
    }
}
exports.default = Config;
