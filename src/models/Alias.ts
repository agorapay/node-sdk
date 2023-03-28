import Encodable from "./Encodable";

/**
 * Class representing an alias.
 */
export default class Alias implements Encodable {
  /** Identifier for the alias. */
  public id: string;
  /** format MMYY. */
  public expirationDate?: string;
  /** first 6 and last 4 digits of the PAN for card or Masqued IABN for SDD. */
  public maskedPan?: string;
  /** label of the alias. */
  public label?: string;
  /** Card brand (CB, VISA, MASTERCARD) */
  public cardBrand?: string;
  /** Bank code */
  public bankCode?: string;

  constructor(id: string, expirationDate?: string, maskedPan?: string, label?: string, cardBrand?: string, bankCode?: string) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.maskedPan = maskedPan;
    this.label = label;
    this.cardBrand = cardBrand;
    this.bankCode = bankCode;
  }

  public encode(): { [key: string]: any } {
    return {
      id: this.id,
      expirationDate: this.expirationDate,
      maskedPan: this.maskedPan,
      label: this.label,
      cardBrand: this.cardBrand,
      bankCode: this.bankCode
    };
  }
}
