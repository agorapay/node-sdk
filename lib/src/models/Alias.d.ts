import Encodable from "./Encodable";
/**
 * Class representing an alias.
 */
export default class Alias implements Encodable {
    /** Identifier for the alias. */
    id: string;
    /** format MMYY. */
    expirationDate?: string;
    /** first 6 and last 4 digits of the PAN for card or Masqued IABN for SDD. */
    maskedPan?: string;
    /** label of the alias. */
    label?: string;
    /** Card brand (CB, VISA, MASTERCARD) */
    cardBrand?: string;
    /** Bank code */
    bankCode?: string;
    constructor(id: string, expirationDate?: string, maskedPan?: string, label?: string, cardBrand?: string, bankCode?: string);
    encode(): {
        [key: string]: any;
    };
}
