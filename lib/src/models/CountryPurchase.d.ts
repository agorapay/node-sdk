import Encodable from './Encodable.js';
/**
 *
 */
declare class CountryPurchase implements Encodable {
    /** */
    country: string;
    /**
     * @constructor
     * @param country -
     */
    constructor(country: string);
    encode(): {
        [key: string]: any;
    };
}
export default CountryPurchase;
