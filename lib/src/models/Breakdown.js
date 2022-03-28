"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Amount_1 = require("./Amount");
var Commission_1 = require("./Commission");
/**
 * Class representing a breakdown.
 */
var Breakdown = /** @class */ (function () {
    function Breakdown() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            // from data
            var data = args[0];
            this.amount = new Amount_1.default(data.amount);
            if (!data.sellerAccountNumber)
                throw new Error('Missing required field: sellerAccountNumber');
            this.sellerAccountNumber = data.sellerAccountNumber;
            this.label = data.label;
            if (data.commission) {
                this.commission = new Commission_1.default(data.commission);
            }
        }
        else {
            this.amount = args[0];
            this.sellerAccountNumber = args[1];
            this.label = args[2];
            this.commission = args[3];
        }
    }
    Breakdown.prototype.encode = function () {
        return {
            amount: this.amount.encode(),
            sellerAccountNumber: this.sellerAccountNumber,
            label: this.label,
            commission: this.commission ? this.commission.encode() : undefined
        };
    };
    return Breakdown;
}());
exports.default = Breakdown;
