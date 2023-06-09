"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an amount with a value and a currency.
 */
class Amount {
    /** The amount value. */
    value;
    /** Currency code in 3 characters ISO format/ */
    currency;
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (data.value === null || data.value === undefined) {
                throw new Error("Missing required field: value");
            }
            if (!data.currency) {
                throw new Error("Missing required field: currency");
            }
            this.value = data.value;
            this.currency = data.currency;
        }
        else {
            this.value = args[0];
            this.currency = args[1];
        }
    }
    encode() {
        return {
            value: this.value.toString(),
            currency: this.currency
        };
    }
}
exports.default = Amount;
