"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Address_1 = __importDefault(require("../models/Address"));
/**
 * Class representing a person, for online registration.
 */
class OnlineRegisterPerson {
    /**
     * Creates an instance of OnlineRegisterPerson.
     *
     * @constructor
     * @param {...any[]} args
     * @throws Will throw an error if one of the required attributes is missing.
     * @example
     * ````typescript
     *let data = {
     *  "gender": "M",
     *  "firstName": "Contact",
     *  "lastName": "Principal",
     *  "email": "pnom@email.com",
     *  "phoneNumber": "+337687686876",
     *  "resident": "R",
     *  "birthDate": "19901231",
     *  "citizenShipCode": "FR",
     *  "birthCountryCode": "FR",
     *  "birthPlaceTown": "PARIS",
     *  "birthPlaceZipCode": "75020",
     *  "roles": [
     *    {
     *      "role": "BE"
     *    },
     *    {
     *      "role": "CP"
     *    }
     *  ]
     *}
     *try {
     *   let person = new OnlineRegisterPerson(data)
     *} catch (err) {
     *   console.log(err)
     *}
     *
     * ````
     */
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!(0, enums_1.isEnumValue)(enums_1.Gender, data.gender))
                throw new Error('Missing required field or invalid data: gender');
            if (!data.firstName)
                throw new Error('Missing required field: firstName');
            if (!data.lastName)
                throw new Error('Missing required field: lastName');
            if (!data.birthDate)
                throw new Error('Missing required field: birthDate');
            if (!data.roles)
                throw new Error('Missing required field: roles');
            if (!data.citizenShip)
                throw new Error('Missing required field: citizenShip');
            if (!data.birthDate)
                throw new Error('Missing required field: citizenShip');
            if (!data.birthCountryCode)
                throw new Error('Missing required field: citizenShip');
            this.roles = [];
            data.roles.forEach((x) => {
                if ((0, enums_1.isEnumValue)(enums_1.Role, x))
                    this.roles.push(x);
                else
                    throw new Error('Invalid data: role');
            });
            this.gender = data.gender;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.citizenShip = data.citizenShip;
            this.birthDate = data.birthDate;
            this.birthCountryCode = data.birthCountryCode;
            this.email = data.email;
            this.phoneNumber = data.phoneNumber;
            this.resident = data.resident;
            this.birthPlaceTown = data.birthPlaceTown;
            this.birthPlaceZipCode = data.birthPlaceZipCode;
            this.physicalAddress = data.physicalAddress
                ? new Address_1.default(data.physicalAddress)
                : undefined;
            this.percentageHeld = data.percentageHeld;
            this.usPerson = data.usPerson;
        }
        else {
            this.gender = args[0];
            this.firstName = args[1];
            this.lastName = args[2];
            this.roles = args[3];
            this.citizenShip = args[4];
            this.birthDate = args[5];
            this.birthCountryCode = args[6];
            this.email = args[7];
            this.phoneNumber = args[8];
            this.resident = args[9];
            this.birthPlaceTown = args[10];
            this.birthPlaceZipCode = args[11];
            this.physicalAddress = args[12];
            this.percentageHeld = args[13];
            this.usPerson = args[14];
        }
    }
    encode() {
        return {
            gender: this.gender,
            firstName: this.firstName,
            lastName: this.lastName,
            roles: this.roles
                ? this.roles.map((x) => {
                    return {
                        role: x
                    };
                })
                : [],
            citizenShip: this.citizenShip,
            birthDate: this.birthDate,
            birthCountryCode: this.birthCountryCode,
            email: this.email,
            phoneNumber: this.phoneNumber,
            resident: this.resident,
            birthPlaceTown: this.birthPlaceTown,
            birthPlaceZipCode: this.birthPlaceZipCode,
            physicalAddress: this.physicalAddress,
            percentageHeld: this.percentageHeld,
            usPerson: this.usPerson
        };
    }
}
exports.default = OnlineRegisterPerson;
