import ApiRest from "../../utils/ApiRest";
import { OrderStatus, TicketFormat, TicketType } from "../../utils/enums";
import OrderDetails from "../models/OrderDetails";
import Payment from "../models/Payment";
import PaymentMethod from "../models/PaymentMethod";
import SignedMandateFile from "../models/SignedMandateFile";
import Ticket from "../models/Ticket";
import Transaction from "../models/Transaction";
import {
  AdjustPaymentOptions,
  CancelOptions,
  CancelResponse,
  CaptureOptions,
  CaptureResponse,
  PaymentDetailsOptions,
  PaymentIFrameOptions,
  PaymentIFrameResponse,
  PaymentMethodOptions,
  PaymentMethodResponse,
  PaymentOptionsWithOrderId,
  PaymentOptionsWithoutOrderId,
  RefundOptions,
  RefundResponse
} from "./PayinInterfaces";
import Utils from "../../utils/Utils";

export default class PayinApi extends ApiRest {
  /**
   * Submit a payment.
   * @description When your shopper choose a payment method, this call submit the choice and any data if already given. The return can be final, (transaction completed) or ask to authentification details, or redirect the shopper to PSP or 3DS pages.
   * @param {PaymentOptionsWithOrderId | PaymentOptionsWithoutOrderId} options Payment options.
   * @prop {PaymentMethod | undefined} transPaymentMethod
   * @prop {number} orderId
   * @prop {string | undefined} orderReference
   * @prop {string} orderCountryCode
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
   *
   * OR
   *
   * @prop {PaymentMethod | undefined} transPaymentMethod
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
   *
   * @returns {Payment} The created payment.
   * @example
   * ````javascript
   *payinApi.payment({
   *   transactionAmount: new Amount(100, 'EUR'),
   *   breakdownList: [
   *     new Breakdown(new Amount(100, "EUR"), "124356789", "Test", new Commission(new Amount(50, "EUR"), "124356789"))
   *   ],
   *   payer: new Payer("testPayer", "192.168.0.1", undefined, "FR"),
   *   orderCountryCode: "FRA",
   *   urlRedirect: "http://google.fr",
   *   transPaymentMethod: new PaymentMethod("4", undefined, undefined, PaymentMethodType.SepaCreditTransfer),
   *   orderReference: "OrderTestPayin"
   * }).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  payment(options: PaymentOptionsWithOrderId | PaymentOptionsWithoutOrderId): Promise<Payment> {
    const args = Object.assign({});
    if (options.transPaymentMethod) {
      args.transPaymentMethod = { id: options.transPaymentMethod };
    }

    return this.sendToApiPost<Payment>("/payin/payment", Object.assign(options, args))
      .then(result => new Payment(result));
  }

  /**
   * Submit additionnal Payment details.
   * @description The call send the last mandatory data to finalize the payment.
   * @param {PaymentDetailsOptions} options Payment options.
   * @prop {object | undefined} metaData
   * @prop {number} orderId
   * @prop {string | undefined} paymentData
   * @returns {Payment} The updated payment.
   * @example
   * ````javascript
   *payinApi..paymentDetails({
   *  orderId: "13456",
   *  paymentData: "data ..."
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  paymentDetails(options: PaymentDetailsOptions): Promise<Payment> {
    return this.sendToApiPost<Payment>("/payin/paymentDetails", options)
      .then(result => new Payment(result));
  }

  /**
   * Submit an order/Get payment methods.
   * @description When your shopper is ready to pay, submit an order and get a list of the available payment methods and alias. The list is based on the shopper country and the order amount and currency. This is the first call to use when going on a payment operation. The next call should be /payment.
   * @param {PaymentMethodOptions} options.
   * @prop {string} orderReference
   * @prop {string} orderCountryCode
   * @prop {Amount} amount
   * @prop {Payer} payer
   * @prop {object | undefined} metaData
   * @returns {PaymentMethodResponse} The payment method list and the order id.
   * @example
   * ````javascript
   *payinApi.paymentMethods({
   *  amount: new Amount(100, "EUR"),
   *  orderCountryCode: "FRA",
   *  orderReference: "OrderTestPayin",
   *  payer: new Payer("PayerTest", "192.168.0.1", undefined, "FR")
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  paymentMethods(options: PaymentMethodOptions): Promise<PaymentMethodResponse> {
    return this.sendToApiPost<PaymentMethodResponse>("/payin/paymentMethods", options)
      .then(result => ({
        paymentMethodList: result.paymentMethodList?.map(method => new PaymentMethod(method.id, method.aliasList, method.label, method.type)) ?? undefined,
        orderId: result.orderId
      }));
  }

  /**
   * Capture a Transaction/Order.
   * @description Capture a payment transaction or all the capturable payment transactions of an order.
   * @param {CaptureOptions} options.
   * @prop {number} orderId
   * @prop {Amount} transactionAmount
   * @prop {object | undefined} metaData
   * @prop {Array<Breakdown> | undefined} breakdownList
   * @prop {string | undefined} transactionId
   * @returns {CaptureResponse}
   * @example
   * ````javascript
   *payinApi.capture({
   *  orderId: "13456",
   *  transactionAmount: new Amount(1000.20, "EUR"),
   *  breakdownList: [
   *    new Breakdown(new Amount(1000, "EUR"), "124356789", "bdl1", new Commission(1.01, "EUR", "124356789"))
   *  ]
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  capture(options: CaptureOptions): Promise<CaptureResponse> {
    return this.sendToApiPost<CaptureResponse>("/payin/capture", options)
      .then(result => {
        const status = Utils.hasEnumOrDefault(result.orderStatus, OrderStatus, null);
        if (!result.orderId) {
          throw new Error("Missing required field: orderId");
        } else if (status === null) {
          throw new Error("Missing required field or invalid data: orderStatus");
        }

        return {
          orderStatus: status,
          transactionList: (result.transactionList ?? []).map((x: any) => new Transaction(x)),
          orderId: result.orderId
        };
      });
  }

  /**
   * Cancel a Transaction/Order.
   * @description Cancel a payment transaction or all the payment transactions of an order.
   * @param {CancelOptions} options.
   * @prop {number} orderId
   * @prop {string | undefined} transactionId
   * @prop {object | undefined} metaData
   * @returns {CancelResponse}
   * @example
   * ````javascript
   *payinApi.cancel({
   *  orderId: "13456"
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  cancel(options: CancelOptions): Promise<CancelResponse> {
    return this.sendToApiPost<CancelResponse>("/payin/cancel", options)
      .then(result => {
        const status = Utils.hasEnumOrDefault(result.orderStatus, OrderStatus, null);
        if (!result.orderId) {
          throw new Error("Missing required field: orderId");
        } else if (status === null) {
          throw new Error("Missing required field or invalid data: orderStatus");
        }

        return {
          orderStatus: Utils.hasEnumOrDefault(result.orderStatus, OrderStatus, undefined),
          transactionList: (result.transactionList ?? []).map((x: any) => new Transaction(x))
        };
      });
  }

  /**
   * Get all the order details.
   * @description Send back all the data of an order and its transactions.
   * @param {string} orderId id of the order.
   * @returns {OrderDetails} Order details.
   * @example
   * ````javascript
   *payinApi.orderDetails("123456").then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  orderDetails(orderId: number): Promise<OrderDetails> {
    return this.sendToApiGet<OrderDetails>("/payin/orderDetails", { orderId: orderId })
      .then(result => new OrderDetails(result));
  }

  /**
   * Adjust the amount of the payment or change the breakdown of the payment.
   * @description Before the cashing of the operation, change the payment amount and/or the breakdown If it's only a change in the breakdown, set the adjustAmount to the same of the transactionAmount.
   * @param {AdjustPaymentOptions} options.
   * @prop {Array<Breakdown> | undefined} breakdownList
   * @prop {object | undefined} metaData
   * @prop {Amount | undefined} adjustAmount
   * @prop {number} orderId
   * @example
   * ````javascript
   *payinApi.adjustPayment({
   *  orderId: "123456",
   *  adjustAmount: new Amount(100, "EUR")
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  adjustPayment(options: AdjustPaymentOptions): Promise<null> {
    return this.sendToApiPost<void>("/payin/adjustPayment", options)
      .then(() => null);
  }

  /**
   * Submit an Order for payment with iFrame.
   * @description When your shopper is ready to pay, submit your order/payment by this request and get an Authent Code. Then save the orderId and open an iframe for the shopper with the authentCode.
   * @param {PaymentIFrameOptions} options.
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
   * @prop {string | undefined} reason
   * @returns {PaymentIFrameResponse} authentificationCode and url
   * @example
   * ````javascript
   *payinApi.paymentIframe({
   *  orderReference: "ref_0102636",
   *  orderCountryCode: "FRA",
   *  amount: new Amount(100, "EUR"),
   *  payer: new Payer("customer1"),
   *  breakdownList: [
   *    new Breakdown(new Amount(100, "EUR"), "124356789", "ref1")
   *  ],
   *  capture: "1",
   *  metaData: JSON.stringify({"metaData": "sample data"})
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  paymentIframe(options: PaymentIFrameOptions): Promise<PaymentIFrameResponse> {
    return this.sendToApiPost<PaymentIFrameResponse>("/payin/paymentIframe", options)
      .then(result => {
        if (!result.orderId === undefined) {
          throw new Error("Missing required field: orderId");
        } else if (!result.authenticationCode) {
          throw new Error("Missing required field: authenticationCode");
        }

        return {
          authenticationCode: result.authenticationCode,
          orderId: result.orderId,
          site: result.site,
          url: result.url,
          resultCode: result.resultCode
        };
      });
  }

  /**
   * Refund a Transaction/Order.
   * @description Refund a payment transaction or all the refundable payment transactions of an order.
   * @param {RefundOptions} options.
   * @prop {number} orderId
   * @prop {Amount} transactionAmount
   * @prop {string | undefined} transactionId
   * @prop {object | undefined} metaData
   * @prop {string | undefined} reason
   * @prop {Array<Breakdown>} breakdownList
   * @prop {string} orderReference
   * @prop {Payer } payer
   * @returns {RefundResponse}
   * @example
   * ````javascript
   *payinApi.refund({
   *  orderId: generatedPayment.orderId!,
   *  transactionAmount: new Amount(100, "EUR"),
   *  payer: new Payer("testPayer"),
   *  breakdownList: [
   *    new Breakdown(new Amount(100, "EUR"), "1234556", "ref1")
   *  ],
   *  orderReference: "TestRef"
   *}).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  refund(options: RefundOptions): Promise<RefundResponse> {
    return this.sendToApiPost<RefundResponse>("/payin/refund", options)
      .then(result => {
        const status = Utils.hasEnumOrDefault(result.orderStatus, OrderStatus, null);
        if (status === null) {
          throw new Error("Missing required field or invalid data: orderStatus");
        }

        return {
          orderStatus: Utils.hasEnumOrDefault(result.orderStatus, OrderStatus, undefined),
          transactionList: result.transactionList?.map((x: any) => new Transaction(x)) ?? undefined,
          orderId: result.orderId ?? undefined
        };
      });
  }

  /**
   * Get signed mandate file.
   * @description Get signed mandate file.
   * @param {string | undefined} transactionId. Must be a transaction for card. Must be provided if reference is not present.
   * @param {string | undefined} reference. Mandate reference (UMR). Must be provided if transationId is not present
   * @returns {SignedMandateFile}
   * @example
   * ````javascript
   *payinApi.mandate("2088621", "12453484454").then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  mandate(transactionId?: string, reference?: string): Promise<SignedMandateFile> {
    return this.sendToApiGet<SignedMandateFile>("/payin/mandate", {
      transactionId: transactionId,
      reference: reference
    })
      .then(result => new SignedMandateFile(result));
  }

  /**
   * Get card payment ticket.
   * @description Get a ticket in JSON or PDF format.
   * @param {string} transactionId. Id of the transaction. Must be a card transaction.
   * @param {TicketType} type. Ticket type : C client, M : merchant.
   * @param {TicketFormat} format. Ticket format : J JSON, P : PDF.
   * @param {string} message. Message to set in the bottom of the ticket.
   * @returns {Ticket} The ticket
   * @example
   * ````javascript
   *payinApi..ticket("2097421", TicketType.Client, TicketFormat.JSON).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
  ticket(transactionId: string, type: TicketType, format: TicketFormat, message?: string): Promise<Ticket> {
    return this.sendToApiGet<Ticket>("/payin/ticket", {
      transactionId: transactionId,
      type: type,
      format: format,
      message: message
    })
      .then(result => new Ticket(result));
  }
}
