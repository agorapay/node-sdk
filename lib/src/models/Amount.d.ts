import Encodable from "./Encodable";
/**
 * Class representing an amount with a value and a currency.
 */
export default class Amount implements Encodable {
    /** The amount value. */
    value: string;
    /** Currency code in 3 characters ISO format/ */
    currency: string;
    /**
     * @constructor
     * @param value - The value of the amount.
     * @param currency - The currency code in 3 characters ISO format (ex: EUR).
     * @example
     * ````typescript
     *let amount = new Amount(100000, "EUR")
     *
     * ````
     */
    constructor(value: string, currency: string);
    /**
     * @constructor
     * @param data - Object which contains value and currency attributes.
     * @throws Will throw an error if `value` or `currency` is missing from the `data` param.
     * @example
     * ````typescript
     * let data = { value: "10.56", currency: "EUR" }
     * try {
     *  let amount = new Amount(data)
     * } catch (err) {
     *  console.log(err)
     * }
     *
     * ````
     */
    constructor(data: Partial<Amount>);
    encode(): {
        [key: string]: any;
    };
}
