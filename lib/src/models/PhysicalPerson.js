"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Requirement_1 = __importDefault(require("./Requirement"));
const enums_1 = require("../../utils/enums");
/**
 * Class representing a person.
 */
class PhysicalPersons {
    constructor(...args) {
        /**  */
        this.requirements = [];
        if (args.length === 1) {
            const data = args[0];
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
                ? data.requirements.map((x) => new Requirement_1.default(x))
                : [];
            this.resident = (0, enums_1.isEnumValue)(enums_1.Resident, data.resident)
                ? data.resident
                : undefined;
            this.physicalAddress = data.physicalAddress;
        }
        else {
            this.firstName = args[0];
            this.lastName = args[1];
            this.id = args[2];
            this.requirements = args[3];
            this.resident = (0, enums_1.isEnumValue)(enums_1.Resident, args[4]) ? args[4] : undefined;
            this.physicalAddress = args[5];
        }
    }
    encode() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id,
            requirements: this.requirements.map((x) => x.encode()),
            resident: this.resident,
            physicalAddress: this.physicalAddress
        };
    }
}
exports.default = PhysicalPersons;
