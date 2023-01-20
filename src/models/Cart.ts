import Encodable from "./Encodable";

/**
 * Class representing a cart.
 */
export default class Cart implements Encodable {
  /** Number of article in cart. */
  public totalQuantity: number;

  /** @param quantity - Number of article in cart. */
  constructor(quantity: number) {
    this.totalQuantity = quantity;
  }

  public encode(): { [key: string]: any } {
    return {
      totalQuantity: this.totalQuantity
    };
  }
}
