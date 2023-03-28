"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Utils_1 = require("../../utils/Utils");
var Transaction = /** @class */ (function () {
    function Transaction(data) {
        var status = Utils_1.default.hasEnumOrDefault(data.status, enums_1.TransactionStatus, null);
        if (!status) {
            throw new Error("Missing required field or invalid data: status");
        }
        this.id = data.id;
        this.status = status;
        this.paymentMethodId = data.paymentMethodId;
        this.amount = new Amount_1.default(data.amount);
    }
    return Transaction;
}());
exports.default = Transaction;
