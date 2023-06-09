"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Requirement_1 = require("./Requirement");
/**
 * Class representing a person.
 */
class PhysicalPerson {
    /**  */
    firstName;
    /**  */
    lastName;
    /**  */
    id;
    /**  */
    requirements = [];
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!data.firstName) {
                throw new Error("Missing required field: firstName");
            }
            else if (!data.lastName) {
                throw new Error("Missing required field: lastName");
            }
            else if (!data.id) {
                throw new Error("Missing required field: id");
            }
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.id = data.id;
            this.requirements = (data.requirements ?? []).map((x) => new Requirement_1.default(x));
        }
        else {
            this.firstName = args[0];
            this.lastName = args[1];
            this.id = args[2];
            this.requirements = args[3];
        }
    }
    encode() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id,
            requirements: this.requirements.map((x) => x.encode())
        };
    }
}
exports.default = PhysicalPerson;
