"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
var Requirement_1 = require("./Requirement");
var UploadRequirement = /** @class */ (function (_super) {
    __extends(UploadRequirement, _super);
    function UploadRequirement(id, fileExt, fileContent, fileType) {
        return _super.call(this, id, enums_1.FileType[fileExt], fileContent, fileType) || this;
    }
    return UploadRequirement;
}(Requirement_1.default));
exports.default = UploadRequirement;
