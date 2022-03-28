import Encodable from './Encodable';

/**
 * Class representing a cart.
 */
class Cart implements Encodable {
  /** Number of article in cart. */
  quantity: number;

  /**
   *
   * @param quantity - Number of article in cart.
   */
  constructor(quantity: number) {
    this.quantity = quantity;
  }

  encode(): { [key: string]: any } {
    return {
      totalQuantity: this.quantity
    };
  }
}

export default Cart;
