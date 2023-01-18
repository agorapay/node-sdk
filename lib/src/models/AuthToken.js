"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AuthToken model to store token infos
 */
var AuthToken = /** @class */ (function () {
    function AuthToken(data) {
        var _a, _b;
        this.tokenExpiry = 0;
        this.tokenMethod = "POST";
        this.tokenValue = data.tokenValue;
        this.tokenExpiry = (_a = data.tokenExpiry) !== null && _a !== void 0 ? _a : 0;
        this.tokenId = data.tokenId;
        this.tokenMethod = (_b = data.tokenMethod) !== null && _b !== void 0 ? _b : "POST";
    }
    Object.defineProperty(AuthToken.prototype, "isInvalidOrExpired", {
        get: function () {
            return !this.tokenValue || this.tokenExpiry < Date.now();
        },
        enumerable: false,
        configurable: true
    });
    AuthToken.prototype.equals = function (other) {
        return this.tokenValue === other.tokenValue
            && this.tokenExpiry === other.tokenExpiry
            && this.tokenId === other.tokenId
            && this.tokenMethod === other.tokenMethod;
    };
    return AuthToken;
}());
exports.default = AuthToken;
