import { TransactionStatus, TicketSide, TicketMode } from '../../utils/enums.js';
import Amount from './Amount.js';
class Ticket {
    /**
     * @constructor
     * @param data - Object which contains required ticket attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    constructor(data) {
        this.transactionId = data.transactionId;
        this.name = data.name;
        this.brand = data.brand;
        this.maskedPan = data.maskedPan;
        if (Object.values(TransactionStatus).some((transactionStatus) => transactionStatus === data.transactionStatus)) {
            this.transactionStatus = data.transactionStatus;
        }
        else {
            this.transactionStatus = undefined;
        }
        this.operationDate = data.operationDate;
        this.operationTime = data.operationTime;
        this.safe = data.safe;
        if (Object.values(TicketSide).some((type) => type === data.type.toString())) {
            this.type = data.type.toString();
        }
        else {
            this.type = undefined;
        }
        this.authNumber = data.authNumber;
        this.transNumber = data.transNumber;
        this.amount = data.amount ? new Amount(data.amount) : undefined;
        if (Object.values(TicketMode).some((mode) => mode === data.mode)) {
            this.mode = data.mode;
        }
        else {
            this.mode = undefined;
        }
        this.fileContent = data.fileContent;
        this.contract = data.contract;
    }
}
export default Ticket;
