import OperationApi from './OperationApi/OperationApi.js';
import Config from './models/Config.js';
import PayoutApi from './PayoutApi/PayoutApi.js';
import TransferApi from './TransferApi/TransferApi.js';
import PayinApi from './PayinApi/PayinApi.js';
import PaymentAccountApi from './PaymentAccountApi/PaymentAccountApi.js';
import AccountHolderApi from './AccountHolderApi/AccountHolderApi.js';
import SelfcareApi from './SelfcareApi/SelfcareApi.js';
import MandateApi from './MandateApi/MandateApi.js';
import PaymentMethodApi from './PaymentMethodApi/PaymentMethodApi.js';
import VirtualIbanApi from './VirtualIbanApi/VirtualIbanApi.js';
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
 * const mandateApi = capsPaymentApi.mandateApi()
 * const paymentMethodApi = capsPaymentApi.paymentMethodApi()
 *  ````
 */
declare class CAPSPaymentAPI {
    config: Config;
    /**
     * @param tokenUser - Token authentication username.
     * @param tokenPassword - Token authentication password.
     * @param tokenUrl - Token authentication URL.
     * @param baseUrl - CAPS Payment URL
     * @param timeout - HTTP requests timeout. Default is `0` (no timeout).
     */
    constructor(tokenUser: string, tokenPassword: string, tokenUrl: string, baseUrl: string, timeout?: number);
    operationApi(): OperationApi;
    payoutApi(): PayoutApi;
    transferApi(): TransferApi;
    payinApi(): PayinApi;
    paymentAccountApi(): PaymentAccountApi;
    accountHolderApi(): AccountHolderApi;
    selfcareApi(): SelfcareApi;
    mandateApi(): MandateApi;
    paymentMethodApi(): PaymentMethodApi;
    virtualIbanApi(): VirtualIbanApi;
}
export default CAPSPaymentAPI;
