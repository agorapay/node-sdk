import Encodable from './Encodable.js';

class PayerBasic implements Encodable {
  /** Reference of your payer. */
  reference: string;
  /**
   *
   * @param reference - Reference of your payer.
   */
  constructor(
    reference: string
  ) {
    this.reference = reference;
  }

  encode(): { [key: string]: any } {
    return {
      reference: this.reference,
    };
  }
}

export default PayerBasic;
