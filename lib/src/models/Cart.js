"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a cart.
 */
class Cart {
    /**
     *
     * @param quantity - Number of article in cart.
     */
    constructor(quantity) {
        this.quantity = quantity;
    }
    encode() {
        return {
            totalQuantity: this.quantity
        };
    }
}
exports.default = Cart;
