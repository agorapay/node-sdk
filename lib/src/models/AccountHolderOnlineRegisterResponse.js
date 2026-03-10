"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing an account holder. */
class AccountHolderOnlineRegisterResponse {
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
    constructor(sellerReference, requestId, tokenId, externalReference, accountNumber) {
        this.sellerReference = sellerReference;
        this.requestId = requestId;
        this.tokenId = tokenId;
        this.externalReference = externalReference;
        this.accountNumber = accountNumber;
    }
    encode() {
        return {
            sellerReference: this.sellerReference,
            requestId: this.requestId,
            tokenId: this.tokenId,
            externalReference: this.externalReference,
            accountNumber: this.accountNumber
        };
    }
}
exports.default = AccountHolderOnlineRegisterResponse;
