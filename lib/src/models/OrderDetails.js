"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Transaction_1 = require("./Transaction");
var OrderDetails = /** @class */ (function () {
    function OrderDetails(data) {
        this.orderAmount = data.orderAmount
            ? new Amount_1.default(data.orderAmount)
            : undefined;
        this.orderRemainingAmount = data.orderRemainingAmount
            ? new Amount_1.default(data.orderRemainingAmount)
            : undefined;
        this.orderId = +data.orderId;
        if (Object.values(enums_1.OrderStatus).some(function (orderStatus) { return orderStatus === data.orderStatus; })) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionList = data.transactionList
            ? data.transactionList.map(function (x) { return new Transaction_1.default(x); })
            : undefined;
    }
    return OrderDetails;
}());
exports.default = OrderDetails;
