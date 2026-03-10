"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = __importDefault(require("./Amount"));
const Transaction_1 = __importDefault(require("./Transaction"));
class OrderDetails {
    constructor(data) {
        this.orderAmount = data.orderAmount
            ? new Amount_1.default(data.orderAmount)
            : undefined;
        this.orderRemainingAmount = data.orderRemainingAmount
            ? new Amount_1.default(data.orderRemainingAmount)
            : undefined;
        this.orderId = +data.orderId;
        if (Object.values(enums_1.OrderStatus).some((orderStatus) => orderStatus === data.orderStatus)) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionList = data.transactionList
            ? data.transactionList.map((x) => new Transaction_1.default(x))
            : undefined;
    }
}
exports.default = OrderDetails;
