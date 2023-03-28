import Encodable from "./Encodable";

/**
 * Class representing an address.
 */
export default class Address implements Encodable {
  /** Number and road name. */
  public address: string;
  /**  */
  public city: string;
  /** */
  public postalCode: string;
  /** The ISO country code in 3 characters format. */
  public country: string;

  /**
   * @constructor
   * @param address - Number and road name.
   * @param city
   * @param postalCode
   * @param country - The ISO country code in 3 characters format.
   * @example
   * ````typescript
   *let address = new Address("118 Boulevard Saint-Germain", "Paris", "75006", "FRA")
   *
   * ````
   */
  constructor(address: string, city: string, postalCode: string, country: string);
  /**
   * @constructor
   * @param data - Object which contains required address attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   * @example
   * ````typescript
   * let data = {
   *   address: "118 Boulevard Saint-Germain",
   *   city: "Paris",
   *   postalCode: "75006",
   *   country: "FRA"
   * }
   * try {
   *  let address = new Address(data)
   * } catch (err) {
   *  console.log(err)
   * }
   *
   * ````
   */
  constructor(data: { [key: string]: any });
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];
      if (!data.address) {
        throw new Error("Missing required field: address");
      } else if (!data.city) {
        throw new Error("Missing required field: city");
      } else if (!data.postalCode) {
        throw new Error("Missing required field: postalCode");
      } else if (!data.country) {
        throw new Error("Missing required field: country");
      }

      this.address = data.address;
      this.city = data.city;
      this.postalCode = data.postalCode;
      this.country = data.country;
    } else {
      this.address = args[0];
      this.city = args[1];
      this.postalCode = args[2];
      this.country = args[3];
    }
  }

  public encode(): { [key: string]: any } {
    return {
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      country: this.country
    };
  }
}
