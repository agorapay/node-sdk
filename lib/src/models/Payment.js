"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
class Payment {
    constructor(data) {
        this.orderId = +data.orderId;
        if (Object.values(enums_1.OrderStatus).some((orderStatus) => orderStatus === data.orderStatus)) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionId = data.transactionId;
        if (Object.values(enums_1.TransactionStatus).some((transactionStatus) => transactionStatus === data.transactionStatus)) {
            this.transactionStatus = data.transactionStatus;
        }
        else {
            this.transactionStatus = undefined;
        }
        this.virtualIban = data.virtualIban;
        this.redirectUrl = data.redirectUrl;
        this.reference = data.reference;
        this.redirectInd = data.redirectInd;
    }
}
exports.default = Payment;
