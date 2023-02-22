import OperationApi from './OperationApi/OperationApi';
import Config from './models/Config';
import PayoutApi from './PayoutApi/PayoutApi';
import TransferApi from './TransferApi/TransferApi';
import PayinApi from './PayinApi/PayinApi';
import PaymentAccountApi from './PaymentAccountApi/PaymentAccountApi';
import AccountHolderApi from './AccountHolderApi/AccountHolderApi';
import SelfcareApi from './SelfcareApi/SelfcareApi';

/**
 * @example
 * ````typescript
 * import { CAPSPaymentAPI } from 'caps-payment'
 *
 * const capsPaymentApi = new CAPSPaymentAPI('myTokenUser', 'myTokenPassword', 'https://myTokenAuthUrl', 'https://theCAPSPaymentURL', 2000)
 *
 * const operationApi = capsPaymentApi.operationApi()
 * const payoutApi = capsPaymentApi.payoutApi()
 * const transferApi = capsPaymentApi.transferApi()
 * const payinApi = capsPaymentApi.payinApi()
 * const paymentAccountApi = capsPaymentApi.paymentAccountApi()
 * const accountHolderApi = capsPaymentApi.accountHolderApi()
 * const selfcareApi = capsPaymentApi.selfcareApi()
 *  ````
 */
class CAPSPaymentAPI {
  config: Config;

  /**
   * @param tokenUser - Token authentication username.
   * @param tokenPassword - Token authentication password.
   * @param tokenUrl - Token authentication URL.
   * @param baseUrl - CAPS Payment URL
   * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
   */
  public constructor(
    tokenUser: string,
    tokenPassword: string,
    tokenUrl: string,
    baseUrl: string,
    timeout = 0
  ) {
    this.config = new Config(
      tokenUser,
      tokenPassword,
      tokenUrl,
      baseUrl,
      timeout
    );
  }

  operationApi() {
    return new OperationApi(this.config);
  }

  payoutApi() {
    return new PayoutApi(this.config);
  }

  transferApi() {
    return new TransferApi(this.config);
  }

  payinApi() {
    return new PayinApi(this.config);
  }

  paymentAccountApi() {
    return new PaymentAccountApi(this.config);
  }

  accountHolderApi() {
    return new AccountHolderApi(this.config);
  }

  selfcareApi() {
    return new SelfcareApi(this.config);
  }
}

export default CAPSPaymentAPI;
