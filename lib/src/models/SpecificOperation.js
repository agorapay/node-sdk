"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const CountryPurchase_1 = __importDefault(require("./CountryPurchase"));
/**
 *
 */
class SpecificOperation {
    /**
     * @constructor
     * @param value
     * @param countryList
     */
    constructor(value, countryList) {
        if (!(0, enums_1.isEnumValue)(enums_1.HasCountryQuestionnaire, value))
            throw new Error('Missing required field: value');
        this.value = value;
        if (countryList)
            this.countryList = countryList.map((x) => new CountryPurchase_1.default(x));
    }
    encode() {
        return {
            value: this.value,
            countryList: this.countryList
        };
    }
}
exports.default = SpecificOperation;
