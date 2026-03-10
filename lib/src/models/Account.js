"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an account.
 */
class Account {
    constructor(...args) {
        if (args.length === 1) {
            const data = args[0];
            if (!data.country)
                throw new Error('Missing required field: country');
            if (!data.currency)
                throw new Error('Missing required field: currency');
            if (!data.iban)
                throw new Error('Missing required field: iban');
            if (data.floorLimit === null)
                throw new Error('Missing required field: floorLimit');
            this.country = data.country;
            this.currency = data.currency;
            this.iban = data.iban;
            this.floorLimit = +data.floorLimit;
        }
        else {
            this.country = args[0];
            this.currency = args[1];
            this.iban = args[2];
            this.floorLimit = args[3];
        }
    }
    encode() {
        return {
            country: this.country,
            currency: this.currency,
            iban: this.iban,
            floorLimit: this.floorLimit.toString()
        };
    }
}
exports.default = Account;
