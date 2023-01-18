"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Utils_1 = require("../../utils/Utils");
var Requirement = /** @class */ (function () {
    function Requirement() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data = args[0];
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
