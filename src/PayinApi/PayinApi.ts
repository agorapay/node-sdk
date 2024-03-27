import { report } from 'process';
import ApiRest from '../../utils/apiRest';
import { OrderStatus, TicketFormat, TicketType } from '../../utils/enums';
import OrderDetails from '../models/OrderDetails';
import Payment from '../models/Payment';
import PaymentMethod from '../models/PaymentMethod';
import SignedMandateFile from '../models/SignedMandateFile';
import Ticket from '../models/Ticket';
import Transaction from '../models/Transaction';
import {
  PaymentOptionsWithOrderId,
  PaymentOptionsWithoutOrderId,
  PaymentDetailsOptions,
  PaymentMethodOptions,
  PaymentMethodResponse,
  CaptureOptions,
  CaptureResponse,
  CancelOptions,
  CancelResponse,
  AdjustPaymentOptions,
  PaymentIFrameOptions,
  PaymentIFrameResponse,
  RefundOptions,
  RefundResponse,
  ReloadOptions,
  ReloadResponse
} from './PayinInterfaces';

class PayinApi extends ApiRest {
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
   * @prop {InstantPayment | undefined} instantPayment
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
   * @prop {InstantPayment | undefined} instantPayment
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
  payment(
    options: PaymentOptionsWithOrderId | PaymentOptionsWithoutOrderId
  ): Promise<Payment> {
    return new Promise((success, reject) => {
      const args = Object.assign({});
      if (options.transPaymentMethod) {
        args.transPaymentMethod = { id: options.transPaymentMethod };
      }
      return this.sendToApiPost(
        '/payin/payment',
        Object.assign(options, args)
      ).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        else {
          try {
            success(new Payment(resp));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/paymentDetails', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          else {
            try {
              success(new Payment(resp));
            } catch (err) {
              reject(err);
            }
          }
        }
      );
    });
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
  paymentMethods(
    options: PaymentMethodOptions
  ): Promise<PaymentMethodResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/paymentMethods', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          else {
            try {
              success({
                paymentMethodList: resp.paymentMethodList
                  ? resp.paymentMethodList.map((x: any) => new PaymentMethod(x))
                  : undefined,
                orderId: resp.orderId
              });
            } catch (err) {
              reject(err);
            }
          }
        }
      );
    });
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/capture', options).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        if (!resp.orderId === undefined)
          reject(new Error('Missing required field: orderId'));
        if (
          !resp.orderStatus ||
          !Object.values(OrderStatus).some(
            (orderStatus: string) => orderStatus === resp.orderStatus
          )
        )
          reject(
            new Error('Missing required field or invalid data: orderStatus')
          );
        else {
          try {
            success({
              orderStatus: <OrderStatus>resp.orderStatus,
              transactionList: resp.transactionList
                ? resp.transactionList.map((x: any) => new Transaction(x))
                : [],
              orderId: resp.orderId
            });
          } catch (err) {
            reject(err);
          }
        }
      });
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/cancel', options).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        if (!resp.orderId === undefined)
          reject(new Error('Missing required field: orderId'));
        if (
          !resp.orderStatus ||
          !Object.values(OrderStatus).some(
            (orderStatus: string) => orderStatus === resp.orderStatus
          )
        )
          reject(
            new Error('Missing required field or invalid data: orderStatus')
          );
        else {
          try {
            success({
              orderStatus: <OrderStatus>resp.orderStatus,
              transactionList: resp.transactionList
                ? resp.transactionList.map((x: any) => new Transaction(x))
                : []
            });
          } catch (err) {
            reject(err);
          }
        }
      });
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
    return new Promise((success, reject) => {
      return this.sendToApiGet('/payin/orderDetails', {
        orderId: orderId
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        else {
          try {
            success(new OrderDetails(resp));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/adjustPayment', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          else {
            try {
              success(null);
            } catch (err) {
              reject(err);
            }
          }
        }
      );
    });
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/paymentIframe', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          if (!resp.orderId === undefined)
            reject(new Error('Missing required field: orderId'));
          if (!resp.authenticationCode)
            reject(new Error('Missing required field: authenticationCode'));
          else {
            try {
              success({
                authenticationCode: resp.authenticationCode,
                orderId: +resp.orderId,
                site: resp.site,
                url: resp.url,
                resultCode: resp.resultCode
              });
            } catch (err) {
              reject(err);
            }
          }
        }
      );
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/refund', options).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        if (!resp.orderId === undefined)
          reject(new Error('Missing required field: orderId'));
        if (
          !resp.orderStatus ||
          !Object.values(OrderStatus).some(
            (orderStatus: string) => orderStatus === resp.orderStatus
          )
        )
          reject(
            new Error('Missing required field or invalid data: orderStatus')
          );
        else {
          try {
            success({
              orderStatus: <OrderStatus>resp.orderStatus,
              transactionList: resp.transactionList
                ? resp.transactionList.map((x: any) => new Transaction(x))
                : undefined,
              orderId: resp.orderId !== undefined ? +resp.orderId : undefined
            });
          } catch (err) {
            reject(err);
          }
        }
      });
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
  mandate(
    transactionId?: string,
    reference?: string
  ): Promise<SignedMandateFile> {
    return new Promise((success, reject) => {
      return this.sendToApiGet('/payin/mandate', {
        transactionId: transactionId,
        reference: reference
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        else {
          try {
            success(new SignedMandateFile(resp));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
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
  ticket(
    transactionId: string,
    type: TicketType,
    format: TicketFormat,
    message?: string
  ): Promise<Ticket> {
    return new Promise((success, reject) => {
      return this.sendToApiGet('/payin/ticket', {
        transactionId: transactionId,
        type: type,
        format: format,
        message: message
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        else {
          try {
            success(new Ticket(resp));
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  /**
   * Credit payment account by PayIn SEPA Direct Debit (SDD) for B2C.
   * @description This call is used to credit an account by SDD payment for B2C.
   * @param {ReloadOptions} options Payment options.
   * @prop {string} accountNumber
   * @prop {string} amount
   * @prop {string} currency
   * @prop {string} paymentMethodAlias
   * @prop {PaymentSequence} sequence
   * @prop {string} reference
   * @prop {string | undefined} reason
   * @prop {string | undefined} endToEndId
   * @returns {ReloadResponse} Contains transaction id, if ok.
   * @example
   * ````javascript
   *payinApi..paymentDetails({
   *  "accountNumber": "1300600000EUR01005110",
   *  "reason": "Prélèvement mensuel",
   *  "endToEndId": "20231026PRLV10-12",
   *  "paymentMethodAlias": "PM202310230V3FG1100",
   *  "amount": "500.23",
   *  "currency": "EUR",
   *  "sequence": "RCUR",
   *  "reference": "2020110907201100Y0H1102"
   * }).then(resp => {
   *  console.log(resp)
   *}).catch(error => {
   *  console.log(error)
   *})
   * ````
   */
   reload(options: ReloadOptions): Promise<ReloadResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/payin/reload', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          else {
            try {
              success({ transactionId: resp.transactionId});
            } catch (err) {
              reject(err);
            }
          }
        }
      );
    });
  }
}

export default PayinApi;
