"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an account holder.
 */
class AccountHolder {
    /** A string representing the account number. */
    accountNumber;
    /** Alias for the payment method. */
    paymentMethodAlias;
    /**  */
    requirements;
    /**  */
    physicalPersons;
    /** Id used for futher update function call */
    requestId;
    /** Status of request */
    requestStatus;
    /**
     * @constructor
     * @param accountNumber - A string representing the account number.
     * @param paymentMethodAlias - Alias for the payment method.
     * @param requirements -
     * @param physicalPersons -
     * @param requestId - Id used for futher update function call
     * @param requestStatus - Status of request
     */
    constructor(requirements, physicalPersons, accountNumber, paymentMethodAlias, requestId, requestStatus) {
        this.accountNumber = accountNumber;
        this.paymentMethodAlias = paymentMethodAlias;
        this.requirements = requirements;
        this.physicalPersons = physicalPersons;
        this.requestStatus = requestStatus;
        this.requestId = requestId;
    }
    encode() {
        return {
            accountNumber: this.accountNumber,
            paymentMethodAlias: this.paymentMethodAlias,
            requirements: this.requirements.map((x) => x.encode()),
            physicalPersons: this.physicalPersons.map((x) => x.encode()),
            requestId: this.requestId,
            requestStatus: this.requestStatus
        };
    }
}
exports.default = AccountHolder;
