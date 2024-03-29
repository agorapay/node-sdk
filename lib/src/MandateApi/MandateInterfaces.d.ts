import { PaymentSequence, OTP } from '../../utils/enums';
import Payer from '../models/Payer';
import PaymentMethod from '../models/PaymentMethod';
/**
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
 */
interface CreateMandateOptions {
    /** Payment method information */
    transPaymentMethod: PaymentMethod;
    /** Payer's details */
    payer: Payer;
    /** */
    firstName?: string;
    /** */
    lastName?: string;
    /** Road name and number */
    address?: string;
    /** */
    city?: string;
    /** */
    postalCode?: string;
    /** Country in 3 letters ISO format */
    country?: string;
    /** */
    iban?: string;
    /** */
    email?: string;
    /** */
    state?: string;
    /** */
    gender?: string;
    /** */
    phoneNumber?: string;
    /** For payment method with mandate, the sequence is */
    sequence?: PaymentSequence;
    /** For payment with mandate, this field is the reference to the mandate for sequence RCUR or LAST. For payment with card, this field is the transactionId of the first authorization transaction */
    reference?: string;
    /** Compagny name */
    socialReason?: string;
    /** Additional address */
    address2?: string;
    /** Url where the customer must be redirected at the end of the payment with the partner. This URL is completed by /success, /error or /cancel according to the partner response status. When the customer will be redirected to the marketPlace at the end of the partner payment process, the paymentDetails function must be called to terminate payment with the data transmitted by the partner. For development purpose, you can use http://127.0.0.1 (localhost is not supported) */
    urlRedirect?: string;
    /**Force signature by OTP */
    otp?: OTP;
}
/**
 * @prop {string | undefined} reference
 * @prop {string | undefined} mndtId
 */
interface CreateMandateResponse {
    /** Should be present if the Unique Mandate Reference (UMR) is set*/
    reference?: string;
    /** Mandate identifier, should be present if the Unique Mandate Reference (UMR) is not set yet (field reference is absent) */
    mandateId?: string;
}
/**
 * @prop {string} reference
 * @prop {string} mandateId
 */
interface UpdateMandateOptions {
    /** Unique Mandate Reference (UMR) value to be added on the mandate */
    reference: string;
    /** Identifier for the mandate to update */
    mandateId: string;
}
export { CreateMandateOptions, CreateMandateResponse, UpdateMandateOptions };
