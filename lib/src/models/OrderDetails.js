"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = require("./Amount");
const Transaction_1 = require("./Transaction");
const Utils_1 = require("../../utils/Utils");
class OrderDetails {
    /**  */
    orderAmount;
    /**  */
    orderRemainingAmount;
    /** Order id obtained in order creation and to provide in each next request. */
    orderId;
    /**
     * Status of an order. the following status can be provided:
     * * `Created`: The order is created
     * * `PendingPayment`: Payment in progress
     * * `Complete`: Payment is completed
     * * `PartialComplete`: Payment is completed but all order amount is not payed
     * * `Canceled`: The order is canceled
     */
    orderStatus;
    /** */
    transactionList;
    constructor(data) {
        this.orderAmount = data.orderAmount ? new Amount_1.default(data.orderAmount) : undefined;
        this.orderRemainingAmount = data.orderRemainingAmount ? new Amount_1.default(data.orderRemainingAmount) : undefined;
        this.orderId = +data.orderId;
        this.orderStatus = Utils_1.default.hasEnumOrDefault(data.orderStatus, enums_1.OrderStatus, undefined);
        this.transactionList = data.transactionList?.map((x) => new Transaction_1.default(x)) ?? undefined;
    }
}
exports.default = OrderDetails;
