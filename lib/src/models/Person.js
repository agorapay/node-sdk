"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../utils/enums");
/**
 * Class representing a person.
 */
var Person = /** @class */ (function () {
    function Person() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var data_1 = args[0];
            if (data_1.gender &&
                Object.values(enums_1.Gender).some(function (gender) { return gender === data_1.gender; }))
                this.gender = data_1.gender;
            else
                throw new Error('Missing required field or invalid data: gender');
            if (!data_1.firstName)
                throw new Error('Missing required field: firstName');
            if (!data_1.lastName)
                throw new Error('Missing required field: lastName');
            // if (!data.birthDate) throw new Error('Missing required field: birthDate');
            if (!data_1.roles)
                throw new Error('Missing required field: roles');
            this.roles = [];
            data_1.roles.forEach(function (x) {
                if (Object.values(enums_1.Role).some(function (role) { return role === x; }))
                    _this.roles.push(x);
                else
                    throw new Error('Invalid data: role');
            });
            this.gender = data_1.gender;
            this.firstName = data_1.firstName;
            this.lastName = data_1.lastName;
            this.email = data_1.email;
            this.phoneNumber = data_1.phoneNumber;
            this.birthDate = data_1.birthDate;
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
    Person.prototype.encode = function () {
        return {
            gender: this.gender,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            birthDate: this.birthDate,
            roles: this.roles
                ? this.roles.map(function (x) {
                    return {
                        role: x
                    };
                })
                : []
        };
    };
    return Person;
}());
exports.default = Person;
