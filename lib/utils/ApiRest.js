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
            data: this.encodeValue(payload !== null && payload !== void 0 ? payload : {}),
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
        ApiRest.authToken.accessToken = token === null || token === void 0 ? void 0 : token.accessToken;
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
            this.log("Token is invalid or expired, authenticating...");
            return this.authenticate()
                .then(function () {
                if (ApiRest.authToken.isInvalidOrExpired) {
                    _this.log("Token is still invalid or expired after authentication");
                    throw new ApiRestError("Authentication error", "Looks like the authentication succeeded but the token is still invalid or expired");
                }
                return _this.sendAuthenticatedRequest(payload, isBase64);
            });
        }
        payload.headers = this.buildHeaders();
        if (isBase64) {
            payload.headers["Content-Transfer-Encoding"] = "base64";
        }
        this.log("Sending POST request to " + payload.url + " with payload:");
        this.log(payload);
        return axios_1.default.request(payload)
            .then(function (response) {
            var _a, _b, _c;
            if (response.status === 401) {
                _this.log("401: Token is invalid, authenticating...");
                return _this.sendAuthenticatedRequest(payload);
            }
            else if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.resultCode) && ((_b = response.data) === null || _b === void 0 ? void 0 : _b.resultCode) !== "0") {
                _this.log("API returned error: " + response.data.resultCodeMessage);
                throw new ApiRestError(response.data.resultCode, (_c = response.data.resultCodeMessage) !== null && _c !== void 0 ? _c : "No resultCodeMessage");
            }
            return response.data;
        })
            .catch(function (error) {
            var _a, _b;
            _this.log("Request failed:");
            _this.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            if (error instanceof ApiRestError) {
                throw error;
            }
            else if (((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status) === 400) {
                throw new ApiRestError(error.response.data.resultCode.toString(), error.response.data.resultCodeMessage);
            }
            throw new ApiRestError(error.response.status.toString(), error.response.statusText);
        });
    };
    /**
     * Authenticate the user and update the token in the config
     */
    ApiRest.prototype.authenticate = function () {
        var _this = this;
        this.log("Authenticating user, POST to " + this.config.tokenUrl);
        return axios_1.default.request({
            method: "POST",
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
                expires_in: new Date(Date.now() + data.expires_in * 1000),
                token_type: data.token_type,
                scope: data.scope
            };
            ApiRest.authToken.accessToken = tokenInfo.access_token;
            ApiRest.authToken.tokenId = tokenInfo.id_token;
            ApiRest.authToken.tokenExpiry = tokenInfo.expires_in.getTime();
            ApiRest.authToken.tokenMethod = "POST";
            _this.log("Authentication succeeded, token expires at " + tokenInfo.expires_in);
            _this.log(tokenInfo);
            return tokenInfo;
        })
            .catch(function (error) {
            var _a, _b, _c, _d, _e;
            _this.log("Authentication failed: " + ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
            throw new ApiRestError((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data.resultCode.toString()) !== null && _c !== void 0 ? _c : "Unknown error authentication", (_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data.resultCodeMessage) !== null && _e !== void 0 ? _e : "No resultCodeMessage");
        });
    };
    ApiRest.prototype.buildHeaders = function () {
        return {
            "Authorization": "".concat(ApiRest.authToken.tokenType, " ").concat(ApiRest.authToken.accessToken),
            "id_token": ApiRest.authToken.tokenId
        };
    };
    ApiRest.prototype.encodeValue = function (value) {
        var _this = this;
        if (value === undefined || value === null) {
            return undefined;
        }
        if (value.encode) {
            return value.encode();
        }
        else if (Array.isArray(value)) {
            return value.reduce(function (acc, item) {
                var result = _this.encodeValue(item);
                if (result !== undefined) {
                    acc.push(result);
                }
                return acc;
            }, []);
        }
        else if (typeof value === "object") {
            return Object.keys(value).reduce(function (acc, key) {
                var result = _this.encodeValue(value[key]);
                if (result !== undefined) {
                    acc[key] = result;
                }
                return acc;
            }, {});
        }
        return value;
    };
    ApiRest.prototype.log = function (message) {
        if (this.config.debug) {
            console.dir(message, { depth: null, colors: true });
        }
    };
    /**
     * The authentication token shared between APIRest instances
     */
    ApiRest.authToken = new AuthToken_1.default({});
    return ApiRest;
}());
exports.default = ApiRest;
