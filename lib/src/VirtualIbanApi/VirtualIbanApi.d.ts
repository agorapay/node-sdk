import ApiRest from '../../utils/apiRest.js';
import { CreateVirtualIbanOptions, CreateVirtualIbanResponse, DeleteVirtualIbanOptions, VirtualIbanListOptions, VirtualIbanListResponse } from './VirtualIbanApiInterfaces.js';
declare class VirtualIbanApi extends ApiRest {
    /**
     * Generate a virtual IBAN for an internal account without initiating a payment transaction.
     * @description Generate a virtual IBAN for an internal account without initiating a payment transaction. You can then share this virtual IBAN with your customers for their bank transfer payments (SCT)
     * @param options - The options for creating a virtual IBAN
     * @returns A promise that resolves with the created virtual IBAN details
     * @throws {Error} If the API returns a non-zero result code
     * @throws {Error} If the response is missing the required virtualIban field
     */
    create(options: CreateVirtualIbanOptions): Promise<CreateVirtualIbanResponse>;
    /**
     * Deletes a virtual IBAN.
     * @description Remove a virtual IBAN associated with an account
     * @param options - The options for deleting a virtual IBAN.
     * @returns A promise that resolves to null on successful deletion.
     * @throws {Error} If the API returns a non-zero result code.
     */
    delete(options: DeleteVirtualIbanOptions): Promise<null>;
    /**
     * Retrieves a list of virtual IBANs based on the provided options.
     * @param options - The options for filtering and paginating the virtual IBAN list
     * @returns A promise that resolves to a VirtualIbanListResponse containing the virtual IBANs and line count
     * @throws Error if the API returns a non-zero result code
     */
    virtualIbanList(options: VirtualIbanListOptions): Promise<VirtualIbanListResponse>;
}
export default VirtualIbanApi;
