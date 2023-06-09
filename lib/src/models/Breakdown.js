"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Amount_1 = require("./Amount");
const Commission_1 = require("./Commission");
/**
 * Class representing a breakdown.
 */
class Breakdown {
    /** The breakdown amount. */
    amount;
    /** Account number of the merchant or marketplace. */
    sellerAccountNumber;
    /** The label for the breakdown. Maximum 30 characters. */
    label;
    /** The commission information. */
    commission;
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            this.amount = new Amount_1.default(data.amount);
            if (!data.sellerAccountNumber) {
                throw new Error("Missing required field: sellerAccountNumber");
            }
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
    encode() {
        const data = {
            amount: this.amount.encode(),
            sellerAccountNumber: this.sellerAccountNumber,
            label: this.label
        };
        if (this.commission) {
            data.commission = this.commission.encode();
        }
        return data;
    }
}
exports.default = Breakdown;
