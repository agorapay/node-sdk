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
var apiRest_1 = require("../../utils/apiRest");
var Alias_1 = require("../models/Alias");
var PaymentMethod_1 = require("../models/PaymentMethod");
var PaymentMethodApi = /** @class */ (function (_super) {
    __extends(PaymentMethodApi, _super);
    function PaymentMethodApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description Remove a given payment method alias
     * @param {RemoveAliasOptions} options mandate creation options.
     * @prop {PaymentMethod} transPaymentMethod: Payment method information
     * @prop {Payer} payer: Payer's details
     * @prop {Alias} alias: Alias details
     * @example
     * ````javascript
     *paymentApi.removeAlias({
       "transPaymentMethod": {
         "id": "83964924"
       },
       "payer": {
         "reference": "payer_123"
       },
       "alias": {
         "id": "228202063053068462"
       }
     }).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentMethodApi.prototype.removeAlias = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/paymentMethod/removeAlias', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    };
    /**
     * @description Retreives one ore more payment method alias for a payer
     * @param {GetAliasOptions} options mandate creation options.
     * @prop {Payer} payer: Payer's details
     * @prop {PaymentMethod | undefined} transPaymentMethod: Payment method information
     * @returns {PaymentMethodListResponse} Contains a list of payment methods with the corresponding aliases.
     * @example
     * ````javascript
     *paymentApi.removeAlias(
       "get specific aliases for card payment with an id 83964924": {
      {
        "transPaymentMethod": {
          "id": "83964924"
        },
        "payer": {
          "reference": "payer_ref"
        }
      }
      *****or*****
      "get all aliases for payer payer_ref": {
        "payer": {
          "reference": "payer_ref"
        }
      }
     ).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentMethodApi.prototype.getAlias = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/paymentMethod/getAlias', options).then(function (resp) {
                var _a, _b;
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                try {
                    success({
                        paymentMethodList: (_b = (_a = resp.paymentMethodList) === null || _a === void 0 ? void 0 : _a.map(function (x) {
                            var aliasList = x.aliasList ? x.aliasList.map(function (y) { return new Alias_1.default(y.id, y.expirationDate, y.maskedPan, y.label, y.bankCode || y.cardBrand); }) : [];
                            return new PaymentMethod_1.default(x.id, aliasList, x.label, x.type);
                        })) !== null && _b !== void 0 ? _b : []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    };
    /**
     * @description Retreives the payment methods (and their aliases) available for payment
     * @param {PaymentMethodListOptions} options List retreival options.
     * @prop {string} countryCode: Alpha 3 iso code
     * @prop {Amount} amount: Amount and currency of the transaction
     * @prop {Payer} payer: Payer's details
     * @returns {PaymentMethodListResponse} Contains a list of payment methods with the corresponding aliases.
     * @example
     * ````javascript
     *paymentApi.removeAlias(
      {
        "countryCode": "FRA",
        "amount": {
          "value": "103.67",
          "currency": "EUR"
        },
        "payer": {
          "reference": "customerTestSCT_02",
          "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
          "language": "FR",
          "IPAddress": "123.123.0.1"
        }
      }
     ).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentMethodApi.prototype.listPaymentMethod = function (options) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/paymentMethod/list', options).then(function (resp) {
                var _a, _b;
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                try {
                    success({
                        paymentMethodList: (_b = (_a = resp.paymentMethodList) === null || _a === void 0 ? void 0 : _a.map(function (x) {
                            var aliasList = x.aliasList ? x.aliasList.map(function (y) { return new Alias_1.default(y.id, y.expirationDate, y.maskedPan, y.label, y.bankCode || y.cardBrand); }) : [];
                            return new PaymentMethod_1.default(x.id, aliasList, x.label, x.type);
                        })) !== null && _b !== void 0 ? _b : []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    };
    /**
     * @description Get IBAN from a given payment method alias, as saved during an instant payment SCT
     * @param {string} paymentMethodAlias Alias of payment method.
     * @returns {GetIbanResponse} Contains unmasked IBAN.
     * @example
     * ````javascript
     *paymentApi.getIBAN(
       paymentMethodAlias: "PM202310230V3FG1100"
      }
     ).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    PaymentMethodApi.prototype.getIBAN = function (paymentMethodAlias) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/paymentMethod/getIBAN', { paymentMethodAlias: paymentMethodAlias }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                try {
                    success({
                        holder: resp.holder,
                        bic: resp.bic,
                        iban: resp.iban
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    };
    return PaymentMethodApi;
}(apiRest_1.default));
exports.default = PaymentMethodApi;
