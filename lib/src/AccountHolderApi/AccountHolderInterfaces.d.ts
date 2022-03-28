import Account from '../models/Account';
import Address from '../models/Address';
import Person from '../models/Person';
import { YesOrNo } from '../../utils/enums';
import Owner from '../models/Owner';
/**
 *  @prop {string} socialReason
 *  @prop {string} compagnyName
 *  @prop {string} country
 *  @prop {string} legalForm
 *  @prop {string} registrationNumber
 *  @prop {Address} masterAddress
 *  @prop {Address | undefined} billingAddress
 *  @prop {string} turnover
 *  @prop {boolean | YesOrNo} regulatedSociety
 *  @prop {Array<Person>} physicalPersons
 *  @prop {Account} account
 *  @prop {Person} owner
 *  @prop {string} currency
 *  @prop {Owner} owner
 */
interface RegisterAccountHolderOptions {
    /** Holder name. */
    socialReason: string;
    /** Commercial name. */
    compagnyName?: string;
    /** The ISO country code in 3 characters format. */
    country: string;
    /**  */
    legalForm: string;
    /** SIRET for France. */
    registrationNumber: string;
    /**  */
    masterAddress: Address;
    /**  */
    billingAddress?: Address;
    /** Current or last year turnover in account currency code unit. */
    turnover: string;
    /**  */
    regulatedSociety: boolean | YesOrNo;
    /**  */
    physicalPersons: Array<Person>;
    /**  */
    account: Account;
    /**  */
    currency: string;
    /**  */
    owner: Owner;
}
/**
 *  @prop {string | undefined} socialReason
 *  @prop {string | undefined} compagnyName
 *  @prop {string | undefined} country
 *  @prop {string | undefined} registrationNumber
 *  @prop {Address | undefined} masterAddress
 *  @prop {Address | undefined} billingAddress
 *  @prop {string | undefined} turnover
 *  @prop {boolean | YesOrNo | undefined} regulatedSociety
 *  @prop {Array<Person> | undefined} physicalPersons
 *  @prop {Account} account
 *  @prop {string | undefined} currency
 *  @prop {string} requestId
 *  @prop {Owner} owner
 */
interface UpdateAccountHolderOptions {
    /** Holder name. */
    socialReason?: string;
    /** Commercial name. */
    compagnyName?: string;
    /** The ISO country code in 3 characters format. */
    country?: string;
    /** SIRET for France. */
    registrationNumber?: string;
    /**  */
    masterAddress?: Address;
    /**  */
    billingAddress?: Address;
    /** Current or last year turnover in account currency code unit. */
    turnover?: string;
    /**  */
    regulatedSociety?: boolean | YesOrNo;
    /**  */
    physicalPersons?: Array<Person>;
    /**  */
    account: Account;
    /**  */
    currency?: string;
    /**  */
    requestId: string;
    /**  */
    owner: Owner;
}
export { RegisterAccountHolderOptions, UpdateAccountHolderOptions };
