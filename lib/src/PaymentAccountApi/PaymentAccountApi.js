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
var ApiRest_1 = require("../../utils/ApiRest");
var PaymentAccount_1 = require("../models/PaymentAccount");
var PaymentAccountApi = /** @class */ (function (_super) {
    __extends(PaymentAccountApi, _super);
    function PaymentAccountApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * get Account details.
     * @description Get account details.
     * @param {string} accountNumber identifier of the account to get details.
     * @returns {PaymentAccount} The payment account details.
     * @example
     * ````javascript
     *paymentAccountApi.details("123456789").then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.details = function (accountNumber) {
        return this.sendToApiGet("/paymentAccount", { accountNumber: accountNumber })
            .then(function (result) { return new PaymentAccount_1.default({ account: result }); });
    };
    /**
     * Get account list.
     * @description Response contains account list.
     * @param {PaymentAccountListOptions} options
     * @prop {string | undefined} accountNumber
     * @prop {string | undefined} currency
     * @prop {string | undefined} accountStatus
     * @prop {string | undefined} sellerReference
     * @returns {<Array<PaymentAccount>} The account list.
     * @example
     * ````javascript
     *paymentAccountApi.list({
     *  accountNumber: "123456789",
     *  currency: "EUR",
     *  accountStatus: "A"
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.list = function (options) {
        return this.sendToApiPost("/paymentAccount/list", options)
            .then(function (result) {
            var _a;
            return {
                pagination: options.pagination,
                offset: options.offset,
                lineCount: +result.lineCount,
                paymentAccountList: ((_a = result.accountList) !== null && _a !== void 0 ? _a : []).map(function (x) { return new PaymentAccount_1.default(x); })
            };
        });
    };
    /**
     * Credit an account.
     * @param {PaymentAccountCreditOptions} options
     * @prop {string} accountNumber
     * @prop {number} amount
     * @prop {PaymentMethodKey} paymentMethodKey
     * @prop {string} currency
     * @returns {PaymentAccountCreditResponse}
     * @example
     * ````javascript
     *paymentAccountApi.credit({
     *  accountNumber: "123456789",
     *  amount: 100,
     *  paymentMethodKey: PaymentMethodKey.SCT,
     *  currency: "EUR"
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.credit = function (options) {
        return this.sendToApiPost("/paymentAccount/credit", options)
            .then(function (result) {
            return {
                virtualIban: result.virtualIban,
                transactionId: result.transactionId
            };
        });
    };
    /**
     * Schedule a payout.
     * @param {PaymentAccountPayoutAutoOptions} options
     * @prop {string | undefined} accountNumber
     * @prop {number} amount
     * @prop {PayoutAutoFrequency} frequency
     * @prop {number | undefined} dayOfWeek
     * @prop {number | undefined} dayOfMonth
     * @prop {string} paymentMethodAlias
     * @example
     * ````javascript
     *paymentAccountApi.payoutAuto({
     *  accountNumber: "123456789",
     *  amount: 10,
     *  frequency: PayoutAutoFrequency.OnceADay,
     *  paymentMethodAlias: "14578961455",
     *  dayOfMonth: 1,
     *  dayOfWeek: 1
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.payoutAuto = function (options) {
        return this.sendToApiPost("/paymentAccount/payoutAuto", options)
            .then(function () { return null; });
    };
    /**
     * Start change IBAN process.
     * @param {PaymentAccountSetIBANOptions} options
     * @prop {string | undefined} accountNumber
     * @prop {string} firstName
     * @prop {string} lastName
     * @prop {string | undefined} socialReason
     * @prop {string} address
     * @prop {string} city
     * @prop {string} postalCode
     * @prop {string} country
     * @prop {FileType} fileType
     * @prop {string} fileContent
     * @prop {string} iban
     * @prop {string} currency
     * @prop {string | undefined} paymentMethodAlias
     * @prop {string | undefined} activationDate
     * @returns {string} The requestId
     * @example
     * ````javascript
     *paymentAccountApi.setIBAN({
     *  accountNumber: "123456789",
     *  iban: "FR76123456789",
     *  currency: "EUR",
     *  country: "FRA",
     *  fileType: FileType.JPEG,
     *  paymentMethodAlias: "PM123456&",
     *  address: "2 rue du test",
     *  city: "PARIS",
     *  fileContent: "test",
     *  postalCode: "75009",
     *  firstName: "merchant MA.3",
     *  lastName: "test"
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.setIBAN = function (options) {
        var json = Object.assign({}, options);
        var fileContent = options.fileContent;
        delete json.fileContent;
        var payload = {
            json: json,
            files: [{
                    name: "file",
                    fileName: "iban.".concat(options.fileType),
                    data: fileContent
                }]
        };
        return this.sendToApiPost("/paymentAccount/setIBAN", payload, true)
            .then(function (result) {
            return {
                requestId: result.requestId,
                paymentMethodAlias: result.paymentMethodAlias
            };
        });
    };
    /**
     * Disable IBAN.
     * @description Disable IBAN request. One of requestId or paymentMethodAlias is required.
     * @param {string} requestId
     * @param {string} accountNumber
     * @example
     * ````javascript
     *paymentAccountApi.disableIBAN("123456789").then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.disableIBAN = function (requestId, accountNumber) {
        return this.sendToApiPost("/paymentAccount/disableIBAN", {
            requestId: requestId,
            accountNumber: accountNumber
        })
            .then(function () { return null; });
    };
    /**
     * @param {string} accountNumber
     * @param {Amount} amount
     * @example
     * ````javascript
     *paymentAccountApi.setFloorLimit("123456789", new Amount(100, "EUR")).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.setFloorLimit = function (accountNumber, amount) {
        return this.sendToApiPost("/paymentAccount/setFloorLimit", {
            accountNumber: accountNumber,
            amount: amount
        })
            .then(function () { return null; });
    };
    /**
     * @param {string | undefined} accountNumber
     * @param {ReportType} type
     * @param {ReportFormat} format
     * @param {string} year
     * @param {string | undefined} month
     * @example
     * ````javascript
     *paymentApi.report("13006EUR12641111", ReportType.ACCOUNT_STATEMENT, ReportFormat.PDF, "2022", "01").then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentAccountApi.prototype.report = function (accountNumber, type, format, year, month) {
        return this.sendToApiGet("/paymentAccount/report", {
            accountNumber: accountNumber,
            type: type,
            format: format,
            year: year,
            month: month
        })
            .then(function () { return null; });
    };
    return PaymentAccountApi;
}(ApiRest_1.default));
exports.default = PaymentAccountApi;
