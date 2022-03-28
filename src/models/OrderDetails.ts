import { OrderStatus } from '../../utils/enums';
import Amount from './Amount';
import Transaction from './Transaction';

class OrderDetails {
  /**  */
  orderAmount?: Amount;
  /**  */
  orderRemainingAmount?: Amount;
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
  /** */
  transactionList?: Array<Transaction>;

  constructor(data: { [key: string]: any }) {
    this.orderAmount = data.orderAmount
      ? new Amount(data.orderAmount)
      : undefined;
    this.orderRemainingAmount = data.orderRemainingAmount
      ? new Amount(data.orderRemainingAmount)
      : undefined;
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

    this.transactionList = data.transactionList
      ? data.transactionList.map((x: any) => new Transaction(x))
      : undefined;
  }
}

export default OrderDetails;
