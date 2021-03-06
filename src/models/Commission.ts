import Amount from './Amount';
import Encodable from './Encodable';

/**
 * Class representing a commission.
 */
class Commission implements Encodable {
  /** The commission amount. */
  amount: number;
  /** The commission account number. */
  account?: string;

  /**
   * @constructor
   * @param data - Object which contains the necessary data to create a commission.
   * @example
   * ````typescript
   * let data = { amount: { value: 10000, currency: "EUR" }, account: "123456788" }
   * try {
   *  let commission = new Commission(data)
   * } catch (err) {
   *  console.log(err)
   * }
   *
   * ````
   */
  constructor(data: { [key: string]: any });
  /**
   * @constructor
   * @param amount - The commission amount.
   * @param account - The commission account number.
   * @example
   * ````typescript
   *let commission1 = new Commission(new Amount(10000, "EUR"), "12345678")
   * ````
   */
  constructor(amount: number, account?: string);
  /**
   * @constructor
   * @param amountValue - The commission amount value.
   * @param amountCurrency - The commission amount currency.
   * @param account - The commission account number.
   * @example
   * ````typescript
   *let commission1 = new Commission(10000, "EUR", "12345678")
   * ````
   */
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];
      this.amount = data.amount;
      this.account = data.account;
    } else {
      this.amount = args[0];
      this.account = args[1];
    }
  }

  encode(): { [key: string]: any } {
    return {
      amount: this.amount.toString(),
      account: this.account
    };
  }
}

export default Commission;
