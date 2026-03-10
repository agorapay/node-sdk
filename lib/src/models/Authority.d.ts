import Encodable from './Encodable';
/**
 *
 */
declare class Authority implements Encodable {
    /** */
    authorityName: string;
    /**
     * @constructor
     * @param authorityName -
     */
    constructor(authorityName: string);
    encode(): {
        [key: string]: any;
    };
}
export default Authority;
