"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = __importDefault(require("./Amount"));
class Transaction {
    constructor(data) {
        this.id = data.id;
        if (Object.values(enums_1.TransactionStatus).some((status) => status === data.status)) {
            this.status = data.transactionStatus;
        }
        else {
            throw new Error('Missing required field or invalid data: status');
        }
        this.paymentMethodId = data.paymentMethodId;
        this.amount = new Amount_1.default(data.amount);
    }
}
exports.default = Transaction;
