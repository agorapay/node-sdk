import { Gender, Role, Resident, YesOrNo } from '../../utils/enums';
import Address from '../models/Address';
import Encodable from './Encodable';
/**
 * Class representing a person, for online registration.
 */
declare class OnlineRegisterPerson implements Encodable {
    /**
     * * Male (M),
     * * Female (F)
     */
    gender: Gender;
    /**  */
    firstName: string;
    /**  */
    lastName: string;
    /**  */
    email?: string;
    /**  */
    phoneNumber?: string;
    /**  */
    roles: Array<Role>;
    /** Flag to indicate whether the physical person is a resident (R) or a non-resident (N) */
    resident?: Resident;
    /**  */
    citizenShip: string;
    /** */
    birthDate: string;
    /**  */
    birthCountryCode: string;
    /**  */
    birthPlaceTown?: string;
    /**  */
    birthPlaceZipCode?: string;
    /**  */
    physicalAddress?: Address;
    /**  */
    percentageHeld?: string;
    /**  */
    usPerson?: YesOrNo;
    constructor(gender: Gender, firstName: string, lastName: string, roles: Array<Role>, citizenShip: string, birthDate: string, birthCountryCode: string, email?: string, phoneNumber?: string, resident?: Resident, birthPlaceTown?: string, birthPlaceZipCode?: string, physicalAddress?: Address, percentageHeld?: string, usPerson?: YesOrNo);
    /**
     * @constructor
     * @param data - Object which contains required person attributes for online registration.
     * @throws Will throw an error if one of the required attributes is missing.
     * @example
     * ````typescript
     *let data = {
     *   gender: "M",
     *   firstName: "John",
     *   lastName: "Doe",
     *   email: "john.doe@foo.com",
     *   phoneNumber: "+14151231234",
     *   roles: ["BE", "D"]
     *}
     *try {
     *   let person = new Person(data)
     *} catch (err) {
     *   console.log(err)
     *}
     *
     * ````
     */
    /**
     * Creates an instance of OnlineRegisterPerson.
     *
     * @constructor
     * @param {{ [key: string]: any }} data
     */
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
export default OnlineRegisterPerson;
