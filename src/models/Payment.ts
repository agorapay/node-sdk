import { OrderStatus, TransactionStatus } from '../../utils/enums';

class Payment {
  /** Order id obtained in order creation and to provide in each next request. */
  orderId?: number;

  /**
   * Status of an order. the following status can be provided:
   * * `Created`: The order is created
   * * `PendingPayment`: Payment in progress
   * * `Complete`: Payment is completed
   * * `PartialComplete`: Payment is completed but all order amount is not payed
   * * `Canceled`: The order is canceled
   */
  orderStatus?: OrderStatus;

  /** Id of the payment transaction. */
  transactionId?: string;

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
  transactionStatus?: TransactionStatus;

  /** Iban to make payment to for SCT or SWIFT method */
  virtualIban?: string;

  /** Url to redirect the client to to continue the payment with an external partner. The marketplace must redirect his/her client to this url to continue payment process.  */
  redirectUrl?: string;

  /** Mandate reference. */
  reference?: string;

  /** 1 if user must be redirect to the redirectUrl site. */
  redirectInd?: string;

  constructor(data: { [key: string]: any }) {
    this.orderId = +data.orderId;

    if (
      Object.values(OrderStatus).some(
        (orderStatus: string) => orderStatus === data.orderStatus
      )
    ) {
      this.orderStatus = <OrderStatus>data.orderStatus;
    } else {
      this.orderStatus = undefined;
    }

    this.transactionId = data.transactionId;

    if (
      Object.values(TransactionStatus).some(
        (transactionStatus: string) =>
          transactionStatus === data.transactionStatus
      )
    ) {
      this.transactionStatus = <TransactionStatus>data.transactionStatus;
    } else {
      this.transactionStatus = undefined;
    }

    this.virtualIban = data.virtualIban;
    this.redirectUrl = data.redirectUrl;
    this.reference = data.reference;
    this.redirectInd = data.redirectInd;
  }
}

export default Payment;
