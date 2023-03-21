"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiRest_1 = require("../../utils/ApiRest");
var TransferApi = /** @class */ (function (_super) {
    __extends(TransferApi, _super);
    function TransferApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Ask for a transfer between two accounts.
     * @description submit a transfer from one account (accountNumber) to another (accountCtpNumber).
     * @param {CreateTransferOptions} options transfer creation options.
     * @prop {string} accountCptNumber - A string representing the account number.
     * @prop {Amount} transferAmount - The transfer amount.
     * @prop {string} accountNumber - A string representing the account number.
     * @prop {string | undefined} orderRef - Marketplace reference for this order. Characters authorized are: a to z, A to Z, 0 to 9 and - / . + _ and space.
     * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
     * @prop {string} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
     * @returns {string} The transfer transaction Id.
     * @example
     * ````javascript
     payoutApi.createPayout({
        endToEndId: "1",
        accountNumber: "12345678",
        paymentMethodAlias: "12334566",
        payoutAmount: new Amount(10000, "EUR")
      }).then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
     * ````
     */
    TransferApi.prototype.createTransfer = function (options) {
        return this.sendToApiPost("/transfer/create", options)
            .then(function (result) { return result.transactionId; });
    };
    return TransferApi;
}(ApiRest_1.default));
exports.default = TransferApi;
