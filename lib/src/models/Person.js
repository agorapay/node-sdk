"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../utils/enums");
/**
 * Class representing a person.
 */
class Person {
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (data.gender &&
                Object.values(enums_1.Gender).some((gender) => gender === data.gender))
                this.gender = data.gender;
            else
                throw new Error('Missing required field or invalid data: gender');
            if (!data.firstName)
                throw new Error('Missing required field: firstName');
            if (!data.lastName)
                throw new Error('Missing required field: lastName');
            // if (!data.birthDate) throw new Error('Missing required field: birthDate');
            if (!data.roles)
                throw new Error('Missing required field: roles');
            this.roles = [];
            data.roles.forEach((x) => {
                if (Object.values(enums_1.Role).some((role) => role === x))
                    this.roles.push(x);
                else
                    throw new Error('Invalid data: role');
            });
            this.gender = data.gender;
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
