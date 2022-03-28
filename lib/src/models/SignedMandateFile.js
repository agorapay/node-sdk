"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignedMandateFile = /** @class */ (function () {
    /**
     * @constructor
     * @param data - Object which contains required mandate file attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    function SignedMandateFile(data) {
        this.transactionId = data.transactionId;
        this.reference = data.reference;
        this.signedFileContent = data.signedFileContent;
    }
    return SignedMandateFile;
}());
exports.default = SignedMandateFile;
