"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OperationApi_1 = require("./OperationApi/OperationApi");
const Config_1 = require("./models/Config");
const PayoutApi_1 = require("./PayoutApi/PayoutApi");
const TransferApi_1 = require("./TransferApi/TransferApi");
const PayinApi_1 = require("./PayinApi/PayinApi");
const PaymentAccountApi_1 = require("./PaymentAccountApi/PaymentAccountApi");
const AccountHolderApi_1 = require("./AccountHolderApi/AccountHolderApi");
const CommonApi_1 = require("./CommonApi/CommonApi");
const SelfcareApi_1 = require("./SelfcareApi/SelfcareApi");
const MandateApi_1 = require("./MandateApi/MandateApi");
const PaymentMethodApi_1 = require("./PaymentMethodApi/PaymentMethodApi");
/**
 * @example
 * ````typescript
 * import { CAPSPaymentAPI } from 'caps-payment'
 *
 * const capsPaymentApi = new CAPSPaymentAPI('myTokenUser', 'myTokenPassword', 'https://myTokenAuthUrl', 'https://theCAPSPaymentURL', 2000, false);
 *
 * // for serverless functions you can pass a stored authToken
 * capsPaymentApi.commonApi().getAuthToken().then((authToken) => {
 *
 * const operationApi = capsPaymentApi.operationApi()
 * const payoutApi = capsPaymentApi.payoutApi()
 * const transferApi = capsPaymentApi.transferApi()
 * const payinApi = capsPaymentApi.payinApi()
 * const paymentAccountApi = capsPaymentApi.paymentAccountApi()
 * const accountHolderApi = capsPaymentApi.accountHolderApi()
 * const commonApi = capsPaymentApi.commonApi()
 * ````
 */
class CAPSPaymentAPI {
    config;
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     * @param debug boolean - Enable debug mode. Default is `false`.
     */
    constructor(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout = 0, debug = false) {
        this.config = new Config_1.default(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout, debug);
    }
    operationApi() {
        return new OperationApi_1.default(this.config);
    }
    payoutApi() {
        return new PayoutApi_1.default(this.config);
    }
    transferApi() {
        return new TransferApi_1.default(this.config);
    }
    payinApi() {
        return new PayinApi_1.default(this.config);
    }
    paymentMethod() {
        return new PaymentMethodApi_1.default(this.config);
    }
    paymentAccountApi() {
        return new PaymentAccountApi_1.default(this.config);
    }
    accountHolderApi() {
        return new AccountHolderApi_1.default(this.config);
    }
    selfcareApi() {
        return new SelfcareApi_1.default(this.config);
    }
    mandateApi() {
        return new MandateApi_1.default(this.config);
    }
    commonApi() {
        return new CommonApi_1.default(this.config);
    }
}
exports.default = CAPSPaymentAPI;
