import Operation from '../models/Operation';
import ApiRest from '../../utils/apiRest';
import {
  ListOperationOptions,
  ListOperationResponse
} from './OperationInterfaces';

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
    return new Promise((success, reject) => {
      if (!options.pagination) options.pagination = 25;
      if (!options.offset) options.offset = 0;

      return this.sendToApiPost('/operations/list', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success({
              lineCount: +resp.lineCount,
              offset: options.offset,
              pagination: options.pagination,
              operationList:
                resp.operationList?.map((x: any) => new Operation(x)) ?? []
            });
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  }
}

export default OperationApi;
