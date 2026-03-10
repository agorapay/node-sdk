"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class Authority {
    /**
     * @constructor
     * @param authorityName -
     */
    constructor(authorityName) {
        if (!authorityName)
            throw new Error('Missing required field: authorityName');
        this.authorityName = authorityName;
    }
    encode() {
        return {
            authorityName: this.authorityName
        };
    }
}
exports.default = Authority;
