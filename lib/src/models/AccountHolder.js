"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an account holder.
 */
var AccountHolder = /** @class */ (function () {
    /**
     * @constructor
     * @param accountNumber - A string representing the account number.
     * @param paymentMethodAlias - Alias for the payment method.
     * @param requirements -
     * @param physicalPersons -
     * @param requestId - Id used for futher update function call
     * @param requestStatus - Status of request
     */
    function AccountHolder(requirements, physicalPersons, accountNumber, paymentMethodAlias, requestId, requestStatus) {
        this.accountNumber = accountNumber;
        this.paymentMethodAlias = paymentMethodAlias;
        this.requirements = requirements;
        this.physicalPersons = physicalPersons;
        this.requestStatus = requestStatus;
        this.requestId = requestId;
    }
    AccountHolder.prototype.encode = function () {
        return {
            accountNumber: this.accountNumber,
            paymentMethodAlias: this.paymentMethodAlias,
            requirements: this.requirements.map(function (x) { return x.encode(); }),
            physicalPersons: this.physicalPersons.map(function (x) { return x.encode(); }),
            requestId: this.requestId,
            requestStatus: this.requestStatus
        };
    };
    return AccountHolder;
}());
exports.default = AccountHolder;
