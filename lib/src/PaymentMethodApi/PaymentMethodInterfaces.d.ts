import Alias from '../models/Alias';
import Payer from '../models/Payer';
import Amount from '../models/Amount';
import PaymentMethod from '../models/PaymentMethod';
/**
 * @prop {PaymentMethod}      transPaymentMethod: Payment method information
 * @prop {Payer}              payer: Payer's details
 * @prop {Alias}              alias: Alias details
 */
interface RemoveAliasOptions {
    /** Payment method information */
    transPaymentMethod: PaymentMethod;
    /** Payer's details */
    payer: Payer;
    /** Alias details */
    alias: Alias;
}
/**
 * @prop {Payer}              payer: Payer's details
 * @prop {PaymentMethod | undefined}      transPaymentMethod: Payment method information
 */
interface GetAliasOptions {
    /** Payer's details */
    payer: Payer;
    /** Payment method information */
    transPaymentMethod?: PaymentMethod;
}
/**
 * @prop {Array<PaymentMethod>}      paymentMethodList: List of payment methods with their alias lists
 */
interface PaymentMethodListResponse {
    /** A list of payment methods. Each payment method contains an alias list */
    paymentMethodList: Array<PaymentMethod>;
}
/**
 * @prop {string}   countryCode: Alpha 3 iso code
 * @prop {Amount}   amount: Amount and currency of the transaction
 * @prop {Payer}    payer: Payer's details
 */
interface PaymentMethodListOptions {
    /** Alpha 3 iso code */
    countryCode: string;
    /** Amount and currency of the transaction */
    amount: Amount;
    /** Payer's details */
    payer: Payer;
}
/**
 * @prop {string}   holder
 * @prop {string}   bic
 * @prop {string}   iban
 */
interface GetIbanResponse {
    /** */
    holder: string;
    /** */
    bic: string;
    /** */
    iban: string;
}
export { RemoveAliasOptions, GetAliasOptions, PaymentMethodListOptions, PaymentMethodListResponse, GetIbanResponse };
