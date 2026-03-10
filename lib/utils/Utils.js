"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static stringToDate(dateString) {
        if (!dateString || dateString.length < 8)
            return undefined;
        const year = parseInt(dateString.substring(0, 4));
        const month = parseInt(dateString.substring(4, 6));
        const day = parseInt(dateString.substring(6, 8));
        return new Date(year, month - 1, day);
    }
    static async handleApiResponse(promise, mapper) {
        const resp = await promise;
        if (!resp || typeof resp.resultCode === 'undefined') {
            throw new Error('Invalid API response structure');
        }
        if (Number(resp?.resultCode) !== 0) {
            throw new Error(`${resp?.resultCode} - ${resp?.resultCodeMessage}`);
        }
        return mapper(resp);
    }
}
exports.default = Utils;
