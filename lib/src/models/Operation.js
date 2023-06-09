"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Breakdown_1 = require("./Breakdown");
const Amount_1 = require("./Amount");
const Utils_1 = require("../../utils/Utils");
const enums_1 = require("../../utils/enums");
class Operation {
    /** Amount of the operation */
    amount;
    /** Reference for the operation */
    transactionId;
    /** direction of the operation */
    side;
    /** status of the operation */
    status;
    /** Marketplace reference for this order */
    orderReference;
    /** type of the operation */
    type;
    /** operation Date */
    date;
    /** Key identifier of the payment method type id */
    paymentMethodKey;
    /** BIC SEPA or SWIFT (Bank Identifier Code) */
    bic;
    /** */
    label;
    /** Reference of the initial operation (in case of reimbursement) */
    parentReference;
    /** breakdownList for payin */
    breakdownList = [];
    /** Account type issuer in case of a payout or transfer */
    issuerAccountType;
    /** Third Party issuer in case of a payout or transfer */
    issuerThirdParty;
    /** Issuer account number in case of a payout or transfer */
    issuerAccountNumber;
    /** Issuer account currency in case of a payout or transfer */
    issuerAccountCurrency;
    /** Receiver Third Party in case of transfer or recharge */
    receiverThirdParty;
    /** Receiver account type  in case of transfer or recharge */
    receiverAccountType;
    /** Receiver account number in case of transfer or recharge */
    receiverAccountNumber;
    /** Receiver account currency in case of transfer or recharge */
    receiverAccountCurrency;
    /** JSON data for the marketplace. This data is not used by payment system */
    metaData;
    /** ISO 8601 format (ex: 20210325T082300+01:00) */
    creationDateTime;
    /** Virtual Iban for payin */
    iban;
    /**  */
    accountType;
    /** A string representing the account number */
    accountNumber;
    /** Currency code in 3 characters ISO format */
    accountCurrency;
    /** Amount already cached. */
    cachedCumulAmount;
    /** Label of the operation. */
    operationLabel;
    /** Status explanation. */
    relatedMsgStatusLabel;
    /**  */
    thirdPartyName;
    /** A string representing the account number. */
    accountCptNumber;
    /**  */
    accountCptTypeLabel;
    /** Currency code in 3 characters ISO format. */
    accountCptCurrencyCode;
    /**  */
    thirdPartyCptName;
    constructor(data) {
        const side = Utils_1.default.hasEnumOrDefault(data.side, enums_1.OperationSide, null);
        const status = Utils_1.default.hasEnumOrDefault(data.status, enums_1.OperationStatus, null);
        const type = Utils_1.default.hasEnumOrDefault(data.type, enums_1.OperationType, null);
        if (!data.transactionId) {
            throw new Error("Missing required field: transactionId");
        }
        else if (!side) {
            throw new Error("Missing required field or invalid data: side");
        }
        else if (!status) {
            throw new Error("Missing required field or invalid data: status");
        }
        else if (!type) {
            throw new Error("Missing required field or invalid data: type");
        }
        // required data
        this.amount = new Amount_1.default(data.amount);
        this.transactionId = data.transactionId;
        this.side = side;
        this.status = status;
        this.type = type;
        this.accountType = Utils_1.default.hasEnumOrDefault(data.accountType, enums_1.AccountType, undefined);
        this.accountCptTypeLabel = Utils_1.default.hasEnumOrDefault(data.accountCptTypeLabel, enums_1.AccountType, undefined);
        // not required
        this.date = Utils_1.default.stringToDate(data.date);
        this.parentReference = data.parentReference;
        this.orderReference = data.orderReference;
        this.paymentMethodKey = data.paymentMethodKey;
        this.bic = data.bic;
        this.label = data.label;
        this.breakdownList = (data.breakdownList ?? []).map((x) => new Breakdown_1.default(x));
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
    }
}
exports.default = Operation;
