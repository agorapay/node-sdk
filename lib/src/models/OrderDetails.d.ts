import { OrderStatus } from "../../utils/enums";
import Amount from "./Amount";
import Transaction from "./Transaction";
export default class OrderDetails {
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
    transactionList?: Transaction[];
    constructor(data: {
        [key: string]: any;
    });
}
