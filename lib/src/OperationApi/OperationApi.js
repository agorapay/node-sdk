"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operation_1 = require("../models/Operation");
const ApiRest_1 = require("../../utils/ApiRest");
const Utils_1 = require("../../utils/Utils");
class OperationApi extends ApiRest_1.default {
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
        options.pagination = Utils_1.default.hasIntegerOrDefault(options.pagination, 25);
        options.offset = Utils_1.default.hasIntegerOrDefault(options.offset, 0);
        return this.sendToApiPost("/operations/list", options)
            .then(result => {
            return {
                lineCount: +result.lineCount,
                offset: options.offset,
                pagination: options.pagination,
                operationList: (result.operationList ?? []).map((x) => new Operation_1.default(x))
            };
        });
    }
}
exports.default = OperationApi;
