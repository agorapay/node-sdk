"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
const Alias_1 = __importDefault(require("../models/Alias"));
const PaymentMethod_1 = __importDefault(require("../models/PaymentMethod"));
class PaymentMethodApi extends apiRest_1.default {
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
    removeAlias(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentMethod/removeAlias', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    getAlias(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentMethod/getAlias', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        paymentMethodList: resp.paymentMethodList?.map((x) => {
                            const aliasList = x.aliasList
                                ? x.aliasList.map((y) => new Alias_1.default(y.id, y.expirationDate, y.maskedPan, y.label, y.bankCode || y.cardBrand))
                                : [];
                            return new PaymentMethod_1.default(x.id, aliasList, x.label, x.type);
                        }) ?? []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    listPaymentMethod(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentMethod/list', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        paymentMethodList: resp.paymentMethodList?.map((x) => {
                            const aliasList = x.aliasList
                                ? x.aliasList.map((y) => new Alias_1.default(y.id, y.expirationDate, y.maskedPan, y.label, y.bankCode || y.cardBrand))
                                : [];
                            return new PaymentMethod_1.default(x.id, aliasList, x.label, x.type);
                        }) ?? []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
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
    getIBAN(paymentMethodAlias) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/paymentMethod/getIBAN', {
                paymentMethodAlias
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
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
    }
}
exports.default = PaymentMethodApi;
