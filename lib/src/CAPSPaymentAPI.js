"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationApi_1 = __importDefault(require("./OperationApi/OperationApi"));
const Config_1 = __importDefault(require("./models/Config"));
const PayoutApi_1 = __importDefault(require("./PayoutApi/PayoutApi"));
const TransferApi_1 = __importDefault(require("./TransferApi/TransferApi"));
const PayinApi_1 = __importDefault(require("./PayinApi/PayinApi"));
const PaymentAccountApi_1 = __importDefault(require("./PaymentAccountApi/PaymentAccountApi"));
const AccountHolderApi_1 = __importDefault(require("./AccountHolderApi/AccountHolderApi"));
const SelfcareApi_1 = __importDefault(require("./SelfcareApi/SelfcareApi"));
const MandateApi_1 = __importDefault(require("./MandateApi/MandateApi"));
const PaymentMethodApi_1 = __importDefault(require("./PaymentMethodApi/PaymentMethodApi"));
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
 * const paymentMethodApi = capsPaymentApi.paymentMethodApi()
 *  ````
 */
class CAPSPaymentAPI {
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    constructor(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout = 0) {
        this.config = new Config_1.default(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout);
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
    paymentMethodApi() {
        return new PaymentMethodApi_1.default(this.config);
    }
}
exports.default = CAPSPaymentAPI;
