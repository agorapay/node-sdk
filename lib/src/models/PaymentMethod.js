"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alias_1 = require("./Alias");
class PaymentMethod {
    /** If alias exist for the customer and the payment Method. */
    aliasList;
    /** Identifier of the payment method. */
    id;
    /** label of the payment Method. */
    label;
    /** Id of the type of payment method
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
    type;
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
    constructor(id, aliasList, label, type) {
        this.aliasList = (aliasList ?? []).map((x) => new Alias_1.default(x.id, x.expirationDate, x.maskedPan, x.label, x.cardBrand, x.bankCode));
        this.id = id;
        this.label = label;
        this.type = type;
    }
    encode() {
        return {
            aliasList: (this.aliasList ?? []).map((x) => x.encode()),
            id: this.id,
            label: this.label,
            type: this.type
        };
    }
}
exports.default = PaymentMethod;
