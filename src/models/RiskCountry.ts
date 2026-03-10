import Encodable from './Encodable';

/**
 * For all countries considered high-risk where the client operates and carries out activities.
 */
class RiskCountry implements Encodable {
  /** Percentage of net turnover (excluding VAT) in the country */
  percentage: string;
  /** */
  country: string;

  /**
   * @constructor
   * @param percentage -
   * @param country -
   */
  constructor(percentage: string, country: string) {
    if (!percentage) throw new Error('Missing required field: percentage');
    if (!country) throw new Error('Missing required field: country');
    this.percentage = percentage;
    this.country = country;
  }

  encode(): { [key: string]: any } {
    return {
      percentage: this.percentage,
      country: this.country
    };
  }
}

export default RiskCountry;
