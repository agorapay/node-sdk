import Encodable from './Encodable';
/**
 * Class representing an address.
 */
declare class Address implements Encodable {
    /** Number and road name. */
    address: string;
    /**  */
    city: string;
    /** */
    postalCode: string;
    /** The ISO country code in 3 characters format. */
    country: string;
    /**
     * @constructor
     * @param address - Number and road name.
     * @param city
     * @param postalCode
     * @param country - The ISO country code in 3 characters format.
     * @example
     * ````typescript
     *let address = new Address("118 Boulevard Saint-Germain", "Paris", "75006", "FRA")
     *
     * ````
     */
    constructor(address: string, city: string, postalCode: string, country: string);
    /**
     * @constructor
     * @param data - Object which contains required address attributes.
     * @throws Will throw an error if one of the required attributes is missing.
     * @example
     * ````typescript
     * let data = {
     *   address: "118 Boulevard Saint-Germain",
     *   city: "Paris",
     *   postalCode: "75006",
     *   country: "FRA"
     * }
     * try {
     *  let address = new Address(data)
     * } catch (err) {
     *  console.log(err)
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
export default Address;
