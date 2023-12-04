import Amount from "../models/Amount";
import Payer from "../models/Payer";
import PaymentMethod from "../models/PaymentMethod";
import { PaymentMethodSimple } from "../models/PaymentMethodSimple";
import Alias from "../models/Alias";
/**
 * @prop {string} countryCode
 * @prop {Amount} amount
 * @prop {Payer} payer
 */
interface ListPaymentMethodsOptions {
    countryCode: string;
    amount: Amount;
    payer?: Payer;
}
/**
 * @prop {Array<PaymentMethod>} paymentMethodList
 */
interface ListPaymentMethodsResponse {
    paymentMethodList?: Array<PaymentMethod>;
    resultCodeMessage?: string;
}
/**
 * @prop {Payer} payer
 * @prop {PaymentMethodSimple} transPaymentMethod
 */
interface GetAliasesOptions {
    payer: Payer;
    transPaymentMethod?: PaymentMethodSimple;
}
/**
 * Available Payment Method Aliases corresponding to criteria
 * @prop {string} resultCode
 * @prop {Array<PaymentMethod>} paymentMethodList
 */
interface GetAliasesResponse {
    paymentMethodList?: Array<PaymentMethod>;
}
/**
 * @prop {Payer} payer
 * @prop {Alias} alias
 * @prop {PaymentMethodSimple} transPaymentMethod
 */
interface RemoveAliasOptions {
    payer: Payer;
    alias: Alias;
    transPaymentMethod: PaymentMethodSimple;
}
export { ListPaymentMethodsOptions, ListPaymentMethodsResponse, GetAliasesOptions, GetAliasesResponse, RemoveAliasOptions, };
