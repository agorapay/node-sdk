import ApiRest from '../../utils/apiRest';
import { CreateMandateOptions, CreateMandateResponse, UpdateMandateOptions } from './MandateInterfaces';
declare class MandateApi extends ApiRest {
    /**
     * @description Generate a new direct debit mandate without payment.
     * @param {CreateMandateOptions} options mandate creation options.
     * @prop {PaymentMethod}      transPaymentMethod: Payment method information
     * @prop {Payer}              payer: Payer's details
     * @prop {string | undefined} firstName
     * @prop {string | undefined} lastName
     * @prop {string | undefined} address: Road name and number
     * @prop {string | undefined} city
     * @prop {string | undefined} postalCode
     * @prop {string | undefined} country: Country in 3 letters ISO format
     * @prop {string | undefined} iban
     * @prop {string | undefined} email
     * @prop {string | undefined} state
     * @prop {string | undefined} gender
     * @prop {string | undefined} phoneNumber
     * @prop {PaymentSequence | undefined} sequence: For payment method with mandate, the sequence is FRST for first use of recurrent mandate, RCUR for use of recurrent mandate, FNAL for last use of recurrent mandate, OOFF for a mandate used only one time
     * @prop {string | undefined} reference: For payment with mandate, this field is the reference to the mandate for sequence RCUR or LAST. For payment with card, this field is the transactionId of the first authorization transaction
     * @prop {string | undefined} socialReason: Compagny name
     * @prop {string | undefined} address2: Additional address
     * @prop {string | undefined} urlRedirect: Url where the customer must be redirected at the end of the payment with the partner. This URL is completed by /success, /error or /cancel according to the partner response status. When the customer will be redirected to the marketPlace at the end of the partner payment process, the paymentDetails function must be called to terminate payment with the data transmitted by the partner. For development purpose, you can use http:\/\/127.0.0.1 (localhost is not supported)
     * @prop {OTP | undefined} otp: Force signature by OTP
     * @returns {CreateMandateResponse}  New direct debit mandate generation response. If ok, either reference (UMR) or mandateId (withour UMR) should be present.
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
    createPayout(options: CreateMandateOptions): Promise<CreateMandateResponse>;
    /**
    * @description "Update existing SEPA Direct Debit mandate with information like Unique Mandate Reference (UMR).
    * @param {UpdateMandateOptions} options mandate update options.
    * @prop {string} reference: Unique Mandate Reference (UMR) value to be added on the mandate
    * @prop {string} mandateId: Identifier for the mandate to update
    * @example
    * ````javascript
      payoutApi.updatePayout({
        reference: "2020110907201100Y0H1102",
        mandateId: "5120"
      }).then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
    * ````
    */
    updateMandate(options: UpdateMandateOptions): Promise<null>;
}
export default MandateApi;
