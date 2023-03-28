import { TransactionStatus } from "../../utils/enums";
import Amount from "./Amount";
import Utils from "../../utils/Utils";

export default class Transaction {
  /** ID of the payment transaction. */
  public id: string;

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
  public status: TransactionStatus;

  /** ID of the payment Method used for the transaction. */
  public paymentMethodId: string;

  public amount: Amount;

  constructor(data: { [key: string]: any }) {
    const status = Utils.hasEnumOrDefault(data.status, TransactionStatus, null);
    if (!status) {
      throw new Error("Missing required field or invalid data: status");
    }

    this.id = data.id;
    this.status = status;
    this.paymentMethodId = data.paymentMethodId;
    this.amount = new Amount(data.amount);
  }
}
