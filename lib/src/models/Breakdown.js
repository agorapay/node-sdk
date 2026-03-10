"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Amount_1 = __importDefault(require("./Amount"));
const Commission_1 = __importDefault(require("./Commission"));
/**
 * Class representing a breakdown.
 */
class Breakdown {
    constructor(...args) {
        if (args.length === 1) {
            // from data
            const data = args[0];
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
    encode() {
        return {
            amount: this.amount.encode(),
            sellerAccountNumber: this.sellerAccountNumber,
            label: this.label,
            commission: this.commission ? this.commission.encode() : undefined
        };
    }
}
exports.default = Breakdown;
