import { HasCountryQuestionnaire } from '../../utils/enums';
import CountryPurchase from './CountryPurchase';
import Encodable from './Encodable';
/**
 *
 */
declare class SpecificOperation implements Encodable {
    /** Existence of a country questionnaire for specific operation */
    value: HasCountryQuestionnaire;
    /** */
    countryList?: Array<CountryPurchase>;
    /**
     * @constructor
     * @param value
     * @param countryList
     */
    constructor(value: HasCountryQuestionnaire, countryList?: Array<CountryPurchase>);
    encode(): {
        [key: string]: any;
    };
}
export default SpecificOperation;
