import Encodable from './Encodable';

class Payer implements Encodable {
  /** IP Address of the customer. */
  IPAddress?: string;
  /** reference of the customer from the marketplace. */
  reference: string;
  /** The browser information use to request the payment. */
  userAgent?: string;
  /** The default language of the browser. The first two characters are used to identify the language code. */
  language?: string;

  /**
   *
   * @param reference - IP Address of the customer.
   * @param IPAddress - reference of the customer from the marketplace.
   * @param userAgent - The browser information use to request the payment.
   * @param language - The default language of the browser. The first two characters are used to identify the language code.
   */
  constructor(
    reference: string,
    IPAddress?: string,
    userAgent?: string,
    language?: string
  ) {
    this.IPAddress = IPAddress;
    this.reference = reference;
    this.userAgent = userAgent;
    this.language = language;
  }

  encode(): { [key: string]: any } {
    return {
      IPAddress: this.IPAddress,
      reference: this.reference,
      userAgent: this.userAgent,
      language: this.language
    };
  }
}

export default Payer;
