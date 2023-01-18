import Operation from "../models/Operation";
import ApiRest from "../../utils/ApiRest";
import { ListOperationOptions, ListOperationResponse } from "./OperationInterfaces";
import Utils from "../../utils/Utils";

class OperationApi extends ApiRest {
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
  listOperation(options: ListOperationOptions): Promise<ListOperationResponse> {
    options.pagination = Utils.hasIntegerOrDefault(options.pagination, 25);
    options.offset = Utils.hasIntegerOrDefault(options.offset, 0);

    return this.sendToApiPost<ListOperationResponse>("/operations/list", options)
      .then(result => {
        return {
          lineCount: +result.lineCount,
          offset: options.offset,
          pagination: options.pagination,
          operationList: (result.operationList ?? []).map((x: any) => new Operation(x))
        };
      });
  }
}

export default OperationApi;
