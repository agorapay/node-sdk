import PayerBasic from "../models/PayerBasic.js";
import ListingResponse from '../models/ListingResponse.js';
import VirtualIbanInfo from "../models/VirtualIbanInfo.js";
/**
 * Options for creating or configuring a virtual IBAN.
 * Account number for which a virtual IBAN is requested. The account could be the principal account of the marketplace or of a merchant
 * @property {string} accountNumber
 * Your client's reference.
 * @property {PayerBasic | undefined} [payer]
 */
interface CreateVirtualIbanOptions {
    accountNumber: string;
    payer?: PayerBasic;
}
/**
 * Response object for creating a virtual IBAN.
 * @interface CreateVirtualIbanResponse
 * The generated virtual IBAN
 * @property {string} [virtualIban]
 */
interface CreateVirtualIbanResponse {
    virtualIban: string;
}
/**
 * Options for deleting² a virtual IBAN.
 * @interface DeleteVirtualIbanOptions
 * Virtual IBAN to be deleted
 * @property {string} [virtualIBAN]
 */
interface DeleteVirtualIbanOptions {
    virtualIBAN: string;
}
/**
 * Options for filtering and selecting virtual IBANs in a list operation.
 *
 * @interface VirtualIbanListOptions
 * @property {string} [accountNumber] - Account number linked to the virtual IBAN to be selected
 * @property {PayerBasic} [payer] - Reference of your payer to be selected
 * @property {string} [virtualIBAN] - Virtual IBAN to be selected
 */
interface VirtualIbanListOptions {
    accountNumber?: string;
    payer?: PayerBasic;
    virtualIBAN?: string;
}
/**
 * Represents the response from a virtual IBAN list request.
 * Extends the base listing response with virtual IBAN specific data.
 *
 * @interface VirtualIbanListResponse
 * @extends {ListingResponse}
 *
 * @property {Array<VirtualIbanInfo>} virtualIBANList - List of virtual IBAN information objects matching the request criteria
 */
interface VirtualIbanListResponse extends ListingResponse {
    /** List of operations matching the request */
    virtualIBANList: Array<VirtualIbanInfo>;
}
export { CreateVirtualIbanOptions, CreateVirtualIbanResponse, DeleteVirtualIbanOptions, VirtualIbanListOptions, VirtualIbanListResponse };
