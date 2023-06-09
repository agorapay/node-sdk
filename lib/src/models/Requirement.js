"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Utils_1 = require("../../utils/Utils");
class Requirement {
    /** Requirement identification number. */
    id;
    /** Type of file provided in fileContent (PDF). */
    fileExt;
    /** Content of the document base64 encoded. */
    fileContent;
    /** Document status. */
    status;
    /** Date of validation of the document in ISO8601 format. */
    validationDate;
    /** Date of document reception in ISO8601 format */
    receiptDate;
    /**  */
    fileType;
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!data.id) {
                throw new Error("Missing required field: id");
            }
            this.id = data.id;
            // this.label = data.label;
            this.fileExt = data.fileExt;
            this.fileContent = data.fileContent;
            this.status = Utils_1.default.hasEnumOrDefault(data.status, enums_1.RequirementStatus, undefined);
            this.validationDate = data.validationDate;
            this.receiptDate = data.receiptDate;
        }
        else {
            this.id = args[0];
            this.fileExt = args[1];
            this.fileContent = args[2];
            this.fileType = args[3];
        }
    }
    encode() {
        return {
            id: this.id,
            fileExt: this.fileExt,
            fileContent: this.fileContent,
            status: this.status,
            validationDate: this.validationDate,
            receiptDate: this.receiptDate,
            fileType: this.fileType
        };
    }
}
exports.default = Requirement;
