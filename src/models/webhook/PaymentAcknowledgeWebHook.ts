import Utils from "../../../utils/Utils";
import WebHook from "./WebHook";

export enum WebHookIPNOperationType {
  /** capture with or without simultaneous authorisation */
  Purchase = "1",
  AuthorizationOnly = "7",
}

export enum WebHookIPNTransactionStatusCode {
  AuthorizationAndImmediateCaptureValidated = "10",
  AuthorizationOnlyValidated = "3",
  TransactionRefused = "40",
}

/**
 * Class representing a webhook.
 */
export default class PaymentAcknowledgeWebHook extends WebHook {
  public static readonly code = "IPN";

  public orderId: string;
  public amount: string;
  public transactionCurrency: string;
  public transactionStatusCode: WebHookIPNTransactionStatusCode;
  /** Type of payment */
  public operationType: WebHookIPNOperationType;

  constructor(data?: Partial<PaymentAcknowledgeWebHook>) {
    if (!data) {
      throw new Error("WebHook data is required");
    }
    super(PaymentAcknowledgeWebHook.code, data);

    const operationType = Utils.hasEnumOrDefault(data.operationType, WebHookIPNOperationType, null);
    const transactionStatusCode = Utils.hasEnumOrDefault(data.transactionStatusCode, WebHookIPNTransactionStatusCode, null);

    if (!operationType) {
      throw new Error("WebHook operationType is required");
    } else if (!transactionStatusCode) {
      throw new Error("WebHook transactionStatusCode is required");
    } else if (!data.orderId) {
      throw new Error("WebHook orderId is required");
    } else if (!data.amount) {
      throw new Error("WebHook amount is required");
    } else if (!data.transactionCurrency) {
      throw new Error("WebHook transactionCurrency is required");
    }

    this.orderId = data.orderId;
    this.amount = data.amount;
    this.transactionCurrency = data.transactionCurrency;
    this.transactionStatusCode = transactionStatusCode;
    this.operationType = operationType;
  }
}
