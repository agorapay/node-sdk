import Encodable from './Encodable';
/**
 * Class representing a Tax Address.
 */
declare class TaxAddress implements Encodable {
    /** Number and road name */
    address: string;
    /** */
    city: string;
    /**  */
    postalCode: string;
    /** */
    country: string;
    /**
     * @constructor
     * @param address -
     * @param city -
     * @param postalCode -
     * @param country -
     */
    constructor(address: string, city: string, postalCode: string, country: string);
    encode(): {
        [key: string]: any;
    };
}
export default TaxAddress;
