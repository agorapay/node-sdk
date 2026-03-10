import { TransactionStatus, TicketSide, TicketMode } from '../../utils/enums';
import Amount from './Amount';

class Ticket {
  /** Id of the payment transaction. */
  transactionId?: string;

  name?: string;
  brand?: string;
  maskedPan?: string;
  /** Status of a transaction. The following value may be provided: */
  transactionStatus?: TransactionStatus;

  /** Date of the requested operation. The format must be YYYYMMDD */
  operationDate?: string;

  /** Operation time in HH:MM:SS format */
  operationTime?: string;

  /** Y if 3DS is verified */
  safe?: string;

  type?: TicketSide;

  authNumber?: string;
  /** Transaction number in PSP. */
  transNumber?: string;

  amount?: Amount;
  mode?: TicketMode;

  /** PDF file content base64 encoded, if format is P */
  fileContent?: string;

  /** Payment partner contract number. */
  contract?: string;

  /**
   * @constructor
   * @param data - Object which contains required ticket attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any }) {
    this.transactionId = data.transactionId;
    this.name = data.name;
    this.brand = data.brand;
    this.maskedPan = data.maskedPan;

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

    this.operationDate = data.operationDate;
    this.operationTime = data.operationTime;
    this.safe = data.safe;

    if (
      Object.values(TicketSide).some(
        (type: string) => type === data.type.toString()
      )
    ) {
      this.type = <TicketSide>data.type.toString();
    } else {
      this.type = undefined;
    }

    this.authNumber = data.authNumber;
    this.transNumber = data.transNumber;

    this.amount = data.amount ? new Amount(data.amount) : undefined;

    if (Object.values(TicketMode).some((mode: string) => mode === data.mode)) {
      this.mode = <TicketMode>data.mode;
    } else {
      this.mode = undefined;
    }

    this.fileContent = data.fileContent;
    this.contract = data.contract;
  }
}

export default Ticket;
