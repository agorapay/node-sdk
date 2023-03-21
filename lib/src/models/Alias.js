"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an alias.
 */
var Alias = /** @class */ (function () {
    function Alias(id, expirationDate, maskedPan, label, cardBrand, bankCode) {
        this.id = id;
        this.expirationDate = expirationDate;
        this.maskedPan = maskedPan;
        this.label = label;
        this.cardBrand = cardBrand;
        this.bankCode = bankCode;
    }
    Alias.prototype.encode = function () {
        return {
            id: this.id,
            expirationDate: this.expirationDate,
            maskedPan: this.maskedPan,
            label: this.label,
            cardBrand: this.cardBrand,
            bankCode: this.bankCode
        };
    };
    return Alias;
}());
exports.default = Alias;
