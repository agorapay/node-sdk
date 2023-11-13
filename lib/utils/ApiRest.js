"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRestError = void 0;
const axios_1 = require("axios");
const AuthToken_1 = require("../src/models/AuthToken");
const FormData = require("form-data");
class ApiRestError {
    resultCode;
    resultCodeMessage;
    constructor(resultCode, resultCodeMessage) {
        this.resultCode = resultCode;
        this.resultCodeMessage = resultCodeMessage;
    }
}
exports.ApiRestError = ApiRestError;
/**
 * ApiRest helper class to make requests to the AgoraPay API
 */
class ApiRest {
    config;
    /**
     * The authentication token shared between APIRest instances
     */
    static authToken = new AuthToken_1.default({});
    constructor(config) {
        this.config = config;
    }
    sendToApiPost(endPoint, payload, isMultiPart = false) {
        return this.sendAuthenticatedRequest({
            method: "POST",
            url: this.config.baseUrl + endPoint,
            data: payload ?? {},
            timeout: this.config.timeout,
            validateStatus: (status) => status == 200 || status == 401
        }, isMultiPart);
    }
    sendToApiGet(endPoint, payload) {
        return this.sendAuthenticatedRequest({
            method: "GET",
            url: this.config.baseUrl + endPoint,
            params: payload,
            timeout: this.config.timeout,
            validateStatus: (status) => status == 200 || status == 401
        });
    }
    /**
     * Set the authentication token to use
     * @remarks May be used in a serverless environment where the token is stored in a database.
     */
    setAuthTokenValue(token) {
        ApiRest.authToken.accessToken = token?.accessToken;
        ApiRest.authToken.tokenId = token?.tokenId;
        ApiRest.authToken.tokenExpiry = token?.tokenExpiry;
        ApiRest.authToken.tokenMethod = token?.tokenMethod;
    }
    /**
     * Get the authentication token as a copy
     */
    getCopiedAuthToken() {
        return new AuthToken_1.default(ApiRest.authToken);
    }
    /**
     * Send an authenticated request to the API and refresh the token if needed
     */
    sendAuthenticatedRequest(payload, isMultiPart = false) {
        if (ApiRest.authToken.isInvalidOrExpired) {
            this.log("Token is invalid or expired, authenticating...");
            return this.authenticate()
                .then(() => {
                if (ApiRest.authToken.isInvalidOrExpired) {
                    this.log("Token is still invalid or expired after authentication");
                    throw new ApiRestError("Authentication error", "Looks like the authentication succeeded but the token is still invalid or expired");
                }
                return this.sendAuthenticatedRequest(payload, isMultiPart);
            });
        }
        payload.headers = this.buildHeaders();
        let encodedData;
        if (isMultiPart) {
            const initialData = payload.data ?? {};
            const formData = new FormData();
            const boundary = formData.getBoundary();
            formData.append("json", JSON.stringify(initialData.json ?? {}), { contentType: "application/json; charset=UTF-8" });
            if (initialData.files) {
                initialData.files.forEach((file) => formData.append(file.name, Buffer.from(file.data).toString("base64"), {
                    header: { "Content-Transfer-Encoding": "base64" },
                    filename: file.fileName
                }));
            }
            encodedData = formData.getBuffer();
            payload.headers["Content-Type"] = `multipart/form-data; boundary=${boundary}`;
            payload.headers["Content-Length"] = formData.getLengthSync();
        }
        else {
            encodedData = this.encodeValue(payload.data ?? {});
            payload.headers["Content-Type"] = "application/json; charset=UTF-8";
        }
        this.log("Sending POST request to " + payload.url + " with payload:");
        this.log(payload);
        return axios_1.default.request({ ...payload, data: encodedData })
            .then(response => {
            if (response.status === 401) {
                this.log("401: Token is invalid, authenticating...");
                return this.sendAuthenticatedRequest(payload);
            }
            else if (response.data?.resultCode && response.data?.resultCode !== "0") {
                this.log("API returned error: " + response.data.resultCodeMessage);
                throw new ApiRestError(response.data.resultCode, response.data.resultCodeMessage ?? "No resultCodeMessage");
            }
            return response.data;
        })
            .catch((error) => {
            this.log("Request failed:");
            this.log(error.response?.data);
            this.log(error.response?.status);
            this.log(error.response?.statusText);
            if (error instanceof ApiRestError) {
                throw error;
            }
            else if (error?.response?.status === 400) {
                throw new ApiRestError(error.response?.data.resultCode.toString(), error.response.data.resultCodeMessage);
            }
            throw new ApiRestError(error.response?.status?.toString(), error.response?.statusText ?? "Unknwon error");
        });
    }
    /**
     * Authenticate the user and update the token in the config
     */
    authenticate() {
        this.log("Authenticating user, POST to " + this.config.tokenUrl);
        return axios_1.default.request({
            method: "POST",
            url: this.config.tokenUrl,
            timeout: this.config.timeout,
            headers: {
                "Authorization": "Basic " + Buffer.from(this.config.tokenUser + ":" + this.config.tokenPassword).toString("base64")
            }
        })
            .then(response => {
            const data = response.data;
            const tokenInfo = {
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
            this.log("Authentication succeeded, token expires at " + tokenInfo.expires_in);
            this.log(tokenInfo);
            return tokenInfo;
        })
            .catch((error) => {
            this.log("Authentication failed: " + error.response?.data);
            throw new ApiRestError(error.response?.data.resultCode.toString() ?? "Unknown error authentication", error.response?.data.resultCodeMessage ?? "No resultCodeMessage");
        });
    }
    buildHeaders() {
        return {
            "Authorization": `${ApiRest.authToken.tokenType} ${ApiRest.authToken.accessToken}`,
            "id_token": ApiRest.authToken.tokenId
        };
    }
    encodeValue(value) {
        if (value === undefined || value === null) {
            return undefined;
        }
        if (value.encode) {
            return value.encode();
        }
        else if (Array.isArray(value)) {
            return value.reduce((acc, item) => {
                const result = this.encodeValue(item);
                if (result !== undefined) {
                    acc.push(result);
                }
                return acc;
            }, []);
        }
        else if (typeof value === "object") {
            return Object.keys(value).reduce((acc, key) => {
                const result = this.encodeValue(value[key]);
                if (result !== undefined) {
                    acc[key] = result;
                }
                return acc;
            }, {});
        }
        return value;
    }
    log(message) {
        if (this.config.debug) {
            console.dir(message, { depth: null, colors: true });
        }
    }
}
exports.default = ApiRest;
