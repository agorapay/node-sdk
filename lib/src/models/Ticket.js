"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = require("./Amount");
const Utils_1 = require("../../utils/Utils");
class Ticket {
    /** ID of the payment transaction. */
    transactionId;
    name;
    brand;
    maskedPan;
    /** Status of a transaction. The following value may be provided: */
    transactionStatus;
    /** Date of the requested operation. The format must be YYYYMMDD */
    operationDate;
    /** Operation time in HH:MM:SS format */
    operationTime;
    /** Y if 3DS is verified */
    safe;
    type;
    authNumber;
    /** Transaction number in PSP. */
    transNumber;
    amount;
    mode;
    /** PDF file content base64 encoded, if format is P */
    fileContent;
    /** Payment partner contract number. */
    contract;
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
        this.transactionStatus = Utils_1.default.hasEnumOrDefault(data.transactionStatus, enums_1.TransactionStatus, undefined);
        this.operationDate = data.operationDate;
        this.operationTime = data.operationTime;
        this.safe = data.safe;
        this.type = Utils_1.default.hasEnumOrDefault(data.type, enums_1.TicketSide, undefined);
        this.authNumber = data.authNumber;
        this.transNumber = data.transNumber;
        this.amount = data.amount ? new Amount_1.default(data.amount) : undefined;
        this.mode = Utils_1.default.hasEnumOrDefault(data.mode, enums_1.TicketMode, undefined);
        this.fileContent = data.fileContent;
        this.contract = data.contract;
    }
}
exports.default = Ticket;
