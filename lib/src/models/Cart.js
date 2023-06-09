"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../../utils/Utils");
/**
 * Class representing a cart.
 */
class Cart {
    /** Number of article in cart. */
    totalQuantity;
    /** @param quantity - Number of article in cart. */
    constructor(quantity) {
        this.totalQuantity = Utils_1.default.hasIntegerOrDefault(quantity, 0).toString(10);
    }
    encode() {
        return {
            totalQuantity: this.totalQuantity
        };
    }
}
exports.default = Cart;
