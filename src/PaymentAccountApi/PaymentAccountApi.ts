import { Amount } from '../..';
import ApiRest from '../../utils/apiRest';
import { ReportFormat, ReportType } from '../../utils/enums';
import PaymentAccount from '../models/PaymentAccount';
import {
  PaymentAccountListOptions,
  PaymentAccountCreditOptions,
  PaymentAccountCreditResponse,
  PaymentAccountPayoutAutoOptions,
  PaymentAccountSetIBANOptions,
  PaymentAccountSetIBANResponse,
  PaymentAccountListResponse
} from './PaymentAccountInterfaces';

class PaymentAccountApi extends ApiRest {
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
    return new Promise((success, reject) => {
      return this.sendToApiGet('/paymentAccount', {
        accountNumber: accountNumber
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        try {
          success(new PaymentAccount(resp));
        } catch (err) {
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
  list(
    options: PaymentAccountListOptions
  ): Promise<PaymentAccountListResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/paymentAccount/list', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success({
              pagination: options.pagination,
              offset: options.offset,
              lineCount: +resp.lineCount,
              paymentAccountList:
                resp.accountList?.map(
                  (x: any) => new PaymentAccount({ account: x })
                ) ?? []
            });
          } catch (err) {
            reject(err);
          }
        }
      );
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
  credit(
    options: PaymentAccountCreditOptions
  ): Promise<PaymentAccountCreditResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/paymentAccount/credit', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success({
              virtualIban: resp.virtualIban,
              transactionId: resp.transactionId
            });
          } catch (err) {
            reject(err);
          }
        }
      );
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/paymentAccount/payoutAuto', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success(null);
          } catch (err) {
            reject(err);
          }
        }
      );
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
  setIBAN(
    options: PaymentAccountSetIBANOptions
  ): Promise<PaymentAccountSetIBANResponse> {
    return new Promise((success, reject) => {
      const json = options as any;
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
      return this.sendToApiPost('/paymentAccount/setIBAN', payload, true).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success({
              requestId: resp.requestId,
              paymentMathodAlias: resp.paymentMathodAlias
            });
          } catch (err) {
            reject(err);
          }
        }
      );
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
    return new Promise((success, reject) => {
      return this.sendToApiPost('/paymentAccount/disableIBAN', {
        requestId: requestId,
        accountNumber: accountNumber
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        try {
          success(null);
        } catch (err) {
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
  setFloorLimit(accountNumber: string, amount: Amount): Promise<null> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/paymentAccount/setFloorLimit', {
        accountNumber: accountNumber,
        amount: amount
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        try {
          success(null);
        } catch (err) {
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
  report(
    accountNumber: string,
    type: ReportType,
    format: ReportFormat,
    year: string,
    month: string
  ): Promise<null> {
    return new Promise((success, reject) => {
      return this.sendToApiGet('/paymentAccount/report', {
        accountNumber: accountNumber,
        type: type,
        format: format,
        year: year,
        month: month
      }).then((resp: any) => {
        if (+resp.resultCode !== 0)
          reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
        try {
          success(null);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}

export default PaymentAccountApi;
