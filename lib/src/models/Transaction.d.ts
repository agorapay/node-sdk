import { TransactionStatus } from "../../utils/enums";
import Amount from "./Amount";
export default class Transaction {
    /** ID of the payment transaction. */
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
    /** ID of the payment Method used for the transaction. */
    paymentMethodId: string;
    amount: Amount;
    constructor(data: {
        [key: string]: any;
    });
}
