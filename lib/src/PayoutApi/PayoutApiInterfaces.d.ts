import Amount from "../models/Amount";
import Commission from "../models/Commission";
/**
 * @prop {string | undefined} endToEndId - Use to identify transaction in SEPA transfer.
 * @prop {Amount} payoutAmount - The payout amount.
 * @prop {string} paymentMethodAlias - Alias for the payment method.
 * @prop {string} accountNumber - A string representing the account number.
 * @prop {Commission | undefined} commission - The payout commission.
 * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
 * @prop {string | undefined} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
 */
interface CreatePayoutOptions {
    /** Use to identify transaction in SEPA transfer. */
    endToEndId?: string;
    /** The payout amount. */
    payoutAmount: Amount;
    /** Alias for the payment method. */
    paymentMethodAlias: string;
    /** A string representing the account number. */
    accountNumber: string;
    /** The payout commission. */
    commission?: Commission;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: string;
    /** Operation label transmitted in payment system. Maximum length of 140 characters. */
    reason?: string;
}
export { CreatePayoutOptions };
