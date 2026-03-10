"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an account holder.
 */
class AccountHolder {
    /**
     * @constructor
     * @param accountNumber - A string representing the account number.
     * @param paymentMethodAlias - Alias for the payment method.
     * @param requirements -
     * @param physicalPersons -
     * @param requestId - Id used for futher update function call
     * @param status - Status of request
     */
    constructor(requirements, physicalPersons, accountNumber, paymentMethodAlias, requestId, status) {
        this.accountNumber = accountNumber;
        this.paymentMethodAlias = paymentMethodAlias;
        this.requirements = requirements;
        this.physicalPersons = physicalPersons;
        this.status = status;
        this.requestId = requestId;
    }
    encode() {
        return {
            accountNumber: this.accountNumber,
            paymentMethodAlias: this.paymentMethodAlias,
            requirements: this.requirements.map((x) => x.encode()),
            physicalPersons: this.physicalPersons.map((x) => x.encode()),
            requestId: this.requestId,
            status: this.status
        };
    }
}
exports.default = AccountHolder;
