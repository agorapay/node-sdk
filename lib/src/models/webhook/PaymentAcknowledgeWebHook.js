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
exports.WebHookIPNTransactionStatusCode = exports.WebHookIPNOperationType = void 0;
var Utils_1 = require("../../../utils/Utils");
var WebHook_1 = require("./WebHook");
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
var PaymentAcknowledgeWebHook = /** @class */ (function (_super) {
    __extends(PaymentAcknowledgeWebHook, _super);
    function PaymentAcknowledgeWebHook(data) {
        var _this = this;
        if (!data) {
            throw new Error("WebHook data is required");
        }
        _this = _super.call(this, PaymentAcknowledgeWebHook.code, data) || this;
        var operationType = Utils_1.default.hasEnumOrDefault(data.operationType, WebHookIPNOperationType, null);
        var transactionStatusCode = Utils_1.default.hasEnumOrDefault(data.transactionStatusCode, WebHookIPNTransactionStatusCode, null);
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
        _this.orderId = data.orderId;
        _this.amount = data.amount;
        _this.transactionCurrency = data.transactionCurrency;
        _this.transactionStatusCode = transactionStatusCode;
        _this.operationType = operationType;
        return _this;
    }
    PaymentAcknowledgeWebHook.code = "IPN";
    return PaymentAcknowledgeWebHook;
}(WebHook_1.default));
exports.default = PaymentAcknowledgeWebHook;
