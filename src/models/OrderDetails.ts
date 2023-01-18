import { OrderStatus } from "../../utils/enums";
import Amount from "./Amount";
import Transaction from "./Transaction";
import Utils from "../../utils/Utils";

export default class OrderDetails {
  /**  */
  public orderAmount?: Amount;
  /**  */
  public orderRemainingAmount?: Amount;
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
  /** */
  public transactionList?: Transaction[];

  constructor(data: { [key: string]: any }) {
    this.orderAmount = data.orderAmount ? new Amount(data.orderAmount) : undefined;
    this.orderRemainingAmount = data.orderRemainingAmount ? new Amount(data.orderRemainingAmount) : undefined;
    this.orderId = +data.orderId;
    this.orderStatus = Utils.hasEnumOrDefault(data.orderStatus, OrderStatus, undefined);
    this.transactionList = data.transactionList?.map((x: any) => new Transaction(x)) ?? undefined;
  }
}
