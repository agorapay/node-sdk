"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
class PayoutApi extends apiRest_1.default {
    /**
     * Ask for a payout.
     * @description Submit a payout for a specific account.
     * @param {CreatePayoutOptions} options payout creation options.
     * @prop {string | undefined} endToEndId - Use to identify transaction in SEPA transfer.
     * @prop {Amount} payoutAmount - The payout amount.
     * @prop {string} paymentMethodAlias - Alias for the payment method.
     * @prop {string} accountNumber - A string representing the account number.
     * @prop {Commission | undefined} commission - The payout commission.
     * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
     * @prop {string | undefined} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
     * @returns {number} The payout transaction Id.
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
    async createPayout(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/payout/create', options).then((resp) => {
                if (+resp.resultCode === 0)
                    success(resp.transactionId);
                else
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
            });
        });
    }
}
exports.default = PayoutApi;
