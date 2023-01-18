import { Gender } from "../../utils/enums";
import Encodable from "./Encodable";
/**
 * Class representing a person.
 */
export default class Owner implements Encodable {
    /**  */
    gender: Gender;
    /**  */
    firstName: string;
    /**  */
    lastName: string;
    /**  */
    socialReason: string;
    /** */
    address: string;
    /** */
    city: string;
    /**  */
    postalCode: string;
    /** */
    country: string;
    /**
     * @constructor
     * @param gender
     * * Male (M),
     * * Female (F)
     * @param firstName -
     * @param lastName -
     * @param socialReason -
     * @param address -
     * @param city -
     * @param postalCode -
     * @param country -
     * @example
     * ````typescript
     *let person = new Person(Gender.Male, "John", "Doe", "john.doe@foo.com", "+14151231234", [Role.BeneficialOwner, Role.Manager])
     *
     * ````
     */
    constructor(gender: Gender, firstName: string, lastName: string, socialReason: string, address: string, city: string, postalCode: string, country: string);
    encode(): {
        [key: string]: any;
    };
}
