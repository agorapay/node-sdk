import Encodable from './Encodable';
/**
 * For all countries considered high-risk where the client operates and carries out activities.
 */
declare class RiskCountry implements Encodable {
    /** Percentage of net turnover (excluding VAT) in the country */
    percentage: string;
    /** */
    country: string;
    /**
     * @constructor
     * @param percentage -
     * @param country -
     */
    constructor(percentage: string, country: string);
    encode(): {
        [key: string]: any;
    };
}
export default RiskCountry;
