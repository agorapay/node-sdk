import Alias from "../models/Alias";
import Amount from "../models/Amount";
import Breakdown from "../models/Breakdown";
import Cart from "../models/Cart";
import Payer from "../models/Payer";
import PaymentMethod from "../models/PaymentMethod";
import { CbChallenge, OrderStatus, PaymentSequence, PaymentOptions, PageOption } from "../../utils/enums";
import Transaction from "../models/Transaction";
/**
 * @prop {string} transPaymentMethod
 * @prop {number} orderId
 * @prop {string | undefined} orderReference
 * @prop {string | undefined} orderCountryCode
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {object | undefined} metaData
 * @prop {Payer | undefined} payer
 * @prop {PaymentDetails | undefined} details
 * @prop {string | undefined} capture
 * @prop {Amount} transactionAmount
 * @prop {string} urlRedirect
 * @prop {string | undefined} registerAlias
 * @prop {string | undefined} reason
 * @prop {string | undefined} endToEndId
 * @prop {Cart | undefined} cart
 * @prop {string | undefined} operationDate
 * @prop {CbChallenge | undefined} cbChallenge
 * @prop {paymentOptions | undefined} paymentOptions
 */
interface PaymentOptionsWithOrderId {
    transPaymentMethod: string;
    /** Order id obtained in order creation and to provide in each next request */
    orderId: string;
    /** Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space. */
    orderReference?: string;
    /** The ISO country code in 3 characters format. */
    orderCountryCode?: string;
    /** List of breakdown for this payment. */
    breakdownList?: Array<Breakdown>;
    alias?: Alias;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
    payer?: Payer;
    /** Payment details information For some payment methods, additional details are needed. */
    details?: PaymentDetails;
    /** @example Set to "0" for authorization only (default value)) */
    capture?: string;
    transactionAmount: Amount;
    /** Url where the client must be redirected at the end of the payment with the partner. This URL is completed by success, error or cancel according to the partner response status
     *
     *  When client will be redirect to the marcketPlace at the end of the partner payment process, the paymentDetails function must be called to terminate payment with the data transmitted by the partner.
     */
    urlRedirect: string;
    /** When set to "1" or "Y", an alias will be registered when the payment will be completed, if possible. If not present or equal to "0" ou "N", no alias is registered. */
    registerAlias?: string;
    /** Operation label transmitted in payment system. Maximum length of 140 characters. */
    reason?: string;
    /** Use to identify transaction in SEPA transfer. */
    endToEndId?: string;
    /** Cart detail for 3DSV2. Mandatory in API v2. */
    cart?: Cart;
    /** Date of the operation. The format must be YYYYMMDD. */
    operationDate?: string;
    /**  */
    cbChallenge?: CbChallenge;
    /**  */
    paymentOptions?: PaymentOptions;
}
/**
 * @prop {string} transPaymentMethod
 * @prop {string} orderReference
 * @prop {string} orderCountryCode
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {object | undefined} metaData
 * @prop {Payer} payer
 * @prop {PaymentDetails | undefined} details
 * @prop {string | undefined} capture
 * @prop {Amount} transactionAmount
 * @prop {string} urlRedirect
 * @prop {string | undefined} registerAlias
 * @prop {string | undefined} reason
 * @prop {string | undefined} endToEndId
 * @prop {Cart | undefined} cart
 * @prop {string | undefined} operationDate
 * @prop {CbChallenge | undefined} cbChallenge
 * @prop {paymentOptions | undefined} paymentOptions
 */
interface PaymentOptionsWithoutOrderId {
    transPaymentMethod: string;
    /** Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space. */
    orderReference: string;
    /** The ISO country code in 3 characters format. */
    orderCountryCode: string;
    /** List of breakdown for this payment. */
    breakdownList?: Array<Breakdown>;
    alias?: Alias;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
    payer: Payer;
    /** Payment details information For some payment methods, additional details are needed. */
    details?: PaymentDetails;
    /** @example Set to "0" for authorization only (default value)) */
    capture?: string;
    transactionAmount: Amount;
    /** Url where the client must be redirected at the end of the payment with the partner. This URL is completed by success, error or cancel according to the partner response status
     *
     *  When client will be redirect to the marcketPlace at the end of the partner payment process, the paymentDetails function must be called to terminate payment with the data transmitted by the partner.
     */
    urlRedirect: string;
    /** When set to "1" or "Y", an alias will be registered when the payment will be completed, if possible. If not present or equal to "0" ou "N", no alias is registered. */
    registerAlias?: string;
    /** Operation label transmitted in payment system. Maximum length of 140 characters. */
    reason?: string;
    /** Use to identify transaction in SEPA transfer. */
    endToEndId?: string;
    /** Cart detail for 3DSV2. Mandatory in API v2. */
    cart?: Cart;
    /** Date of the operation. The format must be YYYYMMDD. */
    operationDate?: string;
    /**  */
    cbChallenge?: CbChallenge;
    /**  */
    paymentOptions?: PaymentOptions;
}
/**
 * @prop {string | undefined} firstName
 * @prop {string | undefined} lastName
 * @prop {string | undefined} address
 * @prop {string | undefined} city
 * @prop {string | undefined} postalCode
 * @prop {string | undefined} country
 * @prop {string | undefined} iban
 * @prop {string | undefined} email
 * @prop {string | undefined} state
 * @prop {string | undefined} gender
 * @prop {string | undefined} phoneNumber
 * @prop {PaymentSequence | undefined} sequence
 * @prop {string | undefined} reference
 * @prop {string | undefined} socialReason
 * @prop {string | undefined} address2
 */
interface PaymentDetails {
    firstName?: string;
    lastName?: string;
    /** Road name and number */
    address?: string;
    city?: string;
    postalCode?: string;
    /** Country in 3 letters ISO format */
    country?: string;
    iban?: string;
    email?: string;
    state?: string;
    gender?: string;
    phoneNumber?: string;
    /** For payment method with mandate, the sequence is */
    sequence?: PaymentSequence;
    /** For payment with mandate, this field is the reference to the mandate for sequence RCUR or LAST. For payment with card, this field is the transactionId of the first authorization transaction */
    reference?: string;
    /** Compagny name */
    socialReason?: string;
    /** Additional address */
    address2?: string;
}
/**
 * @prop {object | undefined} metaData
 * @prop {number} orderId
 * @prop {string | undefined} paymentData
 */
interface PaymentDetailsOptions {
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
    /** Order id obtained in order creation and to provide in each next request. */
    orderId: string;
    /** Specific data for a payment method. */
    paymentData?: string;
}
/**
 * @prop {string} orderReference
 * @prop {string} orderCountryCode
 * @prop {Amount} amount
 * @prop {Payer} payer
 * @prop {object | undefined} metaData
 */
interface PaymentMethodOptions {
    /** Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space. */
    orderReference: string;
    /** The ISO country code in 3 characters format. */
    orderCountryCode: string;
    /** */
    amount: Amount;
    /** */
    payer: Payer;
    /** this field can be used by marcketplace to store any data in JSON format. */
    metaData?: object;
}
/**
 * @prop {Array<PaymentMethod> | undefined} paymentMethodList
 * @prop {number | undefined} orderId
 */
interface PaymentMethodResponse {
    paymentMethodList?: Array<PaymentMethod>;
    orderId?: string;
}
/**
 * @prop {number} orderId
 * @prop {Amount} transactionAmount
 * @prop {object | undefined} metaData
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {string | undefined} transactionId
 */
interface CaptureOptions {
    /** Order id obtained in order creation and to provide in each next request. */
    orderId: string;
    /**  */
    transactionAmount: Amount;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
    /**  */
    breakdownList?: Array<Breakdown>;
    /** Id of the payment transaction.. */
    transactionId?: string;
}
/**
 * @prop {OrderStatus} orderStatus
 * @prop {Array<Transaction>} transactionList
 * @prop {number} orderId
 */
interface CaptureResponse {
    /** */
    orderStatus: OrderStatus;
    /** List of the order transactions. */
    transactionList: Array<Transaction>;
    /** Order id obtained in order creation and to provide in each next request. */
    orderId: string;
}
/**
 * @prop {number} orderId
 * @prop {string | undefined} transactionId
 * @prop {object | undefined} metaData
 */
interface CancelOptions {
    /** Order id obtained in order creation and to provide in each next request. */
    orderId: string;
    /** Id of the payment transaction. */
    transactionId?: string;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
}
/**
 * @prop {OrderStatus | undefined} orderStatus
 * @prop {Array<Transaction> | undefined} transactionList
 * @prop {number | undefined} orderId
 */
interface CancelResponse {
    /** */
    orderStatus?: OrderStatus;
    /** List of the order transactions. */
    transactionList?: Array<Transaction>;
    /** */
    orderId?: number;
}
/**
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {object | undefined} metaData
 * @prop {Amount | undefined} adjustAmount
 * @prop {number | undefined} orderId
 * @prop {number | undefined} transactionId
 */
interface AdjustPaymentOptions {
    /** */
    breakdownList?: Array<Breakdown>;
    /** */
    metaData?: object;
    /** */
    adjustAmount?: Amount;
    /** Order id obtained in order creation and to provide in each next request. */
    orderId?: string;
    /** */
    transactionId?: number;
}
/**
 * @prop {string} orderReference
 * @prop {string} orderCountryCode
 * @prop {Amount} amount
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {Payer} payer
 * @prop {string | undefined} capture
 * @prop {object | undefined} metaData
 * @prop {string | undefined} recurrent
 * @prop {string | undefined} endToEndId
 * @prop {string | undefined} paymentMethodId
 * @prop {string | undefined} urlRedirect
 * @prop {Cart | undefined} cart
 * @prop {string | undefined} paymentAccount
 * @prop {string | undefined} cbChallenge
 * @prop {string | undefined} details
 * @prop {string | undefined} page
 * @prop {PaymentDetails | undefined} details
 * @prop {PageOption | undefined} page
 * @prop {PaymentOptions | undefined} paymentOptions
 * @prop {string | undefined} reason
 */
interface PaymentIFrameOptions {
    /** Marketplace reference for this order */
    orderReference: string;
    /** The ISO country code in 3 characters format */
    orderCountryCode: string;
    /**  */
    amount: Amount;
    /**  */
    breakdownList?: Array<Breakdown>;
    /**  */
    payer: Payer;
    /**
     * Capture indicator. Set to "0" for authorization only (default value 1 - transaction captured))
     */
    capture?: string;
    /**  */
    metaData?: object;
    /**
     * "1" for recurrent payment "0" or absent if not a recurrent payment
     */
    recurrent?: string;
    /**
     * Use to identify transaction in SEPA transfer
     */
    endToEndId?: string;
    /**
     * Identifier of the payment method. If given, the end-user will be redirected to the corresponding payment method iFrame.
     * If not given, the end-user will be redirected to the payment method selection iFrame.
     */
    paymentMethodId?: string;
    /**
     * Url where the client must be redirected at the end of the payment with the partner.
     * This URL is completed by /success, /error or /cancel according to the partner response status.
     * When the customer will be redirected to the marketPlace at the end of the partner payment process,
     * the paymentDetails function must be called to terminate payment with the data transmitted by the partner.
     *
     * @remarks For development purpose, you can use http://127.0.0.1 (localhost is not supported)
     */
    urlRedirect?: string;
    /** */
    cart?: Cart;
    paymentAccount?: string;
    /**
     * Challenge negotiation for card payment.
     * 01: No preference
     * 02: No challenge required
     * 03: Desired challenge
     * 04: Required challenge
     */
    cbChallenge?: "01" | "02" | "03" | "04";
    /**
     * Payment details information For some payment methods, additional details are needed.
     */
    details?: PaymentDetails;
    /**
     * Type of page to display.
     * - iframe: integrated in marketplace site (default)
     * - full: full page
     */
    page?: PageOption;
    /** */
    paymentOptions?: PaymentOptions;
    /** Operation label transmitted in payment system. Maximum length of 140 characters. */
    reason?: string;
}
/**
 * @prop {number} orderId
 * @prop {string} authenticationCode
 * @prop {string | undefined} site
 * @prop {string | undefined} url
 * @prop {number} resultCode
 */
interface PaymentIFrameResponse {
    /**  */
    orderId: string;
    /** Authentification Code to use to open user iframe. */
    authenticationCode: string;
    /** Site name or number. */
    site?: string;
    /** Url to connect iframe to. */
    url?: string;
    /** */
    resultCode: number;
}
/**
 * @prop {number} orderId
 * @prop {Amount} transactionAmount
 * @prop {string | undefined} transactionId
 * @prop {object} metaData
 * @prop {string | undefined} reason
 * @prop {Array<Breakdown> | undefined} breakdownList
 * @prop {string} orderReference
 * @prop {Payer } payer
 */
interface RefundOptions {
    /** Order id obtained in order creation and to provide in each next request. */
    orderId: string;
    /**  */
    transactionAmount: Amount;
    /** Id of the payment transaction. */
    transactionId?: string;
    /** JSON data for the marketplace. This data is not used by payment system. */
    metaData?: object;
    /** Operation label transmited in payment system. */
    reason?: string;
    /** */
    breakdownList?: Array<Breakdown>;
    /** Marketplace reference for this order. */
    orderReference: string;
    /** */
    payer: Payer;
}
/**
 * @prop {OrderStatus | undefined} orderStatus
 * @prop {Array<Transaction> | undefined} transactionList
 * @prop {number | undefined} orderId
 */
interface RefundResponse {
    /**
     * Status of an order. the following status can be provided:
     * * `created`: The order is created
     * * `pending_payment`: Payment in progress
     * * `complete`: Payment is completed
     * * `partial_complete`: Payment is completed but all order amount is not payed
     * * `canceled`: The order is canceled
     */
    orderStatus?: OrderStatus;
    /**  */
    transactionList?: Array<Transaction>;
    /** Order id obtained in order creation and to provide in each next request. */
    orderId?: string;
}
export { PaymentOptionsWithOrderId, PaymentOptionsWithoutOrderId, PaymentDetailsOptions, PaymentMethodOptions, PaymentMethodResponse, CaptureOptions, CaptureResponse, CancelOptions, CancelResponse, AdjustPaymentOptions, PaymentIFrameOptions, PaymentIFrameResponse, RefundOptions, RefundResponse };
