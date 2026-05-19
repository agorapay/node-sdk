import { VirtualIbanStatus, VirtualIbanMode } from '../../utils/enums.js';
/**
 * Class representing a virtual IBAN info.
 */
declare class VirtualIbanInfo {
    /** Marketplace or merchant account number. */
    accountNumber?: string;
    /** Generated virtual IBAN. */
    virtualIBAN?: string;
    /** */
    status?: VirtualIbanStatus;
    /**  */
    mode?: VirtualIbanMode;
    /** Payer reference associated to the virtual IBAN. */
    payerRef?: string;
    constructor(data: {
        [key: string]: any;
    });
}
export default VirtualIbanInfo;
