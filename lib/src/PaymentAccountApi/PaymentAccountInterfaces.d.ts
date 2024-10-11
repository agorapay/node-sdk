import { FileType, PaymentMethodKey, PayoutAutoFrequency, IbanPaymentMethodKey } from '../../utils/enums';
import ListingOptions from '../models/ListingOptions';
import ListingResponse from '../models/ListingResponse';
import PaymentAccount from '../models/PaymentAccount';
/**
 * @prop {string | undefined} accountNumber
 * @prop {string | undefined} currency
 * @prop {string | undefined} accountStatus
 * @prop {string | undefined} sellerReference
 */
interface PaymentAccountListOptions extends ListingOptions {
    /** A string representing the account number. */
    accountNumber?: string;
    /** Currency code in 3 characters ISO format. */
    currency?: string;
    /** The status os the account. */
    accountStatus?: string;
    /** Account reference. */
    sellerReference?: string;
}
/**
 * @prop {string | undefined} accountNumber
 * @prop {string | undefined} currency
 * @prop {string | undefined} accountStatus
 * @prop {string | undefined} sellerReference
 */
interface PaymentAccountListResponse extends ListingResponse {
    /** The list of payment account */
    paymentAccountList: Array<PaymentAccount>;
}
/**
 * @prop {string} accountNumber
 * @prop {number} amount
 * @prop {PaymentMethodKey} paymentMethodKey
 * @prop {string} currency
 */
interface PaymentAccountCreditOptions {
    /** A string representing the account number. */
    accountNumber: string;
    /** Recharge amount. */
    amount: number;
    /** Key identifier of the payment method type id. */
    paymentMethodKey: PaymentMethodKey;
    /** Currency code in 3 characters ISO format. */
    currency: string;
}
interface PaymentAccountCreditResponse {
    /** Iban to make payment to for SCT or SWIFT method */
    virtualIban?: string;
    /** Id of the payment transaction. */
    transactionId?: string;
}
/**
 * @prop {string | undefined} accountNumber
 * @prop {number} amount
 * @prop {PayoutAutoFrequency} frequency
 * @prop {number | undefined} dayOfWeek
 * @prop {number | undefined} dayOfMonth
 * @prop {string} paymentMethodAlias
 */
interface PaymentAccountPayoutAutoOptions {
    /** A string representing the account number. */
    accountNumber?: string;
    /** Recharge amount. */
    amount: number;
    /**  */
    frequency: PayoutAutoFrequency;
    /** Between 0 and 6  */
    dayOfWeek?: number;
    /** between 1 et 31 */
    dayOfMonth?: number;
    /** Alias for the payment method. */
    paymentMethodAlias: string;
}
/**
 * @prop {string | undefined} accountNumber
 * @prop {string | undefined} firstName
 * @prop {string | undefined} lastName
 * @prop {string | undefined} socialReason
 * @prop {string} address
 * @prop {string} city
 * @prop {string} postalCode
 * @prop {string} country
 * @prop {FileType} fileType
 * @prop {string} fileContent
 * @prop {string} iban
 * @prop {string} currency
 * @prop {string | undefined} paymentMethodAlias
 * @prop {IbanPaymentMethodKey | undefined} paymentMethodKey
 */
interface PaymentAccountSetIBANOptions {
    /** A string representing the account number. */
    accountNumber?: string;
    /** The first name of the IBAN account's owner. */
    firstName?: string;
    /** The last name of the IBAN account's owner. */
    lastName?: string;
    /** The name of the IBAN account's owner if compagny. */
    socialReason?: string;
    /** The road name and number of the IBAN account's owner. */
    address: string;
    /** The city of the IBAN account's owner. */
    city: string;
    /** The postal code of the IBAN account's owner. */
    postalCode: string;
    /** The country code (in 3 letter format) of the IBAN account's owner. */
    country: string;
    /** Type of the file contening the proof document. */
    fileType: FileType;
    /** The content of the file contening the proof in base64 encoding format. */
    fileContent: string;
    /** The new IBAN */
    iban: string;
    /** Currency code in 3 characters ISO format. */
    currency: string;
    /** Current payment method alias to update. If not provided a new payment method is added. */
    paymentMethodAlias?: string;
    /** Type of payment method
     * - SCT
     * - SCT INST */
    paymentMethodKey?: IbanPaymentMethodKey;
}
interface PaymentAccountSetIBANResponse {
    /** ID to identify processing request. */
    requestId?: string;
    /** Alias for the payment method */
    paymentMathodAlias?: string;
}
export { PaymentAccountListOptions, PaymentAccountListResponse, PaymentAccountCreditOptions, PaymentAccountCreditResponse, PaymentAccountPayoutAutoOptions, PaymentAccountSetIBANOptions, PaymentAccountSetIBANResponse };
