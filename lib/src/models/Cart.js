"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a cart.
 */
var Cart = /** @class */ (function () {
    /**
     *
     * @param quantity - Number of article in cart.
     */
    function Cart(quantity) {
        this.quantity = quantity;
    }
    Cart.prototype.encode = function () {
        return {
            totalQuantity: this.quantity
        };
    };
    return Cart;
}());
exports.default = Cart;
