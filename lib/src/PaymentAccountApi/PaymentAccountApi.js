"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
const PaymentAccount_1 = __importDefault(require("../models/PaymentAccount"));
class PaymentAccountApi extends apiRest_1.default {
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
    details(accountNumber) {
        return new Promise((success, reject) => {
            return this.sendToApiGet('/paymentAccount', {
                accountNumber: accountNumber
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(new PaymentAccount_1.default(resp));
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    list(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentAccount/list', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        pagination: options.pagination,
                        offset: options.offset,
                        lineCount: +resp.lineCount,
                        paymentAccountList: resp.accountList?.map((x) => new PaymentAccount_1.default({ account: x })) ?? []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    credit(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentAccount/credit', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        virtualIban: resp.virtualIban,
                        transactionId: resp.transactionId
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    payoutAuto(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentAccount/payoutAuto', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    /**
     * Start change IBAN process.
     * @param {PaymentAccountSetIBANOptions} options
     * @prop {string | undefined} accountNumber
     * @prop {string | undefined} firstName
     * @prop {string | undefined} lastName
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
     * @prop {IbanPaymentMethodKey | undefined} paymentMethodKey
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
    setIBAN(options) {
        return new Promise((success, reject) => {
            const json = options;
            const fileContent = options.fileContent;
            delete json.fileContent;
            const payload = {
                json: json,
                files: [
                    {
                        name: 'file',
                        fileName: `iban.${options.fileType}`,
                        data: fileContent
                    }
                ]
            };
            return this.sendToApiPost('/paymentAccount/setIBAN', payload, true).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        requestId: resp.requestId,
                        paymentMathodAlias: resp.paymentMathodAlias
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    disableIBAN(requestId, accountNumber) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentAccount/disableIBAN', {
                requestId: requestId,
                accountNumber: accountNumber
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    /**
     * @param {string} requestId
     * @param {string} accountNumber
     * @example
     * ````javascript
     *paymentAccountApi.setFloorLimit("123456789", new Amount(100, "EUR")).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    setFloorLimit(accountNumber, amount) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentAccount/setFloorLimit', {
                accountNumber: accountNumber,
                amount: amount
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    report(accountNumber, type, format, year, month) {
        return new Promise((success, reject) => {
            return this.sendToApiGet('/paymentAccount/report', {
                accountNumber: accountNumber,
                type: type,
                format: format,
                year: year,
                month: month
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    /**
     * Update authorized OverDraft Amount
     *
     * @async
     * @param {PaymentAccountSetAuthorizedOverdraftRequest} options
     * @returns {Promise<null>}
     */
    async setAuthorizedOverdraft(options) {
        return Utils_1.default.handleApiResponse(this.sendToApiPost('/paymentAccount/setAuthorizedOverdraft', options), () => null);
    }
}
exports.default = PaymentAccountApi;
