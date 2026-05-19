import { HasCountryQuestionnaire, isEnumValue } from '../../utils/enums.js';
import Authority from './Authority.js';
/**
 *
 */
class LicensedOperation {
    /**
     * @constructor
     * @param value
     * @param authorityList
     */
    constructor(value, authorityList) {
        if (!isEnumValue(HasCountryQuestionnaire, value))
            throw new Error('Missing required field: value');
        this.value = value;
        if (authorityList)
            this.authorityList = authorityList.map((x) => new Authority(x));
    }
    encode() {
        return {
            value: this.value,
            authorityList: this.authorityList
        };
    }
}
export default LicensedOperation;
