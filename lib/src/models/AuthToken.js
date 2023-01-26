"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AuthToken model to store token infos
 */
var AuthToken = /** @class */ (function () {
    function AuthToken(data) {
        var _a, _b, _c, _d;
        this.tokenExpiry = 0;
        this.tokenMethod = "POST";
        this.tokenType = "Bearer";
        this.accessToken = data.accessToken;
        this.tokenExpiry = (_a = data.tokenExpiry) !== null && _a !== void 0 ? _a : 0;
        this.tokenId = (_b = data.tokenId) !== null && _b !== void 0 ? _b : "";
        this.tokenMethod = (_c = data.tokenMethod) !== null && _c !== void 0 ? _c : "POST";
        this.tokenType = (_d = data.tokenType) !== null && _d !== void 0 ? _d : "Bearer";
    }
    Object.defineProperty(AuthToken.prototype, "isInvalidOrExpired", {
        get: function () {
            return !this.accessToken || !this.tokenExpiry || this.tokenExpiry < Date.now();
        },
        enumerable: false,
        configurable: true
    });
    AuthToken.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return this.accessToken === other.accessToken
            && this.tokenExpiry === other.tokenExpiry
            && this.tokenId === other.tokenId
            && this.tokenMethod === other.tokenMethod
            && this.tokenType === other.tokenType;
    };
    return AuthToken;
}());
exports.default = AuthToken;
