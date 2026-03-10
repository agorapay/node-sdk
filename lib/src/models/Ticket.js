"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Amount_1 = __importDefault(require("./Amount"));
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
        if (Object.values(enums_1.TransactionStatus).some((transactionStatus) => transactionStatus === data.transactionStatus)) {
            this.transactionStatus = data.transactionStatus;
        }
        else {
            this.transactionStatus = undefined;
        }
        this.operationDate = data.operationDate;
        this.operationTime = data.operationTime;
        this.safe = data.safe;
        if (Object.values(enums_1.TicketSide).some((type) => type === data.type.toString())) {
            this.type = data.type.toString();
        }
        else {
            this.type = undefined;
        }
        this.authNumber = data.authNumber;
        this.transNumber = data.transNumber;
        this.amount = data.amount ? new Amount_1.default(data.amount) : undefined;
        if (Object.values(enums_1.TicketMode).some((mode) => mode === data.mode)) {
            this.mode = data.mode;
        }
        else {
            this.mode = undefined;
        }
        this.fileContent = data.fileContent;
        this.contract = data.contract;
    }
}
exports.default = Ticket;
