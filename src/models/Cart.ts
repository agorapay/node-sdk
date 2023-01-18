import Encodable from "./Encodable";

/**
 * Class representing a cart.
 */
export default class Cart implements Encodable {
  /** Number of article in cart. */
  public quantity: number;

  /** @param quantity - Number of article in cart. */
  constructor(quantity: number) {
    this.quantity = quantity;
  }

  public encode(): { [key: string]: any } {
    return {
      totalQuantity: this.quantity
    };
  }
}
