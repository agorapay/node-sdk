"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Requirement = /** @class */ (function () {
    function Requirement() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data_1 = args[0];
            if (!data_1.id)
                throw new Error('Missing required field: id');
            if (!data_1.mandatory)
                throw new Error('Missing required fielmandatory');
            if (!data_1.label)
                throw new Error('Missing required label');
            this.id = data_1.id;
            // this.label = data.label;
            this.fileExt = data_1.fileExt;
            this.fileContent = data_1.fileContent;
            if (data_1.status &&
                Object.values(enums_1.RequirementStatus).some(function (status) { return status === data_1.status; }))
                this.status = data_1.status;
            else
                this.status = undefined;
            this.validationDate = data_1.validationDate;
            this.receiptDate = data_1.receiptDate;
        }
        else {
            this.id = args[0];
            this.fileExt = args[1];
            this.fileContent = args[2];
            this.fileType = args[3];
        }
    }
    Requirement.prototype.encode = function () {
        return {
            id: this.id,
            fileExt: this.fileExt,
            fileContent: this.fileContent,
            status: this.status,
            validationDate: this.validationDate,
            receiptDate: this.receiptDate,
            fileType: this.fileType
        };
    };
    return Requirement;
}());
exports.default = Requirement;
