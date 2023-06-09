import { Amount } from "../..";
import ApiRest from "../../utils/ApiRest";
import PaymentAccount from "../models/PaymentAccount";
import {
  PaymentAccountCreditOptions,
  PaymentAccountCreditResponse,
  PaymentAccountListOptions,
  PaymentAccountListResponse,
  PaymentAccountPayoutAutoOptions,
  PaymentAccountSetIBANOptions,
  PaymentAccountSetIBANResponse
} from "./PaymentAccountInterfaces";
import { ReportFormat, ReportType } from "../../utils/enums";

export default class PaymentAccountApi extends ApiRest {
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
  details(accountNumber: string): Promise<PaymentAccount> {
    return this.sendToApiGet<PaymentAccount>("/paymentAccount", { accountNumber: accountNumber })
      .then(result => new PaymentAccount({ account: result }));
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
  list(options: PaymentAccountListOptions): Promise<PaymentAccountListResponse> {
    return this.sendToApiPost<PaymentAccountListResponse & { accountList: PaymentAccount[] | null }>("/paymentAccount/list", options)
      .then(result => {
        return {
          pagination: options.pagination,
          offset: options.offset,
          lineCount: +result.lineCount,
          paymentAccountList: (result.accountList ?? []).map((x: any) => new PaymentAccount(x))
        };
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
  credit(options: PaymentAccountCreditOptions): Promise<PaymentAccountCreditResponse> {
    return this.sendToApiPost<PaymentAccountCreditResponse>("/paymentAccount/credit", options)
      .then(result => {
        return {
          virtualIban: result.virtualIban,
          transactionId: result.transactionId
        };
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
  payoutAuto(options: PaymentAccountPayoutAutoOptions): Promise<null> {
    return this.sendToApiPost<void>("/paymentAccount/payoutAuto", options)
      .then(() => null);
  }

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
  setIBAN(options: PaymentAccountSetIBANOptions): Promise<PaymentAccountSetIBANResponse> {
    const json: Partial<PaymentAccountSetIBANOptions> = Object.assign({}, options);
    const fileContent = options.fileContent;
    delete json.fileContent;
    const payload = {
      json: json,
      files: [{
        name: "file",
        fileName: `iban.${options.fileType}`,
        data: fileContent
      }]
    };

    return this.sendToApiPost<PaymentAccountSetIBANResponse>("/paymentAccount/setIBAN", payload, true)
      .then(result => {
        return {
          requestId: result.requestId,
          paymentMethodAlias: result.paymentMethodAlias
        };
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
  disableIBAN(requestId?: string, accountNumber?: string): Promise<null> {
    return this.sendToApiPost<void>("/paymentAccount/disableIBAN", {
      requestId: requestId,
      accountNumber: accountNumber
    })
      .then(() => null);
  }

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
  setFloorLimit(accountNumber: string, amount: Amount): Promise<null> {
    return this.sendToApiPost<void>("/paymentAccount/setFloorLimit", {
      accountNumber: accountNumber,
      amount: amount
    })
      .then(() => null);
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
  report(accountNumber: string, type: ReportType, format: ReportFormat, year: string, month: string): Promise<null> {
    return this.sendToApiGet<void>("/paymentAccount/report", {
      accountNumber: accountNumber,
      type: type,
      format: format,
      year: year,
      month: month
    })
      .then(() => null);
  }
}
