import { TransactionStatus } from '../../utils/enums';
import Amount from './Amount';

class Transaction {
  /** Id of the payment transaction. */
  id: string;

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
  status: TransactionStatus;

  /** Id of the payment Method used for the transaction. */
  paymentMethodId: string;

  amount: Amount;

  constructor(data: { [key: string]: any }) {
    this.id = data.id;

    if (
      Object.values(TransactionStatus).some(
        (status: string) => status === data.status
      )
    ) {
      this.status = <TransactionStatus>data.transactionStatus;
    } else {
      throw new Error('Missing required field or invalid data: status');
    }

    this.paymentMethodId = data.paymentMethodId;
    this.amount = new Amount(data.amount);
  }
}

export default Transaction;
