import Encodable from "./Encodable";
export default class Payer implements Encodable {
    /** IP Address of the customer. */
    IPAddress?: string;
    /** reference of the customer from the marketplace. */
    reference: string;
    /** The browser information use to request the payment. */
    userAgent?: string;
    /** The default language of the browser. The first two characters are used to identify the language code. */
    language?: string;
    /**
     *
     * @param reference - IP Address of the customer.
     * @param IPAddress - reference of the customer from the marketplace.
     * @param userAgent - The browser information use to request the payment.
     * @param language - The default language of the browser. The first two characters are used to identify the language code.
     */
    constructor(reference: string, IPAddress?: string, userAgent?: string, language?: string);
    encode(): {
        [key: string]: any;
    };
}
