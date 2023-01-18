import ApiRest from "../../utils/ApiRest";
import { CreateTransferOptions } from "./TransferApiInterfaces";

export default class TransferApi extends ApiRest {
  /**
   * Ask for a transfer between two accounts.
   * @description submit a transfer from one account (accountNumber) to another (accountCtpNumber).
   * @param {CreateTransferOptions} options transfer creation options.
   * @prop {string} accountCptNumber - A string representing the account number.
   * @prop {Amount} transferAmount - The transfer amount.
   * @prop {string} accountNumber - A string representing the account number.
   * @prop {string | undefined} orderRef - Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space.
   * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
   * @prop {string} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
   * @returns {number} The transfer transaction Id.
   * @example
   * ````javascript
   payoutApi.createPayout({
      endToEndId: "1",
      accountNumber: "12345678",
      paymentMethodAlias: "12334566",
      payoutAmount: new Amount(10000, "EUR")
    }).then(resp => {
      console.log(resp)
    }).catch(error => {
      console.log(error)
    })
   * ````
   */
  createTransfer(options: CreateTransferOptions): Promise<number> {
    return this.sendToApiPost<{ transactionId: number }>("/transfer/create", options)
      .then(result => result.transactionId);
  }
}
