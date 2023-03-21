/**
 * WebHook Utils
 */
export default abstract class WebHookUtils {
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
    static verifyHmac(config: {
        headerAuthVersion: string;
        serverHookUrl: string;
        keyId: string;
        hmacKey: string;
    }, payload: {
        authorization: string;
        body: any;
        method: string;
    }, verbose?: boolean): boolean;
}
