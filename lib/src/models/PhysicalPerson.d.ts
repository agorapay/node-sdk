import Requirement from './Requirement.js';
import Encodable from './Encodable.js';
import { Resident } from '../../utils/enums.js';
/**
 * Class representing a person.
 */
declare class PhysicalPersons implements Encodable {
    /**  */
    firstName: string;
    /**  */
    lastName: string;
    /**  */
    id: string;
    /**  */
    requirements: Array<Requirement>;
    /**  */
    resident?: Resident;
    /**  */
    physicalAddress?: string;
    /**
     * @constructor
     * @param data - Object which contains required physical person attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     */
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
export default PhysicalPersons;
