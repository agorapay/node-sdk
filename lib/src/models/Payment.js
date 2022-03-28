"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Payment = /** @class */ (function () {
    function Payment(data) {
        this.orderId = +data.orderId;
        if (Object.values(enums_1.OrderStatus).some(function (orderStatus) { return orderStatus === data.orderStatus; })) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionId = data.transactionId;
        if (Object.values(enums_1.TransactionStatus).some(function (transactionStatus) {
            return transactionStatus === data.transactionStatus;
        })) {
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
    return Payment;
}());
exports.default = Payment;
