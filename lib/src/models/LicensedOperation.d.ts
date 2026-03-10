import { HasCountryQuestionnaire } from '../../utils/enums';
import Authority from './Authority';
import Encodable from './Encodable';
/**
 *
 */
declare class LicensedOperation implements Encodable {
    /** Existence of a country questionnaire for specific operation */
    value: HasCountryQuestionnaire;
    /** */
    authorityList?: Array<Authority>;
    /**
     * @constructor
     * @param value
     * @param authorityList
     */
    constructor(value: HasCountryQuestionnaire, authorityList?: Array<Authority>);
    encode(): {
        [key: string]: any;
    };
}
export default LicensedOperation;
