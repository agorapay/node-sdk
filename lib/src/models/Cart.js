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
export default Cart;
