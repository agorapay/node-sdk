import ApiRest from '../../utils/apiRest.js';
import VirtualIbanInfo from '../models/VirtualIbanInfo.js';
class VirtualIbanApi extends ApiRest {
    /**
     * Generate a virtual IBAN for an internal account without initiating a payment transaction.
     * @description Generate a virtual IBAN for an internal account without initiating a payment transaction. You can then share this virtual IBAN with your customers for their bank transfer payments (SCT)
     * @param options - The options for creating a virtual IBAN
     * @returns A promise that resolves with the created virtual IBAN details
     * @throws {Error} If the API returns a non-zero result code
     * @throws {Error} If the response is missing the required virtualIban field
     */
    create(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/vIban/create', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                if (!resp.virtualIban)
                    reject(new Error('Missing required field: virtualIban'));
                else {
                    try {
                        success({
                            virtualIban: resp.virtualIban
                        });
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            }).catch((err) => {
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
    delete(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/vIban/delete', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(null);
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            }).catch((err) => {
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
    virtualIbanList(options) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/vIban/list', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                try {
                    success({
                        lineCount: +resp.lineCount,
                        virtualIBANList: resp.virtualIBANList?.map((x) => new VirtualIbanInfo(x)) ?? []
                    });
                }
                catch (err) {
                    reject(err);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
export default VirtualIbanApi;
