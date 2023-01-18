"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Breakdown_1 = require("./Breakdown");
var Amount_1 = require("./Amount");
var Utils_1 = require("../../utils/Utils");
var enums_1 = require("../../utils/enums");
var Operation = /** @class */ (function () {
    function Operation(data) {
        var _a;
        /** breakdownList for payin */
        this.breakdownList = [];
        var side = Utils_1.default.hasEnumOrDefault(data.side, enums_1.OperationSide, null);
        var status = Utils_1.default.hasEnumOrDefault(data.status, enums_1.OperationStatus, null);
        var type = Utils_1.default.hasEnumOrDefault(data.type, enums_1.OperationType, null);
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
        this.breakdownList = ((_a = data.breakdownList) !== null && _a !== void 0 ? _a : []).map(function (x) { return new Breakdown_1.default(x); });
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
    return Operation;
}());
exports.default = Operation;
