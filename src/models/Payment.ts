import { OrderStatus, TransactionStatus } from "../../utils/enums";
import Utils from "../../utils/Utils";

export default class Payment {
  /** Order id obtained in order creation and to provide in each next request. */
  public orderId?: number;

  /**
   * Status of an order. the following status can be provided:
   * * `Created`: The order is created
   * * `PendingPayment`: Payment in progress
   * * `Complete`: Payment is completed
   * * `PartialComplete`: Payment is completed but all order amount is not payed
   * * `Canceled`: The order is canceled
   */
  public orderStatus?: OrderStatus;

  /** Id of the payment transaction. */
  public transactionId?: string;

  /**
   * Status of a transaction. The following value may be provided:
   * * `Created`: The transaction is just created. No payment is already made.
   * * `InProgress`: Payment is in progress
   * * `Accepted`: Payment is accepted
   * * `Completed`: Payment confirmation is received
   * * `Canceled`: Payment is canceled
   * * `Refused`: payment is refused
   * * `Abandonned` : Payment is not performed
   */
  public transactionStatus?: TransactionStatus;

  /** Iban to make payment to for SCT or SWIFT method */
  public virtualIban?: string;

  /** Url to redirect the client to to continue the payment with an external partner. The marketplace must redirect his/her client to this url to continue payment process.  */
  public redirectUrl?: string;

  /** Mandate reference. */
  public reference?: string;

  /** 1 if user must be redirect to the redirectUrl site. */
  public redirectInd?: string;

  constructor(data: { [key: string]: any }) {
    this.orderId = Utils.hasIntegerOrDefault(data.orderId, undefined);
    this.orderStatus = Utils.hasEnumOrDefault(data.orderStatus, OrderStatus, undefined);
    this.transactionId = data.transactionId;
    this.transactionStatus = Utils.hasEnumOrDefault(data.transactionStatus, TransactionStatus, undefined);
    this.virtualIban = data.virtualIban;
    this.redirectUrl = data.redirectUrl;
    this.reference = data.reference;
    this.redirectInd = data.redirectInd;
  }
}

