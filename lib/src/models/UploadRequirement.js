"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Requirement_1 = __importDefault(require("./Requirement"));
class UploadRequirement extends Requirement_1.default {
    constructor(id, fileExt, fileContent, fileType) {
        super(id, enums_1.FileType[fileExt], fileContent, fileType);
    }
}
exports.default = UploadRequirement;
