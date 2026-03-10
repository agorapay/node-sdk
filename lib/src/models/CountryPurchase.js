"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class CountryPurchase {
    /**
     * @constructor
     * @param country -
     */
    constructor(country) {
        if (!country)
            throw new Error('Missing required field: country');
        this.country = country;
    }
    encode() {
        return {
            country: this.country
        };
    }
}
exports.default = CountryPurchase;
