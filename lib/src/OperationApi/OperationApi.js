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
var Operation_1 = require("../models/Operation");
var ApiRest_1 = require("../../utils/ApiRest");
var Utils_1 = require("../../utils/Utils");
var OperationApi = /** @class */ (function (_super) {
    __extends(OperationApi, _super);
    function OperationApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    OperationApi.prototype.listOperation = function (options) {
        options.pagination = Utils_1.default.hasIntegerOrDefault(options.pagination, 25);
        options.offset = Utils_1.default.hasIntegerOrDefault(options.offset, 0);
        return this.sendToApiPost("/operations/list", options)
            .then(function (result) {
            var _a;
            return {
                lineCount: +result.lineCount,
                offset: options.offset,
                pagination: options.pagination,
                operationList: ((_a = result.operationList) !== null && _a !== void 0 ? _a : []).map(function (x) { return new Operation_1.default(x); })
            };
        });
    };
    return OperationApi;
}(ApiRest_1.default));
exports.default = OperationApi;
