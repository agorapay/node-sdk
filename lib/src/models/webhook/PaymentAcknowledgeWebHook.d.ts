import WebHook from "./WebHook";
export declare enum WebHookIPNOperationType {
    /** capture with or without simultaneous authorisation */
    Purchase = "1",
    AuthorizationOnly = "7"
}
export declare enum WebHookIPNTransactionStatusCode {
    AuthorizationAndImmediateCaptureValidated = "10",
    AuthorizationOnlyValidated = "3",
    TransactionRefused = "40"
}
/**
 * Class representing a webhook.
 */
export default class PaymentAcknowledgeWebHook extends WebHook {
    static readonly code = "IPN";
    orderId: string;
    amount: string;
    transactionCurrency: string;
    transactionStatusCode: WebHookIPNTransactionStatusCode;
    /** Type of payment */
    operationType: WebHookIPNOperationType;
    constructor(data?: Partial<PaymentAcknowledgeWebHook>);
}
