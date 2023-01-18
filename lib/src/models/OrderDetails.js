"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Transaction_1 = require("./Transaction");
var Utils_1 = require("../../utils/Utils");
var OrderDetails = /** @class */ (function () {
    function OrderDetails(data) {
        var _a, _b;
        this.orderAmount = data.orderAmount ? new Amount_1.default(data.orderAmount) : undefined;
        this.orderRemainingAmount = data.orderRemainingAmount ? new Amount_1.default(data.orderRemainingAmount) : undefined;
        this.orderId = +data.orderId;
        this.orderStatus = Utils_1.default.hasEnumOrDefault(data.orderStatus, enums_1.OrderStatus, undefined);
        this.transactionList = (_b = (_a = data.transactionList) === null || _a === void 0 ? void 0 : _a.map(function (x) { return new Transaction_1.default(x); })) !== null && _b !== void 0 ? _b : undefined;
    }
    return OrderDetails;
}());
exports.default = OrderDetails;
