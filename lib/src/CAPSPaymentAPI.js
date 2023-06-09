"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationApi_1 = require("./OperationApi/OperationApi");
var Config_1 = require("./models/Config");
var PayoutApi_1 = require("./PayoutApi/PayoutApi");
var TransferApi_1 = require("./TransferApi/TransferApi");
var PayinApi_1 = require("./PayinApi/PayinApi");
var PaymentAccountApi_1 = require("./PaymentAccountApi/PaymentAccountApi");
var AccountHolderApi_1 = require("./AccountHolderApi/AccountHolderApi");
var SelfcareApi_1 = require("./SelfcareApi/SelfcareApi");
var MandateApi_1 = require("./MandateApi/MandateApi");
/**
 * @example
 * ````typescript
 * import { CAPSPaymentAPI } from 'caps-payment'
 *
 * const capsPaymentApi = new CAPSPaymentAPI('myTokenUser', 'myTokenPassword', 'https://myTokenAuthUrl', 'https://theCAPSPaymentURL', 2000)
 *
 * const operationApi = capsPaymentApi.operationApi()
 * const payoutApi = capsPaymentApi.payoutApi()
 * const transferApi = capsPaymentApi.transferApi()
 * const payinApi = capsPaymentApi.payinApi()
 * const paymentAccountApi = capsPaymentApi.paymentAccountApi()
 * const accountHolderApi = capsPaymentApi.accountHolderApi()
 * const selfcareApi = capsPaymentApi.selfcareApi()
 * const mandateApi = capsPaymentApi.mandateApi()
 *  ````
 */
var CAPSPaymentAPI = /** @class */ (function () {
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    function CAPSPaymentAPI(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout) {
        if (timeout === void 0) { timeout = 0; }
        this.config = new Config_1.default(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout);
    }
    CAPSPaymentAPI.prototype.operationApi = function () {
        return new OperationApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.payoutApi = function () {
        return new PayoutApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.transferApi = function () {
        return new TransferApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.payinApi = function () {
        return new PayinApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.paymentAccountApi = function () {
        return new PaymentAccountApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.accountHolderApi = function () {
        return new AccountHolderApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.selfcareApi = function () {
        return new SelfcareApi_1.default(this.config);
    };
    CAPSPaymentAPI.prototype.mandateApi = function () {
        return new MandateApi_1.default(this.config);
    };
    return CAPSPaymentAPI;
}());
exports.default = CAPSPaymentAPI;
