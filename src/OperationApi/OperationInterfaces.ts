import ListingOptions from "../models/ListingOptions";
import ListingResponse from "../models/ListingResponse";
import Operation from "../models/Operation";

/**
 * @prop {string | undefined} startDate: Begin date of operation reporting in YYYYMMDDHHMMSS format
 * @prop {string | undefined} endDate: Ended Date of operation Reporting in YYYYMMDDHHMMSS format
 * @prop {number | undefined} maxAmount
 * @prop {number | undefined} minAmount
 * @prop {string | undefined} orderReference: Marketplace reference for this order
 * @prop {string | undefined} currency: Currency code in 3 characters ISO format
 * @prop {number | undefined} transactionId: Id of the payment transaction
 * @prop {string | undefined} paymentMethodKey: Key identifier of the payment method type id
 * @prop {string | undefined} sellerAccountNumber: Account number of the merchant
 * @prop {string | undefined} parentAccountNumber: A string representing the account number
 * @prop {number | undefined} pagination: Numbers of ligne in reporting. Limited to 100.
 * @prop {number | undefined} offset?: Start response line. Set to 0 when not indicated.
 */
interface ListOperationOptions extends ListingOptions {
  /** Begin date of operation reporting in YYYYMMDDHHMMSS format */
  startDate?: string;
  /** Ended Date of operation Reporting in YYYYMMDDHHMMSS format */
  endDate?: string;
  maxAmount?: number;
  minAmount?: number;
  /** Marketplace reference for this order */
  orderReference?: string;
  /** Currency code in 3 characters ISO format */
  currency?: string;
  /** Id of the payment transaction */
  transactionId?: number;
  /** Key identifier of the payment method type id */
  paymentMethodKey?: string;
  /** Account number of the merchant */
  sellerAccountNumber?: string;
  /** A string representing the account number */
  parentAccountNumber?: string;
}

interface ListOperationResponse extends ListingResponse {
  /** The operation list */
  operationList: Operation[];
}

export { ListOperationOptions, ListOperationResponse };
