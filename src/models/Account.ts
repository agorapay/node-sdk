import Encodable from './Encodable';

/**
 * Class representing an account.
 */
class Account implements Encodable {
  /** The ISO country code in 3 characters format. */
  country: string;

  /** Currency code in 3 characters ISO format. */
  currency: string;

  /** International Bank Account Number. */
  iban: string;

  /** Floor limit in currency unit. */
  floorLimit: number;

  /**
   * @constructor
   * @param country -
   * @param currency -
   * @param iban -
   * @param floorLimit -
   * @example
   * ````typescript
   *let account = new Account("FRA", "EUR", "AZERTYU12345", 2000)
   * ````
   */
  constructor(
    country: string,
    currency: string,
    iban: string,
    floorLimit: number
  );
  /**
   * @constructor
   * @param data - Object which contains required account attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   * @example
   * ````typescript
   * let data = {
   *   country: "FRA",
   *   currency: "EUR",
   *   iban: "AZERTYU12345",
   *   floorLimit: 2000
   * }
   * try {
   *   let account = new Account(data)
   * } catch (err) {
   *   console.log(err)
   * }
   *
   * ````
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];
      if (!data.country) throw new Error('Missing required field: country');
      if (!data.currency) throw new Error('Missing required field: currency');
      if (!data.iban) throw new Error('Missing required field: iban');
      if (data.floorLimit === null)
        throw new Error('Missing required field: floorLimit');
      this.country = data.country;
      this.currency = data.currency;
      this.iban = data.iban;
      this.floorLimit = +data.floorLimit;
    } else {
      this.country = args[0];
      this.currency = args[1];
      this.iban = args[2];
      this.floorLimit = args[3];
    }
  }

  encode(): { [key: string]: any } {
    return {
      country: this.country,
      currency: this.currency,
      iban: this.iban,
      floorLimit: this.floorLimit.toString()
    };
  }
}

export default Account;
