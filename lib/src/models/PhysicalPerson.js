"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Requirement_1 = require("./Requirement");
/**
 * Class representing a person.
 */
var PhysicalPersons = /** @class */ (function () {
    function PhysicalPersons() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /**  */
        this.requirements = [];
        if (args.length === 1) {
            var data = args[0];
            if (!data.firstName)
                throw new Error('Missing required field: firstName');
            if (!data.lastName)
                throw new Error('Missing required field: lastName');
            if (!data.id)
                throw new Error('Missing required field: id');
            // if (!data.requirements) throw new Error('Missing required field: requirements')
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.id = data.id;
            this.requirements = data.requirements
                ? data.requirements.map(function (x) { return new Requirement_1.default(x); })
                : [];
        }
        else {
            this.firstName = args[0];
            this.lastName = args[1];
            this.id = args[2];
            this.requirements = args[3];
        }
    }
    PhysicalPersons.prototype.encode = function () {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id,
            requirements: this.requirements.map(function (x) { return x.encode(); })
        };
    };
    return PhysicalPersons;
}());
exports.default = PhysicalPersons;
