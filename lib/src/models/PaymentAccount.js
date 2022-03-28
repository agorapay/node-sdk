"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
/**
 * Class representing a payment account.
 */
var PaymentAccount = /** @class */ (function () {
    function PaymentAccount(data) {
        if (!data.account)
            throw new Error('Missing required field: account');
        var account = data.account;
        this.number = account.number;
        this.name = account.name;
        if (account.status &&
            Object.values(enums_1.AccountStatus).some(function (status) { return status === account.status; }))
            this.status = account.status;
        this.currency = account.currency;
        this.type = account.type;
        this.payoutAuto = account.payoutAuto;
        this.floorLimit = account.floorLimit;
        this.balance = account.balance;
        this.reference = account.reference;
        this.availableBalance = account.availableBalance;
    }
    return PaymentAccount;
}());
exports.default = PaymentAccount;
