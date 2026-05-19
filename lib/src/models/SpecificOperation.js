import { HasCountryQuestionnaire, isEnumValue } from '../../utils/enums.js';
import CountryPurchase from './CountryPurchase.js';
/**
 *
 */
class SpecificOperation {
    /**
     * @constructor
     * @param value
     * @param countryList
     */
    constructor(value, countryList) {
        if (!isEnumValue(HasCountryQuestionnaire, value))
            throw new Error('Missing required field: value');
        this.value = value;
        if (countryList)
            this.countryList = countryList.map((x) => new CountryPurchase(x));
    }
    encode() {
        return {
            value: this.value,
            countryList: this.countryList
        };
    }
}
export default SpecificOperation;
