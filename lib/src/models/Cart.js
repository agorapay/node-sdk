"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../utils/Utils");
/**
 * Class representing a cart.
 */
var Cart = /** @class */ (function () {
    /** @param quantity - Number of article in cart. */
    function Cart(quantity) {
        this.totalQuantity = Utils_1.default.hasIntegerOrDefault(quantity, 0).toString(10);
    }
    Cart.prototype.encode = function () {
        return {
            totalQuantity: this.totalQuantity
        };
    };
    return Cart;
}());
exports.default = Cart;
