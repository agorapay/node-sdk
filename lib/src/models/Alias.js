"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an alias.
 */
class Alias {
    /** Identifier for the alias. */
    id;
    /** format MMYY. */
    expirationDate;
    /** first 6 and last 4 digits of the PAN for card or Masqued IABN for SDD. */
    maskedPan;
    /** label of the alias. */
    label;
    /** Card brand (CB, VISA, MASTERCARD) */
    cardBrand;
    /** Bank code */
    bankCode;
    constructor(id, expirationDate, maskedPan, label, cardBrand, bankCode) {
        this.id = id;
        this.expirationDate = expirationDate;
        this.maskedPan = maskedPan;
        this.label = label;
        this.cardBrand = cardBrand;
        this.bankCode = bankCode;
    }
    encode() {
        return {
            id: this.id,
            expirationDate: this.expirationDate,
            maskedPan: this.maskedPan,
            label: this.label,
            cardBrand: this.cardBrand,
            bankCode: this.bankCode
        };
    }
}
exports.default = Alias;
