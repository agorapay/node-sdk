"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
class SelfcareApi extends apiRest_1.default {
    /**
     * Register Selfcare enrollment informations in request.
     * @description Submit a payout for a specific account.
     * @param {CreatePayoutOptions} options payout creation options.
     * @prop {string} firstName - Seller first name
     * @prop {string} lastName - Seller last name
     * @prop {string} email -
     * @prop {string} phone - Seller phone number
     * @prop {string} socialReason - Seller social reason
     * @prop {string} accountFloorLimit - Seller floor limit amount. The value of the amount in decimal with max 2 digits after separator. Only digits and dot are authorized.
     * @prop {string} language - The first two characters are used to identify the language code. Must be in upper case. Only french is supported at this time.
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
    async init(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/selfcare/init', options).then((resp) => {
                if (+resp.resultCode === 0)
                    success({ requestId: resp.requestId, statusLabel: resp.statusLabel });
                else
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
            });
        });
    }
}
exports.default = SelfcareApi;
