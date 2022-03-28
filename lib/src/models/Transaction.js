"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Transaction = /** @class */ (function () {
    function Transaction(data) {
        this.id = data.id;
        if (Object.values(enums_1.TransactionStatus).some(function (status) { return status === data.status; })) {
            this.status = data.transactionStatus;
        }
        else {
            throw new Error('Missing required field or invalid data: status');
        }
        this.paymentMethodId = data.paymentMethodId;
        this.amount = new Amount_1.default(data.amount);
    }
    return Transaction;
}());
exports.default = Transaction;
