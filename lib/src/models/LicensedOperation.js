"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Authority_1 = __importDefault(require("./Authority"));
/**
 *
 */
class LicensedOperation {
    /**
     * @constructor
     * @param value
     * @param authorityList
     */
    constructor(value, authorityList) {
        if (!(0, enums_1.isEnumValue)(enums_1.HasCountryQuestionnaire, value))
            throw new Error('Missing required field: value');
        this.value = value;
        if (authorityList)
            this.authorityList = authorityList.map((x) => new Authority_1.default(x));
    }
    encode() {
        return {
            value: this.value,
            authorityList: this.authorityList
        };
    }
}
exports.default = LicensedOperation;
