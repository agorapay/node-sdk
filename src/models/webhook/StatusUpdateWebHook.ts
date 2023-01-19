import { PaymentMethodType } from "../../../utils/enums";
import Utils from "../../../utils/Utils";
import WebHook from "./WebHook";

export enum WebHookStatusUpdateOperationType {
  Purchase = "1",
  Refunds = "2",
  Transfer = "4",
  SCTSDDFundReceipt = "5",
  /** Reload request or payout Identifiable via operationSide */
  ReloadRequestOrPayout = "6",
  AuthorizationOnly = "7",
  PreAuthorOnly = "8",
  Unpaid = "9"
}

export enum WebHookOperationStatus {
  Registered = "R",
  Waiting = "W",
  Cashed = "E",
  Cancelled = "C",
  Suspended = "S",
  Rejected = "R" // ?
}

export enum WebHookOperationSide {
  /** Pay in (a recharge is a payin) */
  Payin = "1",
  Transfer = "0",
  Payout = "-1"
}

export enum WebHookRelatedMessageStatus {
  /** Customer initiates the cancellation (or usecase of SDD: Cancellation of direct debit following receipt of an unpaid amount before clearing) */
  Cancellation = "0",
  /** Transactions not completed by the client and canceled due to timeout */
  Timeout = "200",
  /** Transactions declined during acceptation process */
  Declined = "201",
}

/**
 * Class representing a webhook.
 */
export default class StatusUpdateWebHook extends WebHook {
  public static readonly code = "operation";

  /** Type of payment */
  public operationType: WebHookStatusUpdateOperationType;
  /** Status of the transaction */
  public operationStatus: WebHookOperationStatus;
  public amount: string;
  public currencyCode: string;
  public operationDate?: string;
  public paymentMethodTypeId: PaymentMethodType;
  /** Direction of funds */
  public operationSide: WebHookOperationSide;
  /**
   * Linked transaction.
   * For unpaid: transactionId of the payment transaction impacted by the unpaid
   * TransactionCase of refund: transactionId of the refunded payment transaction
   * Not present if initial transaction
   */
  public operationRefundId?: string;
  /** Provision of the json as provided via API by the Marketplace. Not present if field not provided as input. */
  public metaData: Record<string, any>;
  /**
   * Additional complementary information provided to the status operation.
   */
  public relatedMsgStatus?: WebHookRelatedMessageStatus;
  /** Message associated to relatedMsgStatus */
  public eventStatusLabel?: string;
  /** Will eventually be fed with information on operations, in particular on unpaid bills. */
  public rejectReasonCode?: string;
  /** Will eventually be fed with information on operations, in particular on unpaid bills. */
  public rejectReasonLabel?: string;

  constructor(data?: Partial<StatusUpdateWebHook>) {
    if (!data) {
      throw new Error("WebHook data is required");
    }
    super(StatusUpdateWebHook.code, data);

    const operationType = Utils.hasEnumOrDefault(data.operationType, WebHookStatusUpdateOperationType, null);
    const operationStatus = Utils.hasEnumOrDefault(data.operationStatus, WebHookOperationStatus, null);
    const paymentMethodTypeId = Utils.hasEnumOrDefault(data.paymentMethodTypeId, PaymentMethodType, null);
    const operationSide = Utils.hasEnumOrDefault(data.operationSide, WebHookOperationSide, null);

    if (!operationType) {
      throw new Error("WebHook operationType is required");
    } else if (!operationStatus) {
      throw new Error("WebHook operationStatus is required");
    } else if (!data.amount) {
      throw new Error("WebHook amount is required");
    } else if (!data.currencyCode) {
      throw new Error("WebHook currencyCode is required");
    } else if (!paymentMethodTypeId) {
      throw new Error("WebHook paymentMethodTypeId is required");
    } else if (!operationSide) {
      throw new Error("WebHook operationSide is required");
    }

    this.operationType = operationType;
    this.operationStatus = operationStatus;
    this.amount = data.amount;
    this.currencyCode = data.currencyCode;
    this.operationDate = data.operationDate;
    this.paymentMethodTypeId = paymentMethodTypeId;
    this.operationSide = operationSide;
    this.operationRefundId = data.operationRefundId;
    this.metaData = data.metaData ?? {};
    this.relatedMsgStatus = Utils.hasEnumOrDefault(data.relatedMsgStatus, WebHookRelatedMessageStatus, undefined);
    this.eventStatusLabel = data.eventStatusLabel ?? undefined;
    this.rejectReasonCode = data.rejectReasonCode ?? undefined;
    this.rejectReasonLabel = data.rejectReasonLabel ?? undefined;
  }
}
