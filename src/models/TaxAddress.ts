import Encodable from './Encodable';

/**
 * Class representing a Tax Address.
 */
class TaxAddress implements Encodable {
  /** Number and road name */
  address: string;
  /** */
  city: string;
  /**  */
  postalCode: string;
  /** */
  country: string;

  /**
   * @constructor
   * @param address -
   * @param city -
   * @param postalCode -
   * @param country -
   */
  constructor(
    address: string,
    city: string,
    postalCode: string,
    country: string
  ) {
    if (!address) throw new Error('Missing required field: address');
    if (!city) throw new Error('Missing required field: city');
    if (!postalCode) throw new Error('Missing required field: postalCode');
    if (!country) throw new Error('Missing required field: country');
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
  }

  encode(): { [key: string]: any } {
    return {
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      country: this.country
    };
  }
}

export default TaxAddress;
