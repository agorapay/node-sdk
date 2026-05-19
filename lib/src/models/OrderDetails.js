import { OrderStatus } from '../../utils/enums.js';
import Amount from './Amount.js';
import Transaction from './Transaction.js';
class OrderDetails {
    constructor(data) {
        this.orderAmount = data.orderAmount
            ? new Amount(data.orderAmount)
            : undefined;
        this.orderRemainingAmount = data.orderRemainingAmount
            ? new Amount(data.orderRemainingAmount)
            : undefined;
        this.orderId = +data.orderId;
        if (Object.values(OrderStatus).some((orderStatus) => orderStatus === data.orderStatus)) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionList = data.transactionList
            ? data.transactionList.map((x) => new Transaction(x))
            : undefined;
    }
}
export default OrderDetails;
