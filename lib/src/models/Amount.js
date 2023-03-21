"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an amount with a value and a currency.
 */
var Amount = /** @class */ (function () {
    function Amount() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data = args[0];
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
    Amount.prototype.encode = function () {
        return {
            value: this.value.toString(),
            currency: this.currency
        };
    };
    return Amount;
}());
exports.default = Amount;
