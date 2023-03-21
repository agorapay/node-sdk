"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility functions
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.stringToDate = function (dateString) {
        if (!dateString || dateString.length < 8) {
            return undefined;
        }
        var year = parseInt(dateString.substring(0, 4));
        var month = parseInt(dateString.substring(4, 6));
        var day = parseInt(dateString.substring(6, 8));
        return new Date(year, month - 1, day);
    };
    Utils.hasEnumOrDefault = function (value, enumType, defaultValue) {
        var found = Object.keys(enumType).find(function (v) { return enumType[v] === value; });
        if (found) {
            return enumType[found];
        }
        return defaultValue;
    };
    Utils.hasIntegerOrDefault = function (value, defaultValue) {
        if (value !== null && value !== undefined) {
            try {
                return Number.parseInt(value, 10);
            }
            catch (ignored) {
            }
        }
        return defaultValue;
    };
    return Utils;
}());
exports.default = Utils;
