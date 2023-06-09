"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Utils_1 = require("../../utils/Utils");
class Payment {
    /** Order id obtained in order creation and to provide in each next request. */
    orderId;
    /**
     * Status of an order. the following status can be provided:
     * * `Created`: The order is created
     * * `PendingPayment`: Payment in progress
     * * `Complete`: Payment is completed
     * * `PartialComplete`: Payment is completed but all order amount is not payed
     * * `Canceled`: The order is canceled
     */
    orderStatus;
    /** Id of the payment transaction. */
    transactionId;
    /**
     * Status of a transaction. The following value may be provided:
     * * `Created`: The transaction is just created. No payment is already made.
     * * `InProgress`: Payment is in progress
     * * `Accepted`: Payment is accepted
     * * `Completed`: Payment confirmation is received
     * * `Canceled`: Payment is canceled
     * * `Refused`: payment is refused
     * * `Abandonned` : Payment is not performed
     */
    transactionStatus;
    /** Iban to make payment to for SCT or SWIFT method */
    virtualIban;
    /** Url to redirect the client to to continue the payment with an external partner. The marketplace must redirect his/her client to this url to continue payment process.  */
    redirectUrl;
    /** Mandate reference. */
    reference;
    /** 1 if user must be redirect to the redirectUrl site. */
    redirectInd;
    constructor(data) {
        this.orderId = data.orderId ?? undefined;
        this.orderStatus = Utils_1.default.hasEnumOrDefault(data.orderStatus, enums_1.OrderStatus, undefined);
        this.transactionId = data.transactionId;
        this.transactionStatus = Utils_1.default.hasEnumOrDefault(data.transactionStatus, enums_1.TransactionStatus, undefined);
        this.virtualIban = data.virtualIban;
        this.redirectUrl = data.redirectUrl;
        this.reference = data.reference;
        this.redirectInd = data.redirectInd;
    }
}
exports.default = Payment;
