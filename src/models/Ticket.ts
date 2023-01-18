import { TicketMode, TicketSide, TransactionStatus } from "../../utils/enums";
import Amount from "./Amount";
import Utils from "../../utils/Utils";

export default class Ticket {
  /** ID of the payment transaction. */
  public transactionId?: string;
  public name?: string;
  public brand?: string;
  public maskedPan?: string;
  /** Status of a transaction. The following value may be provided: */
  public transactionStatus?: TransactionStatus;
  /** Date of the requested operation. The format must be YYYYMMDD */
  public operationDate?: string;
  /** Operation time in HH:MM:SS format */
  public operationTime?: string;
  /** Y if 3DS is verified */
  public safe?: string;
  public type?: TicketSide;
  public authNumber?: string;
  /** Transaction number in PSP. */
  public transNumber?: string;
  public amount?: Amount;
  public mode?: TicketMode;
  /** PDF file content base64 encoded, if format is P */
  public fileContent?: string;
  /** Payment partner contract number. */
  public contract?: string;

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
    this.transactionStatus = Utils.hasEnumOrDefault(data.transactionStatus, TransactionStatus, undefined);
    this.operationDate = data.operationDate;
    this.operationTime = data.operationTime;
    this.safe = data.safe;
    this.type = Utils.hasEnumOrDefault(data.type, TicketSide, undefined);
    this.authNumber = data.authNumber;
    this.transNumber = data.transNumber;
    this.amount = data.amount ? new Amount(data.amount) : undefined;
    this.mode = Utils.hasEnumOrDefault(data.mode, TicketMode, undefined);
    this.fileContent = data.fileContent;
    this.contract = data.contract;
  }
}
