import Amount from "./Amount";
import Commission from "./Commission";
import Encodable from "./Encodable";

/**
 * Class representing a breakdown.
 */
export default class Breakdown implements Encodable {
  /** The breakdown amount. */
  public amount: Amount;
  /** Account number of the merchant or marketplace. */
  public sellerAccountNumber: string;
  /** The label for the breakdown. Maximum 30 characters. */
  public label?: string;
  /** The commission information. */
  public commission?: Commission;

  /**
   * @constructor
   * @param amount - The breakdown amount.
   * @param sellerAccountNumber - The breakdown seller (merchant) account number.
   * @param label - The breakdown label (optional)
   * @param commission - The breakdown commission (optional)
   * @example
   * ````typescript
   *let breakdown1 = new Breakdown(new Amount(10000, "EUR"), "AZ3456FGG123", undefined, undefined)
   *let breakdown2 = new Breakdown(new Amount(10000, "EUR"), "AZ3456FGG123", "breakdown2")
   *let breakdown3 = new Breakdown(new Amount(10000, "EUR"), "AZ3456FGG123", undefined, new Commission(900, "EUR", "1234AVGHH"))
   *
   * ````
   */
  constructor(amount: Amount, sellerAccountNumber: string, label?: string, commission?: Commission);
  /**
   * @constructor
   * @param data - Object which contains the necessary data to create a breakdown.
   * @throws Will throw an error if `amount` or `sellerAccountNumber` is missing from the `data` param.
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
  constructor(data: any);
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];

      this.amount = new Amount(data.amount);
      if (!data.sellerAccountNumber) {
        throw new Error("Missing required field: sellerAccountNumber");
      }

      this.sellerAccountNumber = data.sellerAccountNumber;
      this.label = data.label;
      if (data.commission) {
        this.commission = new Commission(data.commission);
      }
    } else {
      this.amount = args[0];
      this.sellerAccountNumber = args[1];
      this.label = args[2];
      this.commission = args[3];
    }
  }

  public encode(): { [key: string]: any } {
    const data: any = {
      amount: this.amount.encode(),
      sellerAccountNumber: this.sellerAccountNumber,
      label: this.label
    };

    if (this.commission) {
      data.commission = this.commission.encode();
    }

    return data;
  }
}
