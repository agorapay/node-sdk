import PhysicalPerson from "./PhysicalPerson";
import Requirement from "./Requirement";
import Encodable from "./Encodable";
/**
 * Class representing an account holder.
 */
export default class AccountHolder implements Encodable {
    /** A string representing the account number. */
    accountNumber?: string;
    /** Alias for the payment method. */
    paymentMethodAlias?: string;
    /**  */
    requirements: Requirement[];
    /**  */
    physicalPersons: PhysicalPerson[];
    /** Id used for futher update function call */
    requestId?: string;
    /** Status of request */
    requestStatus?: string;
    /**
     * @constructor
     * @param accountNumber - A string representing the account number.
     * @param paymentMethodAlias - Alias for the payment method.
     * @param requirements -
     * @param physicalPersons -
     * @param requestId - Id used for futher update function call
     * @param requestStatus - Status of request
     */
    constructor(requirements: Requirement[], physicalPersons: PhysicalPerson[], accountNumber?: string, paymentMethodAlias?: string, requestId?: string, requestStatus?: string);
    encode(): {
        [key: string]: any;
    };
}
