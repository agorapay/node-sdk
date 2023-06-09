"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
const Utils_1 = require("../../utils/Utils");
/**
 * Class representing a person.
 */
class Person {
    /**  */
    gender;
    /**  */
    firstName;
    /**  */
    lastName;
    /**  */
    email;
    /**  */
    phoneNumber;
    /**  */
    roles;
    /** */
    birthDate;
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            const gender = Utils_1.default.hasEnumOrDefault(data.gender, enums_1.Gender, null);
            if (!gender) {
                throw new Error("Missing required field or invalid data: gender");
            }
            else if (!data.firstName) {
                throw new Error("Missing required field: firstName");
            }
            else if (!data.lastName) {
                throw new Error("Missing required field: lastName");
            }
            else if (!data.roles) {
                throw new Error("Missing required field: roles");
            }
            else if (data.roles.some(role => Utils_1.default.hasEnumOrDefault(role, enums_1.Role, null) === null)) {
                throw new Error("Invalid data: roles");
            }
            // if (!data.birthDate) throw new Error('Missing required field: birthDate');
            this.gender = gender;
            this.roles = data.roles;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.phoneNumber = data.phoneNumber;
            this.birthDate = data.birthDate;
        }
        else {
            this.gender = args[0];
            this.firstName = args[1];
            this.lastName = args[2];
            this.roles = args[3];
            this.birthDate = args[4];
            this.email = args[5];
            this.phoneNumber = args[6];
        }
    }
    encode() {
        return {
            gender: this.gender,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            birthDate: this.birthDate,
            roles: this.roles
                ? this.roles.map((x) => {
                    return {
                        role: x
                    };
                })
                : []
        };
    }
}
exports.default = Person;
