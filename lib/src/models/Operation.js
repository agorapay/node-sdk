import Breakdown from './Breakdown.js';
import Amount from './Amount.js';
import Utils from '../../utils/Utils.js';
import { AccountType, OperationSide, OperationStatus, OperationType } from '../../utils/enums.js';
class Operation {
    constructor(data) {
        /** breakdownList for payin */
        this.breakdownList = [];
        // required data
        this.amount = new Amount(data.amount);
        if (data.transactionId)
            this.transactionId = data.transactionId;
        else
            throw new Error('Missing required field: transactionId');
        if (data.side &&
            Object.values(OperationSide).some((side) => side === data.side)) {
            this.side = data.side;
        }
        else {
            throw new Error('Missing required field or invalid data: side');
        }
        const statusIn = data.status || data.operationStatus;
        if (statusIn &&
            Object.values(OperationStatus).some((status) => status === statusIn)) {
            this.status = statusIn;
        }
        else {
            throw new Error('Missing required field or invalid data: status');
        }
        const typeIn = data.type || data.operationType;
        if (typeIn &&
            Object.values(OperationType).some((type) => type === typeIn)) {
            this.type = typeIn;
        }
        else {
            throw new Error('Missing required field or invalid data: type');
        }
        if (data.accountType &&
            Object.values(AccountType).some((accountType) => accountType === data.accountType)) {
            this.accountType = data.accountType;
        }
        if (data.accountCptTypeLabel &&
            Object.values(AccountType).some((accountCptTypeLabel) => accountCptTypeLabel === data.accountCptTypeLabel)) {
            this.accountCptTypeLabel = data.accountCptTypeLabel;
        }
        // not required
        this.date = Utils.stringToDate(data.date);
        this.parentReference = data.parentReference;
        this.orderReference = data.orderReference;
        this.paymentMethodKey = data.paymentMethodKey;
        this.bic = data.bic;
        this.label = data.label;
        this.breakdownList = [];
        if (data.breakdownList) {
            this.breakdownList = data.breakdownList.map((x) => new Breakdown(x));
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
export default Operation;
