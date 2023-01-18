"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Amount_1 = require("./Amount");
var Utils_1 = require("../../utils/Utils");
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
    return Ticket;
}());
exports.default = Ticket;
