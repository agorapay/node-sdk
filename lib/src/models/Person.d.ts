import { Gender, Role } from "../../utils/enums";
import Encodable from "./Encodable";
/**
 * Class representing a person.
 */
export default class Person implements Encodable {
    /**  */
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
    /** */
    birthDate?: string;
    /**
     * @constructor
     * @param gender
     * * Male (M),
     * * Female (F)
     * @param firstName -
     * @param lastName -
     * @param email -
     * @param phoneNumber -
     * @param roles -
     * @param birthDate -
     * @example
     * ````typescript
     *let person = new Person(Gender.Male, "John", "Doe", "john.doe@foo.com", "+14151231234", [Role.BeneficialOwner, Role.Manager])
     *
     * ````
     */
    constructor(gender: Gender, firstName: string, lastName: string, roles: Array<Role>, birthDate?: string, email?: string, phoneNumber?: string);
    /**
     * @constructor
     * @param data - Object which contains required person attributes.
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
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
