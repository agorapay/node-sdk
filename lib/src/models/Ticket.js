"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Ticket = /** @class */ (function () {
    /**
     * @constructor
     * @param data - Object which contains required ticket attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    function Ticket(data) {
        this.transactionId = data.transactionId;
        this.name = data.name;
        this.brand = data.brand;
        this.maskedPan = data.maskedPan;
        if (Object.values(enums_1.TransactionStatus).some(function (transactionStatus) {
            return transactionStatus === data.transactionStatus;
        })) {
            this.transactionStatus = data.transactionStatus;
        }
        else {
            this.transactionStatus = undefined;
        }
        this.operationDate = data.operationDate;
        this.operationTime = data.operationTime;
        this.safe = data.safe;
        if (Object.values(enums_1.TicketSide).some(function (type) { return type === data.type.toString(); })) {
            this.type = data.type.toString();
        }
        else {
            this.type = undefined;
        }
        this.authNumber = data.authNumber;
        this.transNumber = data.transNumber;
        this.amount = data.amount ? new Amount_1.default(data.amount) : undefined;
        if (Object.values(enums_1.TicketMode).some(function (mode) { return mode === data.mode; })) {
            this.mode = data.mode;
        }
        else {
            this.mode = undefined;
        }
        this.fileContent = data.fileContent;
        this.contract = data.contract;
    }
    return Ticket;
}());
exports.default = Ticket;
