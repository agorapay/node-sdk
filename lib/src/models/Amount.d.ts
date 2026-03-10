import Encodable from './Encodable';
/**
 * Class representing an amount with a value and a currency.
 */
declare class Amount implements Encodable {
    /** The amount value. */
    value: number;
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
    constructor(value: number, currency: string);
    /**
     * @constructor
     * @param data - Object which contains value and currency attributes.
     * @throws Will throw an error if `value` or `currency` is missing from the `data` param.
     * @example
     * ````typescript
     * let data = { value: 10000, currency: "EUR" }
     * try {
     *  let amount = new Amount(data)
     * } catch (err) {
     *  console.log(err)
     * }
     *
     * ````
     */
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
export default Amount;
