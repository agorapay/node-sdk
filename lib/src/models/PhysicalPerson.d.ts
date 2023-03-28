import Requirement from "./Requirement";
import Encodable from "./Encodable";
/**
 * Class representing a person.
 */
export default class PhysicalPerson implements Encodable {
    /**  */
    firstName: string;
    /**  */
    lastName: string;
    /**  */
    id: string;
    /**  */
    requirements: Array<Requirement>;
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
