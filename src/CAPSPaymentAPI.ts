import OperationApi from "./OperationApi/OperationApi";
import Config from "./models/Config";
import PayoutApi from "./PayoutApi/PayoutApi";
import TransferApi from "./TransferApi/TransferApi";
import PayinApi from "./PayinApi/PayinApi";
import PaymentAccountApi from "./PaymentAccountApi/PaymentAccountApi";
import AccountHolderApi from "./AccountHolderApi/AccountHolderApi";
import CommonApi from "./CommonApi/CommonApi";

/**
 * @example
 * ````typescript
 * import { CAPSPaymentAPI } from 'caps-payment'
 *
 * const capsPaymentApi = new CAPSPaymentAPI('myTokenUser', 'myTokenPassword', 'https://myTokenAuthUrl', 'https://theCAPSPaymentURL', 2000);
 *
 * // for serverless functions you can pass a stored authToken
 * capsPaymentApi.commonApi().getAuthToken().then((authToken) => {
 *
 * const operationApi = capsPaymentApi.operationApi()
 * const payoutApi = capsPaymentApi.payoutApi()
 * const transferApi = capsPaymentApi.transferApi()
 * const payinApi = capsPaymentApi.payinApi()
 * const paymentAccountApi = capsPaymentApi.paymentAccountApi()
 * const accountHolderApi = capsPaymentApi.accountHolderApi()
 * const commonApi = capsPaymentApi.commonApi()
 * ````
 */
export default class CAPSPaymentAPI {
  private readonly config: Config;

  /**
   * @param tokenUser - Token authentication username.
   * @param tokenPassword - Token authentication password.
   * @param tokenUrl - Token authentication URL.
   * @param baseUrl - CAPS Payment URL
   * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
   */
  public constructor(tokenUser: string, tokenPassword: string, tokenUrl: string, baseUrl: string, timeout = 0) {
    this.config = new Config(tokenUser, tokenPassword, tokenUrl, baseUrl, timeout);
  }

  public operationApi(): OperationApi {
    return new OperationApi(this.config);
  }

  public payoutApi(): PayoutApi {
    return new PayoutApi(this.config);
  }

  public transferApi(): TransferApi {
    return new TransferApi(this.config);
  }

  public payinApi(): PayinApi {
    return new PayinApi(this.config);
  }

  public paymentAccountApi(): PaymentAccountApi {
    return new PaymentAccountApi(this.config);
  }

  public accountHolderApi(): AccountHolderApi {
    return new AccountHolderApi(this.config);
  }

  public commonApi(): CommonApi {
    return new CommonApi(this.config);
  }
}
