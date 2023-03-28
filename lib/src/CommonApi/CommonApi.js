"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiRest_1 = require("../../utils/ApiRest");
var CommonApi = /** @class */ (function (_super) {
    __extends(CommonApi, _super);
    function CommonApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    CommonApi.prototype.authenticate = function () {
        return _super.prototype.authenticate.call(this);
    };
    /**
     * Set a default authentication token to use. Will update all API tokens but will not authenticate or refresh it if it is expired.
     * @description You can use this method to re-use an authentication token in a serverless environment which is stored in a database.
     * @param {AuthToken} authToken The authentication token to use
     * @example
     * ````javascript
     commonApi.setAuthToken({tokenValue?: string, tokenExpiry?: number, tokenId?: string, tokenMethod?: "POST"})});
     * ````
     */
    CommonApi.prototype.setAuthToken = function (authToken) {
        this.setAuthTokenValue(authToken);
    };
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
    CommonApi.prototype.getAuthToken = function () {
        return this.getCopiedAuthToken();
    };
    return CommonApi;
}(ApiRest_1.default));
exports.default = CommonApi;
