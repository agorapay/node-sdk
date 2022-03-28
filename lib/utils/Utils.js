"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.stringToDate = function (dateString) {
        if (!dateString || dateString.length < 8)
            return undefined;
        var year = parseInt(dateString.substring(0, 4));
        var month = parseInt(dateString.substring(4, 6));
        var day = parseInt(dateString.substring(6, 8));
        return new Date(year, month - 1, day);
    };
    return Utils;
}());
exports.default = Utils;
