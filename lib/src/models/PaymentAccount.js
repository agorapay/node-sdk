"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Utils_1 = require("../../utils/Utils");
/**
 * Class representing a payment account.
 */
class PaymentAccount {
    /** Number of the account. */
    number;
    /** Thirdparty name. */
    name;
    /** The status os the account. */
    status;
    /** Currency code in 3 characters ISO format. */
    currency;
    /** Account type. */
    type;
    /** 1 if payout auto activated. */
    payoutAuto;
    /** Minimum amount for payout auto. */
    floorLimit;
    /**  */
    balance;
    /** Account reference. */
    reference;
    /** Available balance is the balance minus the floor limit. Set to 0 if result is negative */
    availableBalance;
    constructor(data) {
        if (!data.account) {
            throw new Error("Missing required field: account");
        }
        const account = data.account;
        this.number = account.number;
        this.name = account.name;
        this.status = Utils_1.default.hasEnumOrDefault(account.status, enums_1.AccountStatus, undefined);
        this.currency = account.currency;
        this.type = account.type;
        this.payoutAuto = account.payoutAuto;
        this.floorLimit = account.floorLimit;
        this.balance = account.balance;
        this.reference = account.reference;
        this.availableBalance = account.availableBalance;
    }
}
exports.default = PaymentAccount;
