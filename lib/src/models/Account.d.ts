import Encodable from "./Encodable";
/**
 * Class representing an account.
 */
export default class Account implements Encodable {
    /** The ISO country code in 3 characters format. */
    country: string;
    /** Currency code in 3 characters ISO format. */
    currency: string;
    /** International Bank Account Number. */
    iban: string;
    /** Floor limit in currency unit. */
    floorLimit: number;
    /**
     * @constructor
     * @param country -
     * @param currency -
     * @param iban -
     * @param floorLimit -
     * @example
     * ````typescript
     *let account = new Account("FRA", "EUR", "AZERTYU12345", 2000)
     * ````
     */
    constructor(country: string, currency: string, iban: string, floorLimit: number);
    /**
     * @constructor
     * @param data - Object which contains required account attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     * @example
     * ````typescript
     * let data = {
     *   country: "FRA",
     *   currency: "EUR",
     *   iban: "AZERTYU12345",
     *   floorLimit: 2000
     * }
     * try {
     *   let account = new Account(data)
     * } catch (err) {
     *   console.log(err)
     * }
     *
     * ````
     */
    constructor(data: {
        [key: string]: any;
    });
    encode(): {
        [key: string]: any;
    };
}
