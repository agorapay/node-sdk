"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRestError = void 0;
var axios_1 = require("axios");
var AuthToken_1 = require("../src/models/AuthToken");
var ApiRestError = /** @class */ (function () {
    function ApiRestError(resultCode, resultCodeMessage) {
        this.resultCode = resultCode;
        this.resultCodeMessage = resultCodeMessage;
    }
    return ApiRestError;
}());
exports.ApiRestError = ApiRestError;
/**
 * ApiRest helper class to make requests to the AgoraPay API
 */
var ApiRest = /** @class */ (function () {
    function ApiRest(config) {
        this.config = config;
    }
    ApiRest.prototype.sendToApiPost = function (endPoint, payload, base64) {
        if (base64 === void 0) { base64 = false; }
        return this.sendAuthenticatedRequest({
            method: "POST",
            url: this.config.baseUrl + endPoint,
            data: this.jsonFieldsToString(payload),
            timeout: this.config.timeout,
            validateStatus: function (status) { return status == 200 || status == 401; }
        }, base64);
    };
    ApiRest.prototype.sendToApiGet = function (endPoint, payload) {
        return this.sendAuthenticatedRequest({
            method: "GET",
            url: this.config.baseUrl + endPoint,
            params: payload,
            timeout: this.config.timeout,
            validateStatus: function (status) { return status == 200 || status == 401; }
        });
    };
    /**
     * Set the authentication token to use
     * @remarks May be used in a serverless environment where the token is stored in a database.
     */
    ApiRest.prototype.setAuthTokenValue = function (token) {
        ApiRest.authToken.tokenValue = token === null || token === void 0 ? void 0 : token.tokenValue;
        ApiRest.authToken.tokenId = token === null || token === void 0 ? void 0 : token.tokenId;
        ApiRest.authToken.tokenExpiry = token === null || token === void 0 ? void 0 : token.tokenExpiry;
        ApiRest.authToken.tokenMethod = token === null || token === void 0 ? void 0 : token.tokenMethod;
    };
    /**
     * Get the authentication token as a copy
     */
    ApiRest.prototype.getCopiedAuthToken = function () {
        return new AuthToken_1.default(ApiRest.authToken);
    };
    /**
     * Send an authenticated request to the API and refresh the token if needed
     */
    ApiRest.prototype.sendAuthenticatedRequest = function (payload, isBase64) {
        var _this = this;
        if (isBase64 === void 0) { isBase64 = false; }
        if (ApiRest.authToken.isInvalidOrExpired) {
            return this.authenticate()
                .then(function () {
                if (ApiRest.authToken.isInvalidOrExpired) {
                    throw new ApiRestError("Authentication error", "Looks like the authentication succeeded but the token is still invalid or expired");
                }
                return _this.sendAuthenticatedRequest(payload);
            });
        }
        payload.headers = this.buildHeaders();
        if (isBase64) {
            payload.headers["Content-Transfer-Encoding"] = "base64";
        }
        return axios_1.default.request(payload)
            .then(function (response) {
            var _a, _b, _c;
            if (response.status === 401) {
                return _this.sendAuthenticatedRequest(payload);
            }
            else if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.resultCode) && ((_b = response.data) === null || _b === void 0 ? void 0 : _b.resultCode) !== "0") {
                throw new ApiRestError(response.data.resultCode, (_c = response.data.resultCodeMessage) !== null && _c !== void 0 ? _c : "No resultCodeMessage");
            }
            return response.data;
        })
            .catch(function (error) {
            var _a;
            if (error instanceof ApiRestError) {
                throw error;
            }
            else if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                throw new ApiRestError(error.response.data.resultCode.toString(), error.response.data.resultCodeMessage);
            }
            throw new ApiRestError(error.response.status.toString(), error.response.statusText);
        });
    };
    /**
     * Authenticate the user and update the token in the config
     */
    ApiRest.prototype.authenticate = function () {
        return axios_1.default.request({
            method: ApiRest.authToken.tokenMethod,
            url: this.config.tokenUrl,
            timeout: this.config.timeout,
            headers: {
                "Authorization": "Basic " + Buffer.from(this.config.tokenUser + ":" + this.config.tokenPassword).toString("base64")
            }
        })
            .then(function (response) {
            var data = response.data;
            var tokenInfo = {
                id_token: data.id_token,
                access_token: data.access_token,
                expires_in: new Date(Date.now() + data.expires_in * 1000)
            };
            ApiRest.authToken.tokenValue = tokenInfo.access_token;
            ApiRest.authToken.tokenId = tokenInfo.id_token;
            ApiRest.authToken.tokenExpiry = tokenInfo.expires_in.getTime();
            return tokenInfo;
        })
            .catch(function (error) {
            throw new ApiRestError(error.response.data.resultCode.toString(), error.response.data.resultCodeMessage);
        });
    };
    ApiRest.prototype.buildHeaders = function () {
        return {
            "Authorization": "Bearer ".concat(ApiRest.authToken.tokenValue),
            "id_token": "".concat(ApiRest.authToken.tokenId)
        };
    };
    ApiRest.prototype.jsonFieldsToString = function (payload) {
        var _this = this;
        return Object.keys(payload).reduce(function (acc, key) {
            if (payload[key] === undefined || payload[key] === null) {
                return acc;
            }
            if (payload[key].encode) {
                acc[key] = payload[key].encode();
            }
            else if (typeof payload[key] === "object") {
                acc[key] = _this.jsonFieldsToString(payload[key]);
            }
            else {
                acc[key] = payload[key].toString();
            }
            return acc;
        }, {});
    };
    return ApiRest;
}());
exports.default = ApiRest;
