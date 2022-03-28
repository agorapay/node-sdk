"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an alias.
 */
var Alias = /** @class */ (function () {
    function Alias(id, expirationDate, maskedPan, label, brand) {
        this.id = id;
        this.expirationDate = expirationDate;
        this.maskedPan = maskedPan;
        this.label = label;
        this.brand = brand;
    }
    Alias.prototype.encode = function () {
        return {
            id: this.id,
            expirationDate: this.expirationDate,
            maskedPan: this.maskedPan,
            label: this.label,
            brand: this.brand
        };
    };
    return Alias;
}());
exports.default = Alias;
