import Encodable from "./Encodable";
/**
 * Class representing a cart.
 */
export default class Cart implements Encodable {
    /** Number of article in cart. */
    quantity: number;
    /** @param quantity - Number of article in cart. */
    constructor(quantity: number);
    encode(): {
        [key: string]: any;
    };
}
