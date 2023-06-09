"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a person.
 */
class Owner {
    /**  */
    gender;
    /**  */
    firstName;
    /**  */
    lastName;
    /**  */
    socialReason;
    /** */
    address;
    /** */
    city;
    /**  */
    postalCode;
    /** */
    country;
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
    constructor(gender, firstName, lastName, socialReason, address, city, postalCode, country) {
        this.gender = gender;
        this.firstName = firstName;
        this.lastName = lastName;
        this.socialReason = socialReason;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }
    encode() {
        return {
            gender: this.gender,
            firstName: this.firstName,
            lastName: this.lastName,
            socialReason: this.socialReason,
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            country: this.country
        };
    }
}
exports.default = Owner;
