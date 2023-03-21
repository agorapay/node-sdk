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
var PayoutApi = /** @class */ (function (_super) {
    __extends(PayoutApi, _super);
    function PayoutApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Ask for a payout.
     * @description Submit a payout for a specific account.
     * @param {CreatePayoutOptions} options payout creation options.
     * @prop {string | undefined} endToEndId - Use to identify transaction in SEPA transfer.
     * @prop {Amount} payoutAmount - The payout amount.
     * @prop {string} paymentMethodAlias - Alias for the payment method.
     * @prop {string} accountNumber - A string representing the account number.
     * @prop {Commission | undefined} commission - The payout commission.
     * @prop {string | undefined} metaData - JSON data for the marketplace. This data is not used by payment system.
     * @prop {string | undefined} reason - Operation label transmitted in payment system. Maximum length of 140 characters.
     * @returns {number} The payout transaction Id.
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
    PayoutApi.prototype.createPayout = function (options) {
        return this.sendToApiPost("/payout/create", options)
            .then(function (result) { return result.transactionId; });
    };
    return PayoutApi;
}(ApiRest_1.default));
exports.default = PayoutApi;
