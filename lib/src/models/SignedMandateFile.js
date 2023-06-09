"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignedMandateFile {
    /** Id of the payment transaction. */
    transactionId;
    /** Mandate reference. */
    reference;
    /** PDF file base64 encoded. */
    signedFileContent;
    /**
     * @constructor
     * @param data - Object which contains required mandate file attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    constructor(data) {
        this.transactionId = data.transactionId;
        this.reference = data.reference;
        this.signedFileContent = data.signedFileContent;
    }
}
exports.default = SignedMandateFile;
