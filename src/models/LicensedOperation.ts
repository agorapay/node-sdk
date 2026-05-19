import { HasCountryQuestionnaire, isEnumValue } from '../../utils/enums.js';
import Authority from './Authority.js';
import Encodable from './Encodable.js';

/**
 *
 */
class LicensedOperation implements Encodable {
  /** Existence of a country questionnaire for specific operation */
  value: HasCountryQuestionnaire;
  /** */
  authorityList?: Array<Authority>;

  /**
   * @constructor
   * @param value
   * @param authorityList
   */
  constructor(
    value: HasCountryQuestionnaire,
    authorityList?: Array<Authority>
  ) {
    if (!isEnumValue(HasCountryQuestionnaire, value))
      throw new Error('Missing required field: value');
    this.value = value;
    if (authorityList)
      this.authorityList = authorityList.map((x: any) => new Authority(x));
  }

  encode(): { [key: string]: any } {
    return {
      value: this.value,
      authorityList: this.authorityList
    };
  }
}

export default LicensedOperation;
