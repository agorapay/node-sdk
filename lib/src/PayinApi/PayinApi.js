"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRest_1 = require("../../utils/ApiRest");
const enums_1 = require("../../utils/enums");
const OrderDetails_1 = require("../models/OrderDetails");
const Payment_1 = require("../models/Payment");
const PaymentMethod_1 = require("../models/PaymentMethod");
const SignedMandateFile_1 = require("../models/SignedMandateFile");
const Ticket_1 = require("../models/Ticket");
const Transaction_1 = require("../models/Transaction");
const Utils_1 = require("../../utils/Utils");
class PayinApi extends ApiRest_1.default {
    /**
     * Submit a payment.
     * @description When your shopper choose a payment method, this call submit the choice and any data if already given. The return can be final, (transaction completed) or ask to authentification
     * details, or redirect the shopper to PSP or 3DS pages.
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
    async payment(options) {
        const args = Object.assign({});
        if (options.transPaymentMethod) {
            args.transPaymentMethod = { id: options.transPaymentMethod };
        }
        return new Payment_1.default(await this.sendToApiPost("/payin/payment", Object.assign(options, args)));
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
    async paymentDetails(options) {
        return new Payment_1.default(await this.sendToApiPost("/payin/paymentDetails", options));
    }
    /**
     * Submit an order/Get payment methods.
     * @description When your shopper is ready to pay, submit an order and get a list of the available payment methods and alias. The list is based on the shopper country and the order
     * amount and currency. This is the first call to use when going on a payment operation. The next call should be /payment.
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
    async paymentMethods(options) {
        const result = await this.sendToApiPost("/payin/paymentMethods", options);
        return {
            paymentMethodList: result.paymentMethodList?.map(method => new PaymentMethod_1.default(method.id, method.aliasList, method.label, method.type)) ?? undefined,
            orderId: result.orderId
        };
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
    async capture(options) {
        const result = await this.sendToApiPost("/payin/capture", options);
        const status = Utils_1.default.hasEnumOrDefault(result.orderStatus, enums_1.OrderStatus, null);
        if (!result.orderId) {
            throw new Error("Missing required field: orderId");
        }
        else if (status === null) {
            throw new Error("Missing required field or invalid data: orderStatus");
        }
        return {
            orderStatus: status,
            transactionId: result.transactionId,
            transactionList: (result.transactionList ?? []).map((x) => new Transaction_1.default(x)),
            orderId: result.orderId
        };
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
    async cancel(options) {
        const result = await this.sendToApiPost("/payin/cancel", options);
        const status = Utils_1.default.hasEnumOrDefault(result.orderStatus, enums_1.OrderStatus, null);
        if (!result.orderId) {
            throw new Error("Missing required field: orderId");
        }
        else if (status === null) {
            throw new Error("Missing required field or invalid data: orderStatus");
        }
        return {
            orderStatus: Utils_1.default.hasEnumOrDefault(result.orderStatus, enums_1.OrderStatus, undefined),
            transactionList: (result.transactionList ?? []).map((x) => new Transaction_1.default(x))
        };
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
    async orderDetails(orderId) {
        return new OrderDetails_1.default(await this.sendToApiGet("/payin/orderDetails", { orderId: orderId }));
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
    async adjustPayment(options) {
        await this.sendToApiPost("/payin/adjustPayment", options);
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
    async paymentIframe(options) {
        const result = await this.sendToApiPost("/payin/paymentIframe", options);
        if (!result.orderId === undefined) {
            throw new Error("Missing required field: orderId");
        }
        else if (!result.authenticationCode) {
            throw new Error("Missing required field: authenticationCode");
        }
        return {
            authenticationCode: result.authenticationCode,
            orderId: result.orderId,
            site: result.site,
            url: result.url,
            resultCode: result.resultCode
        };
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
    async refund(options) {
        const result = await this.sendToApiPost("/payin/refund", options);
        const status = Utils_1.default.hasEnumOrDefault(result.orderStatus, enums_1.OrderStatus, null);
        if (status === null) {
            throw new Error("Missing required field or invalid data: orderStatus");
        }
        return {
            orderStatus: Utils_1.default.hasEnumOrDefault(result.orderStatus, enums_1.OrderStatus, undefined),
            transactionList: result.transactionList?.map((x) => new Transaction_1.default(x)) ?? undefined,
            orderId: result.orderId ?? undefined
        };
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
    async mandate(transactionId, reference) {
        return new SignedMandateFile_1.default(await this.sendToApiGet("/payin/mandate", {
            transactionId: transactionId,
            reference: reference
        }));
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
    async ticket(transactionId, type, format, message) {
        const result = await this.sendToApiGet("/payin/ticket", {
            transactionId: transactionId,
            type: type,
            format: format,
            message: message
        });
        return new Ticket_1.default(result);
    }
}
exports.default = PayinApi;
