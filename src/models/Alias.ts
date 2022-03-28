import Encodable from './Encodable';

/**
 * Class representing an alias.
 */
class Alias implements Encodable {
  /** Identifier for the alias. */
  id: string;
  /** format MMYY. */
  expirationDate?: string;
  /** first 6 and last 4 digits of the PAN for card or Masqued IABN for SDD. */
  maskedPan?: string;
  /** label of the alias. */
  label?: string;
  /** Card brand (CB, VISA, MASTERCARD) or bank code for IBAN. */
  brand?: string;

  constructor(
    id: string,
    expirationDate?: string,
    maskedPan?: string,
    label?: string,
    brand?: string
  ) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.maskedPan = maskedPan;
    this.label = label;
    this.brand = brand;
  }

  encode(): { [key: string]: any } {
    return {
      id: this.id,
      expirationDate: this.expirationDate,
      maskedPan: this.maskedPan,
      label: this.label,
      brand: this.brand
    };
  }
}

export default Alias;
