"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a Tax Address.
 */
class TaxAddress {
    /**
     * @constructor
     * @param address -
     * @param city -
     * @param postalCode -
     * @param country -
     */
    constructor(address, city, postalCode, country) {
        if (!address)
            throw new Error('Missing required field: address');
        if (!city)
            throw new Error('Missing required field: city');
        if (!postalCode)
            throw new Error('Missing required field: postalCode');
        if (!country)
            throw new Error('Missing required field: country');
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
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
exports.default = TaxAddress;
