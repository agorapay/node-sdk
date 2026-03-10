import Encodable from './Encodable';
/** Class representing an account holder. */
declare class AccountHolderOnlineRegisterResponse implements Encodable {
    /** Agorapay holder reference */
    sellerReference?: string;
    /** Request identifier for the enrollment */
    requestId?: string;
    /**
     * Id used for futher update function call
     * @minLength 1
     * @maxLength 50
     * @pattern ^[-a-zA-Z0-9]+$
     */
    tokenId?: string;
    /** External holder reference */
    externalReference?: string;
    /** A string representing the account number. */
    accountNumber?: string;
    /**
     * Creates an instance of AccountHolderOnlineRegisterResponse.
     *
     * @constructor
     * @param {?string} [sellerReference]
     * @param {?string} [requestId]
     * @param {?string} [tokenId]
     * @param {?string} [externalReference]
     * @param {?string} [accountNumber]
     */
    constructor(sellerReference?: string, requestId?: string, tokenId?: string, externalReference?: string, accountNumber?: string);
    encode(): {
        [key: string]: any;
    };
}
export default AccountHolderOnlineRegisterResponse;
