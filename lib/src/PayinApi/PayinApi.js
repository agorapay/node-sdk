"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apiRest_1 = require("../../utils/apiRest");
var enums_1 = require("../../utils/enums");
var OrderDetails_1 = require("../models/OrderDetails");
var Payment_1 = require("../models/Payment");
var PaymentMethod_1 = require("../models/PaymentMethod");
var Alias_1 = require("../models/Alias");
var SignedMandateFile_1 = require("../models/SignedMandateFile");
var Ticket_1 = require("../models/Ticket");
var Transaction_1 = require("../models/Transaction");
var PayinApi = /** @class */ (function (_super) {
    __extends(PayinApi, _super);
    function PayinApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    PayinApi.prototype.payment = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            var args = Object.assign({});
            if (options.transPaymentMethod) {
                args.transPaymentMethod = { id: options.transPaymentMethod };
            }
            return _this.sendToApiPost('/payin/payment', Object.assign(options, args)).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new Payment_1.default(resp));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.paymentDetails = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/paymentDetails', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new Payment_1.default(resp));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.paymentMethods = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/paymentMethods', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success({
                            paymentMethodList: resp.paymentMethodList
                                ? resp.paymentMethodList.map(function (x) {
                                    var aliasList = x.aliasList ? x.aliasList.map(function (y) { return new Alias_1.default(y.id, y.expirationDate, y.maskedPan, y.label, y.bankCode || y.cardBrand); }) : [];
                                    return new PaymentMethod_1.default(x.id, aliasList, x.label, x.type);
                                })
                                : [],
                            orderId: resp.orderId
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.capture = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/capture', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                if (!resp.orderId === undefined)
                    reject(new Error('Missing required field: orderId'));
                if (!resp.orderStatus ||
                    !Object.values(enums_1.OrderStatus).some(function (orderStatus) { return orderStatus === resp.orderStatus; }))
                    reject(new Error('Missing required field or invalid data: orderStatus'));
                else {
                    try {
                        success({
                            orderStatus: resp.orderStatus,
                            transactionList: resp.transactionList
                                ? resp.transactionList.map(function (x) { return new Transaction_1.default(x); })
                                : [],
                            orderId: resp.orderId
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.cancel = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/cancel', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                if (!resp.orderId === undefined)
                    reject(new Error('Missing required field: orderId'));
                if (!resp.orderStatus ||
                    !Object.values(enums_1.OrderStatus).some(function (orderStatus) { return orderStatus === resp.orderStatus; }))
                    reject(new Error('Missing required field or invalid data: orderStatus'));
                else {
                    try {
                        success({
                            orderStatus: resp.orderStatus,
                            transactionList: resp.transactionList
                                ? resp.transactionList.map(function (x) { return new Transaction_1.default(x); })
                                : []
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.orderDetails = function (orderId) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiGet('/payin/orderDetails', {
                orderId: orderId
            }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new OrderDetails_1.default(resp));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.adjustPayment = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/adjustPayment', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(null);
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.paymentIframe = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/paymentIframe', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
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
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.refund = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/refund', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                if (!resp.orderId === undefined)
                    reject(new Error('Missing required field: orderId'));
                if (!resp.orderStatus ||
                    !Object.values(enums_1.OrderStatus).some(function (orderStatus) { return orderStatus === resp.orderStatus; }))
                    reject(new Error('Missing required field or invalid data: orderStatus'));
                else {
                    try {
                        success({
                            orderStatus: resp.orderStatus,
                            transactionList: resp.transactionList
                                ? resp.transactionList.map(function (x) { return new Transaction_1.default(x); })
                                : undefined,
                            orderId: resp.orderId !== undefined ? +resp.orderId : undefined
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.mandate = function (transactionId, reference) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiGet('/payin/mandate', {
                transactionId: transactionId,
                reference: reference
            }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new SignedMandateFile_1.default(resp));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.ticket = function (transactionId, type, format, message) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiGet('/payin/ticket', {
                transactionId: transactionId,
                type: type,
                format: format,
                message: message
            }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new Ticket_1.default(resp));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    PayinApi.prototype.reload = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/payin/reload', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success({ transactionId: resp.transactionId });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
    return PayinApi;
}(apiRest_1.default));
exports.default = PayinApi;
