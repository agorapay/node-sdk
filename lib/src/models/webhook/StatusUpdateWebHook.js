"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookRelatedMessageStatus = exports.WebHookOperationSide = exports.WebHookOperationStatus = exports.WebHookStatusUpdateOperationType = void 0;
const enums_1 = require("../../../utils/enums");
const Utils_1 = require("../../../utils/Utils");
const WebHook_1 = require("./WebHook");
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
})(WebHookStatusUpdateOperationType || (exports.WebHookStatusUpdateOperationType = WebHookStatusUpdateOperationType = {}));
var WebHookOperationStatus;
(function (WebHookOperationStatus) {
    WebHookOperationStatus["Registered"] = "R";
    WebHookOperationStatus["Waiting"] = "W";
    WebHookOperationStatus["Cashed"] = "E";
    WebHookOperationStatus["Cancelled"] = "C";
    WebHookOperationStatus["Suspended"] = "S";
})(WebHookOperationStatus || (exports.WebHookOperationStatus = WebHookOperationStatus = {}));
var WebHookOperationSide;
(function (WebHookOperationSide) {
    /** Pay in (a recharge is a payin) */
    WebHookOperationSide["Payin"] = "1";
    WebHookOperationSide["Transfer"] = "0";
    WebHookOperationSide["Payout"] = "-1";
})(WebHookOperationSide || (exports.WebHookOperationSide = WebHookOperationSide = {}));
var WebHookRelatedMessageStatus;
(function (WebHookRelatedMessageStatus) {
    /** Customer initiates the cancellation (or usecase of SDD: Cancellation of direct debit following receipt of an unpaid amount before clearing) */
    WebHookRelatedMessageStatus["Cancellation"] = "0";
    /** Transactions not completed by the client and canceled due to timeout */
    WebHookRelatedMessageStatus["Timeout"] = "200";
    /** Transactions declined during acceptation process */
    WebHookRelatedMessageStatus["Declined"] = "201";
})(WebHookRelatedMessageStatus || (exports.WebHookRelatedMessageStatus = WebHookRelatedMessageStatus = {}));
/**
 * Class representing a webhook.
 */
class StatusUpdateWebHook extends WebHook_1.default {
    static code = "operation";
    /** Type of payment */
    operationType;
    /** Status of the transaction */
    operationStatus;
    amount;
    currencyCode;
    operationDate;
    paymentMethodTypeId;
    /** Direction of funds */
    operationSide;
    /**
     * Linked transaction.
     * For unpaid: transactionId of the payment transaction impacted by the unpaid
     * TransactionCase of refund: transactionId of the refunded payment transaction
     * Not present if initial transaction
     */
    operationRefundId;
    /** Provision of the json as provided via API by the Marketplace. Not present if field not provided as input. */
    metaData;
    /**
     * Additional complementary information provided to the status operation.
     */
    relatedMsgStatus;
    /** Message associated to relatedMsgStatus */
    eventStatusLabel;
    /** Will eventually be fed with information on operations, in particular on unpaid bills. */
    rejectReasonCode;
    /** Will eventually be fed with information on operations, in particular on unpaid bills. */
    rejectReasonLabel;
    constructor(data) {
        if (!data) {
            throw new Error("WebHook data is required");
        }
        super(StatusUpdateWebHook.code, data);
        const operationType = Utils_1.default.hasEnumOrDefault(data.operationType, WebHookStatusUpdateOperationType, null);
        const operationStatus = Utils_1.default.hasEnumOrDefault(data.operationStatus, WebHookOperationStatus, null);
        const paymentMethodTypeId = Utils_1.default.hasEnumOrDefault(data.paymentMethodTypeId, enums_1.PaymentMethodType, null);
        const operationSide = Utils_1.default.hasEnumOrDefault(data.operationSide, WebHookOperationSide, null);
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
        this.operationType = operationType;
        this.operationStatus = operationStatus;
        this.amount = data.amount;
        this.currencyCode = data.currencyCode;
        this.operationDate = data.operationDate;
        this.paymentMethodTypeId = paymentMethodTypeId;
        this.operationSide = operationSide;
        this.operationRefundId = data.operationRefundId;
        this.metaData = data.metaData ?? {};
        this.relatedMsgStatus = Utils_1.default.hasEnumOrDefault(data.relatedMsgStatus, WebHookRelatedMessageStatus, undefined);
        this.eventStatusLabel = data.eventStatusLabel ?? undefined;
        this.rejectReasonCode = data.rejectReasonCode ?? undefined;
        this.rejectReasonLabel = data.rejectReasonLabel ?? undefined;
    }
}
exports.default = StatusUpdateWebHook;
