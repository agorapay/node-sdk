"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = require("./Amount");
const Utils_1 = require("../../utils/Utils");
class Transaction {
    /** ID of the payment transaction. */
    id;
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
    status;
    /** ID of the payment Method used for the transaction. */
    paymentMethodId;
    amount;
    constructor(data) {
        const status = Utils_1.default.hasEnumOrDefault(data.status, enums_1.TransactionStatus, null);
        if (!status) {
            throw new Error("Missing required field or invalid data: status");
        }
        this.id = data.id;
        this.status = status;
        this.paymentMethodId = data.paymentMethodId;
        this.amount = new Amount_1.default(data.amount);
    }
}
exports.default = Transaction;
