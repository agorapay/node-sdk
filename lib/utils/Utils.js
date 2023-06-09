"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility functions
 */
class Utils {
    static stringToDate(dateString) {
        if (!dateString || dateString.length < 8) {
            return undefined;
        }
        const year = parseInt(dateString.substring(0, 4));
        const month = parseInt(dateString.substring(4, 6));
        const day = parseInt(dateString.substring(6, 8));
        return new Date(year, month - 1, day);
    }
    static hasEnumOrDefault(value, enumType, defaultValue) {
        const found = Object.keys(enumType).find(v => enumType[v] === value);
        if (found) {
            return enumType[found];
        }
        return defaultValue;
    }
    static hasIntegerOrDefault(value, defaultValue) {
        if (value !== null && value !== undefined) {
            try {
                return Number.parseInt(value, 10);
            }
            catch (ignored) {
            }
        }
        return defaultValue;
    }
}
exports.default = Utils;
