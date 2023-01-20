"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a cart.
 */
var Cart = /** @class */ (function () {
    /** @param quantity - Number of article in cart. */
    function Cart(quantity) {
        this.totalQuantity = quantity;
    }
    Cart.prototype.encode = function () {
        return {
            totalQuantity: this.totalQuantity
        };
    };
    return Cart;
}());
exports.default = Cart;
