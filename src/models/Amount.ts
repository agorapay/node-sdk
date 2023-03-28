import Encodable from "./Encodable";

/**
 * Class representing an amount with a value and a currency.
 */
export default class Amount implements Encodable {
  /** The amount value. */
  public value: string;
  /** Currency code in 3 characters ISO format/ */
  public currency: string;

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
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];
      if (data.value === null || data.value === undefined) {
        throw new Error("Missing required field: value");
      }
      if (!data.currency) {
        throw new Error("Missing required field: currency");
      }
      this.value = data.value;
      this.currency = data.currency;
    } else {
      this.value = args[0];
      this.currency = args[1];
    }
  }

  public encode(): { [key: string]: any } {
    return {
      value: this.value.toString(),
      currency: this.currency
    };
  }
}
