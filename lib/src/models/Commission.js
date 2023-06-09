"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a commission.
 */
class Commission {
    /** The commission amount. */
    amount;
    /** The commission account number. */
    account;
    /**
     * @constructor
     * @param amountValue - The commission amount value.
     * @param amountCurrency - The commission amount currency.
     * @param account - The commission account number.
     * @example
     * ````typescript
     *let commission1 = new Commission(10000, "EUR", "12345678")
     * ````
     */
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            this.amount = data.amount;
            this.account = data.account;
        }
        else {
            this.amount = args[0];
            this.account = args[1];
        }
    }
    encode() {
        return {
            amount: this.amount,
            account: this.account
        };
    }
}
exports.default = Commission;
