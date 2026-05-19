import { TransactionStatus } from '../../utils/enums.js';
import Amount from './Amount.js';
class Transaction {
    constructor(data) {
        this.id = data.id;
        if (Object.values(TransactionStatus).some((status) => status === data.status)) {
            this.status = data.transactionStatus;
        }
        else {
            throw new Error('Missing required field or invalid data: status');
        }
        this.paymentMethodId = data.paymentMethodId;
        this.amount = new Amount(data.amount);
    }
}
export default Transaction;
