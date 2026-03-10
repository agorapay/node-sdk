"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operation_1 = __importDefault(require("../models/Operation"));
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
class OperationApi extends apiRest_1.default {
    /**
     * get operations matching a set of criterias.
     * @description Retrieve operation from criteria.
     * @param {ListOperationOptions} options operation listing options
     * @prop {string | undefined} startDate: Begin date of operation reporting in YYYYMMDDHHMMSS format
     * @prop {string | undefined} endDate: Ended Date of operation Reporting in YYYYMMDDHHMMSS format
     * @prop {number | undefined} maxAmount
     * @prop {number | undefined} minAmount
     * @prop {string | undefined} orderReference: Marketplace reference for this order
     * @prop {string | undefined} currency: Currency code in 3 characters ISO format
     * @prop {number | undefined} transactionId: Id of the payment transaction
     * @prop {string | undefined} paymentMethodKey: Key identifier of the payment method type id
     * @prop {string | undefined} sellerAccountNumber: Account number of the merchant
     * @prop {string | undefined} parentAccountNumber: A string representing the account number
     * @returns {Array<Operation>} A list of operation
     * @example
     * ````javascript
      OperationApi.list({
        
      }).then(operationList => {
          console.log(operationList)
      })
     * ````
     */
    listOperation(options) {
        return new Promise((success, reject) => {
            if (!options.pagination)
                options.pagination = 25;
            if (!options.offset)
                options.offset = 0;
            return this.sendToApiPost('/operations/list', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        lineCount: +resp.lineCount,
                        offset: options.offset,
                        pagination: options.pagination,
                        operationList: resp.operationList?.map((x) => new Operation_1.default(x)) ?? []
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.default = OperationApi;
