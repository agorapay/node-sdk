"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alias_1 = require("./Alias");
var PaymentMethod = /** @class */ (function () {
    /**
     *
     * @param id - If alias exist for the customer and the payment Method.
     * @param aliasList - Identifier of the payment method.
     * @param label - label of the payment Method.
     * @param type - Id of the type of payment method
     * * Sepa Direct Debit (1)
     * * Sepa Credit Transfer (2)
     * * Transfer (3)
     * * Card (4)
     * * SWIFT (5)
     * * Sepa Direct Debit B2B (6)
     * * Letter of credit (7)
     * * Voucher (8)
     * * Remainder(9)
     */
    function PaymentMethod(id, aliasList, label, type) {
        this.aliasList = (aliasList !== null && aliasList !== void 0 ? aliasList : []).map(function (x) { return new Alias_1.default(x.id, x.expirationDate, x.maskedPan, x.label, x.cardBrand, x.bankCode); });
        this.id = id;
        this.label = label;
        this.type = type;
    }
    PaymentMethod.prototype.encode = function () {
        var _a;
        return {
            aliasList: ((_a = this.aliasList) !== null && _a !== void 0 ? _a : []).map(function (x) { return x.encode(); }),
            id: this.id,
            label: this.label,
            type: this.type
        };
    };
    return PaymentMethod;
}());
exports.default = PaymentMethod;
