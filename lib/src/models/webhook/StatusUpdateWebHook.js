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
exports.WebHookRelatedMessageStatus = exports.WebHookOperationSide = exports.WebHookOperationStatus = exports.WebHookStatusUpdateOperationType = void 0;
var enums_1 = require("../../../utils/enums");
var Utils_1 = require("../../../utils/Utils");
var WebHook_1 = require("./WebHook");
var WebHookStatusUpdateOperationType;
(function (WebHookStatusUpdateOperationType) {
    WebHookStatusUpdateOperationType["Purchase"] = "1";
    WebHookStatusUpdateOperationType["Refunds"] = "2";
    WebHookStatusUpdateOperationType["Transfer"] = "4";
    WebHookStatusUpdateOperationType["SCTSDDFundReceipt"] = "5";
    /** Reload request or payout Identifiable via operationSide */
    WebHookStatusUpdateOperationType["ReloadRequestOrPayout"] = "6";
    WebHookStatusUpdateOperationType["AuthorizationOnly"] = "7";
    WebHookStatusUpdateOperationType["PreAuthorOnly"] = "8";
    WebHookStatusUpdateOperationType["Unpaid"] = "9";
})(WebHookStatusUpdateOperationType = exports.WebHookStatusUpdateOperationType || (exports.WebHookStatusUpdateOperationType = {}));
var WebHookOperationStatus;
(function (WebHookOperationStatus) {
    WebHookOperationStatus["Registered"] = "R";
    WebHookOperationStatus["Waiting"] = "W";
    WebHookOperationStatus["Cashed"] = "E";
    WebHookOperationStatus["Cancelled"] = "C";
    WebHookOperationStatus["Suspended"] = "S";
    WebHookOperationStatus["Rejected"] = "R"; // ?
})(WebHookOperationStatus = exports.WebHookOperationStatus || (exports.WebHookOperationStatus = {}));
var WebHookOperationSide;
(function (WebHookOperationSide) {
    /** Pay in (a recharge is a payin) */
    WebHookOperationSide["Payin"] = "1";
    WebHookOperationSide["Transfer"] = "0";
    WebHookOperationSide["Payout"] = "-1";
})(WebHookOperationSide = exports.WebHookOperationSide || (exports.WebHookOperationSide = {}));
var WebHookRelatedMessageStatus;
(function (WebHookRelatedMessageStatus) {
    /** Customer initiates the cancellation (or usecase of SDD: Cancellation of direct debit following receipt of an unpaid amount before clearing) */
    WebHookRelatedMessageStatus["Cancellation"] = "0";
    /** Transactions not completed by the client and canceled due to timeout */
    WebHookRelatedMessageStatus["Timeout"] = "200";
    /** Transactions declined during acceptation process */
    WebHookRelatedMessageStatus["Declined"] = "201";
})(WebHookRelatedMessageStatus = exports.WebHookRelatedMessageStatus || (exports.WebHookRelatedMessageStatus = {}));
/**
 * Class representing a webhook.
 */
var StatusUpdateWebHook = /** @class */ (function (_super) {
    __extends(StatusUpdateWebHook, _super);
    function StatusUpdateWebHook(data) {
        var _a, _b, _c, _d;
        var _this = this;
        if (!data) {
            throw new Error("WebHook data is required");
        }
        _this = _super.call(this, StatusUpdateWebHook.code, data) || this;
        var operationType = Utils_1.default.hasEnumOrDefault(data.operationType, WebHookStatusUpdateOperationType, null);
        var operationStatus = Utils_1.default.hasEnumOrDefault(data.operationStatus, WebHookOperationStatus, null);
        var paymentMethodTypeId = Utils_1.default.hasEnumOrDefault(data.paymentMethodTypeId, enums_1.PaymentMethodType, null);
        var operationSide = Utils_1.default.hasEnumOrDefault(data.operationSide, WebHookOperationSide, null);
        if (!operationType) {
            throw new Error("WebHook operationType is required");
        }
        else if (!operationStatus) {
            throw new Error("WebHook operationStatus is required");
        }
        else if (!data.amount) {
            throw new Error("WebHook amount is required");
        }
        else if (!data.currencyCode) {
            throw new Error("WebHook currencyCode is required");
        }
        else if (!paymentMethodTypeId) {
            throw new Error("WebHook paymentMethodTypeId is required");
        }
        else if (!operationSide) {
            throw new Error("WebHook operationSide is required");
        }
        _this.operationType = operationType;
        _this.operationStatus = operationStatus;
        _this.amount = data.amount;
        _this.currencyCode = data.currencyCode;
        _this.operationDate = data.operationDate;
        _this.paymentMethodTypeId = paymentMethodTypeId;
        _this.operationSide = operationSide;
        _this.operationRefundId = data.operationRefundId;
        _this.metaData = (_a = data.metaData) !== null && _a !== void 0 ? _a : {};
        _this.relatedMsgStatus = Utils_1.default.hasEnumOrDefault(data.relatedMsgStatus, WebHookRelatedMessageStatus, undefined);
        _this.eventStatusLabel = (_b = data.eventStatusLabel) !== null && _b !== void 0 ? _b : undefined;
        _this.rejectReasonCode = (_c = data.rejectReasonCode) !== null && _c !== void 0 ? _c : undefined;
        _this.rejectReasonLabel = (_d = data.rejectReasonLabel) !== null && _d !== void 0 ? _d : undefined;
        return _this;
    }
    StatusUpdateWebHook.code = "operation";
    return StatusUpdateWebHook;
}(WebHook_1.default));
exports.default = StatusUpdateWebHook;
