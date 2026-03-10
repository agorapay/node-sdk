"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Breakdown_1 = __importDefault(require("./Breakdown"));
const Amount_1 = __importDefault(require("./Amount"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
const enums_1 = require("../../utils/enums");
class Operation {
    constructor(data) {
        /** breakdownList for payin */
        this.breakdownList = [];
        // required data
        this.amount = new Amount_1.default(data.amount);
        if (data.transactionId)
            this.transactionId = data.transactionId;
        else
            throw new Error('Missing required field: transactionId');
        if (data.side &&
            Object.values(enums_1.OperationSide).some((side) => side === data.side)) {
            this.side = data.side;
        }
        else {
            throw new Error('Missing required field or invalid data: side');
        }
        if (data.status &&
            Object.values(enums_1.OperationStatus).some((status) => status === data.status)) {
            this.status = data.status;
        }
        else {
            throw new Error('Missing required field or invalid data: status');
        }
        if (data.type &&
            Object.values(enums_1.OperationType).some((type) => type === data.type)) {
            this.type = data.type;
        }
        else {
            throw new Error('Missing required field or invalid data: type');
        }
        if (data.accountType &&
            Object.values(enums_1.AccountType).some((accountType) => accountType === data.accountType)) {
            this.accountType = data.accountType;
        }
        if (data.accountCptTypeLabel &&
            Object.values(enums_1.AccountType).some((accountCptTypeLabel) => accountCptTypeLabel === data.accountCptTypeLabel)) {
            this.accountCptTypeLabel = data.accountCptTypeLabel;
        }
        // not required
        this.date = Utils_1.default.stringToDate(data.date);
        this.parentReference = data.parentReference;
        this.orderReference = data.orderReference;
        this.paymentMethodKey = data.paymentMethodKey;
        this.bic = data.bic;
        this.label = data.label;
        this.breakdownList = [];
        if (data.breakdownList) {
            this.breakdownList = data.breakdownList.map((x) => new Breakdown_1.default(x));
        }
        this.issuerAccountType = data.issuerAccountType;
        this.issuerThirdParty = data.issuerThirdParty;
        this.issuerAccountNumber = data.issuerAccountNumber;
        this.issuerAccountCurrency = data.issuerAccountCurrency;
        this.receiverThirdParty = data.receiverThirdParty;
        this.receiverAccountType = data.receiverAccountType;
        this.receiverAccountNumber = data.receiverAccountNumber;
        this.receiverAccountCurrency = data.receiverAccountCurrency;
        this.metaData = data.metaData;
        this.creationDateTime = data.creationDateTime;
        this.iban = data.iban;
        this.accountNumber = data.accountNumber;
        this.accountCurrency = data.accountCurrency;
        this.cachedCumulAmount = data.cachedCumulAmount;
        this.operationLabel = data.operationLabel;
        this.relatedMsgStatusLabel = data.relatedMsgStatusLabel;
        this.thirdPartyName = data.thirdPartyName;
        this.accountCptNumber = data.accountCptNumber;
        this.accountCptCurrencyCode = data.accountCptCurrencyCode;
        this.thirdPartyCptName = data.thirdPartyCptName;
        this.internalRemittance = data.internalRemittance;
        this.payerRef = data.payerRef;
        this.endToEndId = data.endToEndId;
        this.remittanceInformation = data.remittanceInformation;
    }
}
exports.default = Operation;
