import { OrderStatus, TransactionStatus } from '../../utils/enums.js';
class Payment {
    constructor(data) {
        this.orderId = +data.orderId;
        if (Object.values(OrderStatus).some((orderStatus) => orderStatus === data.orderStatus)) {
            this.orderStatus = data.orderStatus;
        }
        else {
            this.orderStatus = undefined;
        }
        this.transactionId = data.transactionId;
        if (Object.values(TransactionStatus).some((transactionStatus) => transactionStatus === data.transactionStatus)) {
            this.transactionStatus = data.transactionStatus;
        }
        else {
            this.transactionStatus = undefined;
        }
        this.virtualIban = data.virtualIban;
        this.redirectUrl = data.redirectUrl;
        this.reference = data.reference;
        this.redirectInd = data.redirectInd;
    }
}
export default Payment;
