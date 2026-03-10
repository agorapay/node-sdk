"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an alias.
 */
class Alias {
    constructor(id, expirationDate, maskedPan, label, cardBrand) {
        this.id = id;
        this.expirationDate = expirationDate;
        this.maskedPan = maskedPan;
        this.label = label;
        this.cardBrand = cardBrand;
    }
    encode() {
        return {
            id: this.id,
            expirationDate: this.expirationDate,
            maskedPan: this.maskedPan,
            label: this.label,
            cardBrand: this.cardBrand
        };
    }
}
exports.default = Alias;
