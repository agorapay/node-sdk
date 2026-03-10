import Encodable from './Encodable';
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
