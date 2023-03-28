import Encodable from "./Encodable";

export default class Payer implements Encodable {
  /** IP Address of the customer. */
  public IPAddress?: string;
  /** reference of the customer from the marketplace. */
  public reference: string;
  /** The browser information use to request the payment. */
  public userAgent?: string;
  /** The default language of the browser. The first two characters are used to identify the language code. */
  public language?: string;

  /**
   *
   * @param reference - IP Address of the customer.
   * @param IPAddress - reference of the customer from the marketplace.
   * @param userAgent - The browser information use to request the payment.
   * @param language - The default language of the browser. The first two characters are used to identify the language code.
   */
  constructor(reference: string, IPAddress?: string, userAgent?: string, language?: string) {
    this.IPAddress = IPAddress;
    this.reference = reference;
    this.userAgent = userAgent;
    this.language = language;
  }

  public encode(): { [key: string]: any } {
    return {
      IPAddress: this.IPAddress,
      reference: this.reference,
      userAgent: this.userAgent,
      language: this.language
    };
  }
}
