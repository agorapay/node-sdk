import { PaymentMethodType } from "../../../utils/enums";
import WebHook from "./WebHook";
export declare enum WebHookStatusUpdateOperationType {
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
export declare enum WebHookOperationStatus {
    Registered = "R",
    Waiting = "W",
    Cashed = "E",
    Cancelled = "C",
    Suspended = "S",
    Rejected = "R"
}
export declare enum WebHookOperationSide {
    /** Pay in (a recharge is a payin) */
    Payin = "1",
    Transfer = "0",
    Payout = "-1"
}
export declare enum WebHookRelatedMessageStatus {
    /** Customer initiates the cancellation (or usecase of SDD: Cancellation of direct debit following receipt of an unpaid amount before clearing) */
    Cancellation = "0",
    /** Transactions not completed by the client and canceled due to timeout */
    Timeout = "200",
    /** Transactions declined during acceptation process */
    Declined = "201"
}
/**
 * Class representing a webhook.
 */
export default class StatusUpdateWebHook extends WebHook {
    static readonly code = "operation";
    /** Type of payment */
    operationType: WebHookStatusUpdateOperationType;
    /** Status of the transaction */
    operationStatus: WebHookOperationStatus;
    amount: string;
    currencyCode: string;
    operationDate?: string;
    paymentMethodTypeId: PaymentMethodType;
    /** Direction of funds */
    operationSide: WebHookOperationSide;
    /**
     * Linked transaction.
     * For unpaid: transactionId of the payment transaction impacted by the unpaid
     * TransactionCase of refund: transactionId of the refunded payment transaction
     * Not present if initial transaction
     */
    operationRefundId?: string;
    /** Provision of the json as provided via API by the Marketplace. Not present if field not provided as input. */
    metaData: Record<string, any>;
    /**
     * Additional complementary information provided to the status operation.
     */
    relatedMsgStatus?: WebHookRelatedMessageStatus;
    /** Message associated to relatedMsgStatus */
    eventStatusLabel?: string;
    /** Will eventually be fed with information on operations, in particular on unpaid bills. */
    rejectReasonCode?: string;
    /** Will eventually be fed with information on operations, in particular on unpaid bills. */
    rejectReasonLabel?: string;
    constructor(data?: Partial<StatusUpdateWebHook>);
}
