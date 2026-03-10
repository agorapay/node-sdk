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
  cardBrand?: string;

  constructor(
    id: string,
    expirationDate?: string,
    maskedPan?: string,
    label?: string,
    cardBrand?: string
  ) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.maskedPan = maskedPan;
    this.label = label;
    this.cardBrand = cardBrand;
  }

  encode(): { [key: string]: any } {
    return {
      id: this.id,
      expirationDate: this.expirationDate,
      maskedPan: this.maskedPan,
      label: this.label,
      cardBrand: this.cardBrand
    };
  }
}

export default Alias;
