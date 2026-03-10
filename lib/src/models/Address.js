"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an address.
 */
class Address {
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!data.address)
                throw new Error('Missing required field: address');
            if (!data.city)
                throw new Error('Missing required field: city');
            if (!data.postalCode)
                throw new Error('Missing required field: postalCode');
            if (!data.country)
                throw new Error('Missing required field: country');
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
    encode() {
        return {
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            country: this.country
        };
    }
}
exports.default = Address;
