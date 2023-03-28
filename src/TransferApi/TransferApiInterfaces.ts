import Amount from "../models/Amount";

/**
 * @prop {string} accountCptNumber - A string representing the account number.
 * @prop {Amount} transferAmount - The transfer amount.
 * @prop {string} accountNumber - A string representing the account number.
 * @prop {string | undefined} orderRef - Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space.
 * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
 * @prop {string} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
 */
interface CreateTransferOptions {
  /** A string representing the account number. Account number to credit. */
  accountCptNumber: string;
  /** The transfer amount. */
  transferAmount: Amount;
  /** A string representing the account number. Account number to debit. */
  accountNumber: string;
  /** Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space. */
  orderRef?: string;
  /** JSON data for the marketplace. This data is not used by payment system. */
  metaData?: object;
  /** Operation label transmitted in payment system. Maximum length of 140 characters. */
  reason: string;
}

export { CreateTransferOptions };
