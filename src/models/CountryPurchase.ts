import Encodable from './Encodable';

/**
 *
 */
class CountryPurchase implements Encodable {
  /** */
  country: string;

  /**
   * @constructor
   * @param country -
   */
  constructor(country: string) {
    if (!country) throw new Error('Missing required field: country');
    this.country = country;
  }

  encode(): { [key: string]: any } {
    return {
      country: this.country
    };
  }
}

export default CountryPurchase;
