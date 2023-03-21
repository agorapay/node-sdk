"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an address.
 */
var Address = /** @class */ (function () {
    function Address() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data = args[0];
            if (!data.address) {
                throw new Error("Missing required field: address");
            }
            else if (!data.city) {
                throw new Error("Missing required field: city");
            }
            else if (!data.postalCode) {
                throw new Error("Missing required field: postalCode");
            }
            else if (!data.country) {
                throw new Error("Missing required field: country");
            }
            this.address = data.address;
            this.city = data.city;
            this.postalCode = data.postalCode;
            this.country = data.country;
        }
        else {
            this.address = args[0];
            this.city = args[1];
            this.postalCode = args[2];
            this.country = args[3];
        }
    }
    Address.prototype.encode = function () {
        return {
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            country: this.country
        };
    };
    return Address;
}());
exports.default = Address;
