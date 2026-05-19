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
export default Authority;
