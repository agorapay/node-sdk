import Encodable from "./Encodable";
import Utils from "../../utils/Utils";

/**
 * Class representing a cart.
 */
export default class Cart implements Encodable {
  /** Number of article in cart. */
  public totalQuantity: string;

  /** @param quantity - Number of article in cart. */
  constructor(quantity: number) {
    this.totalQuantity = Utils.hasIntegerOrDefault(quantity, 0).toString(10);
  }

  public encode(): { [key: string]: any } {
    return {
      totalQuantity: this.totalQuantity
    };
  }
}
