"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
/**
 * WebHook Utils
 */
class WebHookUtils {
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
    static verifyHmac(config, payload, verbose = false) {
        const { authorization, body, method } = payload;
        const auth = authorization?.split(" ");
        if (!auth || auth[0] !== "hmac" || auth.length < 2) {
            return false;
        }
        const hmacParts = auth[1].split("/");
        if (hmacParts.length !== 5) {
            return false;
        }
        const { headerAuthVersion, serverHookUrl, keyId, hmacKey } = config;
        const [authVersionField, nonceField, timestampField, keyIdField, hmacField] = hmacParts;
        if (authVersionField !== headerAuthVersion || keyIdField !== keyId) {
            return false;
        }
        try {
            const sha256Value = crypto
                .createHash("sha256")
                .update(JSON.stringify(body))
                .digest("hex")
                .toUpperCase();
            const hmacData = `${method};${serverHookUrl};${sha256Value};${nonceField};${timestampField}`;
            const hmac = crypto
                .createHmac("sha256", Buffer.from(hmacKey, "hex"))
                .update(hmacData)
                .digest("hex")
                .toUpperCase();
            const hmacBuffer = Buffer.from(hmac, "hex");
            const hmacFieldAsBuffer = Buffer.from(hmacField, "hex");
            return crypto.timingSafeEqual(hmacBuffer, hmacFieldAsBuffer);
        }
        catch (e) {
            if (verbose) {
                console.error(e);
            }
            return false;
        }
    }
}
exports.default = WebHookUtils;
