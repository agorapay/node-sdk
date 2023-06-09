"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRest_1 = require("../../utils/ApiRest");
class CommonApi extends ApiRest_1.default {
    /**
     * Authenticate the current config. Will update all API tokens.
     * @description You should use this method to authenticate in a serverless environment.
     * @returns {{ id_token: string, access_token: string, expires_in: Date }} The token infos
     * @example
     * ````javascript
     commonApi.authenticate().then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
     * ````
     */
    authenticate() {
        return super.authenticate();
    }
    /**
     * Set a default authentication token to use. Will update all API tokens but will not authenticate or refresh it if it is expired.
     * @description You can use this method to re-use an authentication token in a serverless environment which is stored in a database.
     * @param {AuthToken} authToken The authentication token to use
     * @example
     * ````javascript
     commonApi.setAuthToken({tokenValue?: string, tokenExpiry?: number, tokenId?: string, tokenMethod?: "POST"})});
     * ````
     */
    setAuthToken(authToken) {
        this.setAuthTokenValue(authToken);
    }
    /**
     * Get the current auth token used by the SDK
     * @description You can use this method to get the token to store it in a database in a serverless environment.
     * @returns {AuthToken} The authentication token used by the SDK
     * @example
     * ````javascript
     const token = commonApi.getAuthToken();
     const hasChanged = token.compare(previousToken);
     * ````
     */
    getAuthToken() {
        return this.getCopiedAuthToken();
    }
}
exports.default = CommonApi;
