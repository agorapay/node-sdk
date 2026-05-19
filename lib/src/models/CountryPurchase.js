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
export default CountryPurchase;
