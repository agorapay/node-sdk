"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
class Requirement {
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!data.id)
                throw new Error('Missing required field: id');
            if (!data.mandatory)
                throw new Error('Missing required fielmandatory');
            if (!data.label)
                throw new Error('Missing required label');
            this.id = data.id;
            // this.label = data.label;
            this.fileExt = data.fileExt;
            this.fileContent = data.fileContent;
            if (data.status &&
                Object.values(enums_1.RequirementStatus).some((status) => status === data.status))
                this.status = data.status;
            else
                this.status = undefined;
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
