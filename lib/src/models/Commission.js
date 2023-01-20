"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a commission.
 */
var Commission = /** @class */ (function () {
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
    function Commission() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data = args[0];
            this.amount = data.amount;
            this.account = data.account;
        }
        else {
            this.amount = args[0];
            this.account = args[1];
        }
    }
    Commission.prototype.encode = function () {
        return {
            amount: this.amount,
            account: this.account
        };
    };
    return Commission;
}());
exports.default = Commission;
