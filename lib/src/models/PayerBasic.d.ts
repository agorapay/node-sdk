import Encodable from './Encodable.js';
declare class PayerBasic implements Encodable {
    /** Reference of your payer. */
    reference: string;
    /**
     *
     * @param reference - Reference of your payer.
     */
    constructor(reference: string);
    encode(): {
        [key: string]: any;
    };
}
export default PayerBasic;
