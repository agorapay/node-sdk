import ApiRest from '../../utils/apiRest.js';
import VirtualIbanInfo from '../models/VirtualIbanInfo.js';
import { 
  CreateVirtualIbanOptions, 
  CreateVirtualIbanResponse, 
  DeleteVirtualIbanOptions, 
  VirtualIbanListOptions, 
  VirtualIbanListResponse} from './VirtualIbanApiInterfaces.js';

class VirtualIbanApi extends ApiRest {

  /**
   * Generate a virtual IBAN for an internal account without initiating a payment transaction.
   * @description Generate a virtual IBAN for an internal account without initiating a payment transaction. You can then share this virtual IBAN with your customers for their bank transfer payments (SCT)
   * @param options - The options for creating a virtual IBAN
   * @returns A promise that resolves with the created virtual IBAN details
   * @throws {Error} If the API returns a non-zero result code
   * @throws {Error} If the response is missing the required virtualIban field
   */
  create (options: CreateVirtualIbanOptions)
  : Promise<CreateVirtualIbanResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/vIban/create', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          if (!resp.virtualIban)
            reject(new Error('Missing required field: virtualIban'));
          else {
            try {
              success({
                virtualIban: resp.virtualIban
              });
            } catch (err: any) {
              reject(err);
            }
          }
        }
      ).catch((err: any) => {
        reject(err);
      });
    });
  }

  /**
   * Deletes a virtual IBAN.
   * @description Remove a virtual IBAN associated with an account
   * @param options - The options for deleting a virtual IBAN.
   * @returns A promise that resolves to null on successful deletion.
   * @throws {Error} If the API returns a non-zero result code.
   */
  delete (options: DeleteVirtualIbanOptions)
  : Promise<null> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/vIban/delete', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          else {
            try {
              success(null);
            } catch (err: any) {
              reject(err);
            }
          }
        }
      ).catch((err: any) => {
        reject(err);
      });
    });
  }

  /**
   * Retrieves a list of virtual IBANs based on the provided options.
   * @param options - The options for filtering and paginating the virtual IBAN list
   * @returns A promise that resolves to a VirtualIbanListResponse containing the virtual IBANs and line count
   * @throws Error if the API returns a non-zero result code
   */
  virtualIbanList (options: VirtualIbanListOptions)
  : Promise<VirtualIbanListResponse> {
    return new Promise((success, reject) => {
      return this.sendToApiPost('/vIban/list', options).then(
        (resp: any) => {
          if (+resp.resultCode !== 0)
            reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
          try {
            success({
              lineCount: +resp.lineCount,
              virtualIBANList:
                resp.virtualIBANList?.map((x: any) => new VirtualIbanInfo(x)) ?? []
            });
          } catch (err: any) {
            reject(err);
          }
        }
      ).catch((err: any) => {
        reject(err);
      });
    });
  }

}

export default VirtualIbanApi;