"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
/**
 * WebHook Utils
 */
var WebHookUtils = /** @class */ (function () {
    function WebHookUtils() {
    }
    /**
     * Verify HMAC signature and return true if valid
     * @param config This configuration is static and should be provided by AgoraPay
     * @param payload This payload is dynamic and should be provided when the request is made
     * @param payload.authorization The authorization header sent by AgoraPay server
     * @param payload.body The request body sent by AgoraPay server
     * @param payload.method The method (post/get) used by AgoraPay server, usually POST.
     * @param verbose If true, will log errors to the console. Defaults to false.
     *
     * @returns {boolean} True if the HMAC signature is valid, false otherwise.
     *
     * @remarks This method do not throw any exception.
     */
    WebHookUtils.verifyHmac = function (config, payload, verbose) {
        if (verbose === void 0) { verbose = false; }
        var authorization = payload.authorization, body = payload.body, method = payload.method;
        var auth = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ");
        if (!auth || auth[0] !== "hmac" || auth.length < 2) {
            return false;
        }
        var hmacParts = auth[1].split("/");
        if (hmacParts.length !== 5) {
            return false;
        }
        var headerAuthVersion = config.headerAuthVersion, serverHookUrl = config.serverHookUrl, keyId = config.keyId, hmacKey = config.hmacKey;
        var authVersionField = hmacParts[0], nonceField = hmacParts[1], timestampField = hmacParts[2], keyIdField = hmacParts[3], hmacField = hmacParts[4];
        if (authVersionField !== headerAuthVersion || keyIdField !== keyId) {
            return false;
        }
        try {
            var sha256Value = crypto
                .createHash("sha256")
                .update(JSON.stringify(body))
                .digest("hex")
                .toUpperCase();
            var hmacData = "".concat(method, ";").concat(serverHookUrl, ";").concat(sha256Value, ";").concat(nonceField, ";").concat(timestampField);
            var hmac = crypto
                .createHmac("sha256", Buffer.from(hmacKey, "hex"))
                .update(hmacData)
                .digest("hex")
                .toUpperCase();
            var hmacBuffer = Buffer.from(hmac, "hex");
            var hmacFieldAsBuffer = Buffer.from(hmacField, "hex");
            return crypto.timingSafeEqual(hmacBuffer, hmacFieldAsBuffer);
        }
        catch (e) {
            if (verbose) {
                console.error(e);
            }
            return false;
        }
    };
    return WebHookUtils;
}());
exports.default = WebHookUtils;
