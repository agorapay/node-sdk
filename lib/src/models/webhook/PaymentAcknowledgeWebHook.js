"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookIPNTransactionStatusCode = exports.WebHookIPNOperationType = void 0;
const Utils_1 = require("../../../utils/Utils");
const WebHook_1 = require("./WebHook");
var WebHookIPNOperationType;
(function (WebHookIPNOperationType) {
    /** capture with or without simultaneous authorisation */
    WebHookIPNOperationType["Purchase"] = "1";
    WebHookIPNOperationType["AuthorizationOnly"] = "7";
})(WebHookIPNOperationType = exports.WebHookIPNOperationType || (exports.WebHookIPNOperationType = {}));
var WebHookIPNTransactionStatusCode;
(function (WebHookIPNTransactionStatusCode) {
    WebHookIPNTransactionStatusCode["AuthorizationAndImmediateCaptureValidated"] = "10";
    WebHookIPNTransactionStatusCode["AuthorizationOnlyValidated"] = "3";
    WebHookIPNTransactionStatusCode["TransactionRefused"] = "40";
})(WebHookIPNTransactionStatusCode = exports.WebHookIPNTransactionStatusCode || (exports.WebHookIPNTransactionStatusCode = {}));
/**
 * Class representing a webhook.
 */
class PaymentAcknowledgeWebHook extends WebHook_1.default {
    static code = "IPN";
    orderId;
    amount;
    transactionCurrency;
    transactionStatusCode;
    /** Type of payment */
    operationType;
    constructor(data) {
        if (!data) {
            throw new Error("WebHook data is required");
        }
        super(PaymentAcknowledgeWebHook.code, data);
        const operationType = Utils_1.default.hasEnumOrDefault(data.operationType, WebHookIPNOperationType, null);
        const transactionStatusCode = Utils_1.default.hasEnumOrDefault(data.transactionStatusCode, WebHookIPNTransactionStatusCode, null);
        if (!operationType) {
            throw new Error("WebHook operationType is required");
        }
        else if (!transactionStatusCode) {
            throw new Error("WebHook transactionStatusCode is required");
        }
        else if (!data.orderId) {
            throw new Error("WebHook orderId is required");
        }
        else if (!data.amount) {
            throw new Error("WebHook amount is required");
        }
        else if (!data.transactionCurrency) {
            throw new Error("WebHook transactionCurrency is required");
        }
        this.orderId = data.orderId;
        this.amount = data.amount;
        this.transactionCurrency = data.transactionCurrency;
        this.transactionStatusCode = transactionStatusCode;
        this.operationType = operationType;
    }
}
exports.default = PaymentAcknowledgeWebHook;
