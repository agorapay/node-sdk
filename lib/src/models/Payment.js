"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Utils_1 = require("../../utils/Utils");
var Payment = /** @class */ (function () {
    function Payment(data) {
        var _a;
        this.orderId = (_a = data.orderId) !== null && _a !== void 0 ? _a : undefined;
        this.orderStatus = Utils_1.default.hasEnumOrDefault(data.orderStatus, enums_1.OrderStatus, undefined);
        this.transactionId = data.transactionId;
        this.transactionStatus = Utils_1.default.hasEnumOrDefault(data.transactionStatus, enums_1.TransactionStatus, undefined);
        this.virtualIban = data.virtualIban;
        this.redirectUrl = data.redirectUrl;
        this.reference = data.reference;
        this.redirectInd = data.redirectInd;
    }
    return Payment;
}());
exports.default = Payment;
