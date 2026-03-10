import { TransactionStatus, TicketSide, TicketMode } from '../../utils/enums';
import Amount from './Amount';
declare class Ticket {
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
    constructor(data: {
        [key: string]: any;
    });
}
export default Ticket;
