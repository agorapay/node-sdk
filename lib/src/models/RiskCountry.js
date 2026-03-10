"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * For all countries considered high-risk where the client operates and carries out activities.
 */
class RiskCountry {
    /**
     * @constructor
     * @param percentage -
     * @param country -
     */
    constructor(percentage, country) {
        if (!percentage)
            throw new Error('Missing required field: percentage');
        if (!country)
            throw new Error('Missing required field: country');
        this.percentage = percentage;
        this.country = country;
    }
    encode() {
        return {
            percentage: this.percentage,
            country: this.country
        };
    }
}
exports.default = RiskCountry;
