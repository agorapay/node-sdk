"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for webhooks
 */
class WebHook {
    /** Operation (fix value) */
    eventCode;
    /** Version number of the webhook */
    versionNumber;
    /** TransactionId for this payment */
    transactionId;
    /** The orderReference sent by the Marketplace for this payment */
    orderRef;
    /**
     * @param code The expected eventCode for this webhook
     * @param data The data to be used to create the webhook
     */
    constructor(code, data) {
        if (!data) {
            throw new Error("WebHook data is required");
        }
        else if (!data.eventCode) {
            throw new Error("WebHook eventCode is required");
        }
        else if (code !== data.eventCode) {
            throw new Error(`WebHook eventCode has an invalid value (expected: ${code}, actual: ${data.eventCode})`);
        }
        else if (!data.versionNumber) {
            throw new Error("WebHook versionNumber is required");
        }
        else if (!data.transactionId) {
            throw new Error("WebHook transactionId is required");
        }
        else if (!data.orderRef) {
            throw new Error("WebHook orderRef is required");
        }
        this.eventCode = data.eventCode;
        this.versionNumber = data.versionNumber;
        this.transactionId = data.transactionId;
        this.orderRef = data.orderRef;
    }
}
exports.default = WebHook;
