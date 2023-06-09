import ApiRest from "../../utils/apiRest";
import { InitSelfcareOptions, InitSelfcareResponse } from "./SelfcareApiInterfaces";
export default class SelfcareApi extends ApiRest {
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
    init(options: InitSelfcareOptions): Promise<InitSelfcareResponse>;
}
