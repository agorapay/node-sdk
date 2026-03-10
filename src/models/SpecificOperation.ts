import { HasCountryQuestionnaire, isEnumValue } from '../../utils/enums';
import CountryPurchase from './CountryPurchase';
import Encodable from './Encodable';

/**
 *
 */
class SpecificOperation implements Encodable {
  /** Existence of a country questionnaire for specific operation */
  value: HasCountryQuestionnaire;
  /** */
  countryList?: Array<CountryPurchase>;

  /**
   * @constructor
   * @param value
   * @param countryList
   */
  constructor(
    value: HasCountryQuestionnaire,
    countryList?: Array<CountryPurchase>
  ) {
    if (!isEnumValue(HasCountryQuestionnaire, value))
      throw new Error('Missing required field: value');
    this.value = value;
    if (countryList)
      this.countryList = countryList.map((x: any) => new CountryPurchase(x));
  }

  encode(): { [key: string]: any } {
    return {
      value: this.value,
      countryList: this.countryList
    };
  }
}

export default SpecificOperation;
