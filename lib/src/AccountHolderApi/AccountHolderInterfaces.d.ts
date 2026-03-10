import Account from '../models/Account';
import Address from '../models/Address';
import Person from '../models/Person';
import OnlineRegisterPerson from '../models/OnlineRegisterPerson';
import { YesOrNo, Channel } from '../../utils/enums';
import Owner from '../models/Owner';
import RiskCountry from '../models/RiskCountry';
import CountryPurchase from '../models/CountryPurchase';
import SpecificOperation from '../models/SpecificOperation';
import LicensedOperation from '../models/LicensedOperation';
/**
 *  @prop {string} socialReason
 *  @prop {string} companyName
 *  @prop {string} country
 *  @prop {string} legalForm
 *  @prop {string} registrationNumber
 *  @prop {Address} masterAddress
 *  @prop {Address | undefined} commercialAddress
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
    companyName?: string;
    /** The ISO country code in 3 characters format. */
    country: string;
    /**  */
    legalForm: string;
    /** SIRET for France. */
    registrationNumber: string;
    /**  */
    masterAddress: Address;
    /**  */
    commercialAddress?: Address;
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
    /** Product Code to subscribe to */
    productCode: string;
    /** NAF Code */
    NAFCode?: string;
    /** Maximal amount of Short-Term Credit Facilities */
    authorizedOverdraft?: string;
}
interface OnlineRegisterAccountHolderOptions {
    /** Product Code to subscribe to */
    productCode: string;
    /** Agorapay holder reference */
    sellerReference?: string;
    /** External holder reference */
    externalReference: string;
    /** NAF Code */
    NAFCode: string;
    /** VAT Code */
    VATCode: string;
    /** Holder name */
    socialReason: string;
    /** Commercial name */
    companyName?: string;
    /** Currency code in 3 characters ISO format */
    currency: string;
    /** Holder country code (2 charact.) */
    country: string;
    /** Legal form */
    legalForm: string;
    /** Identification number for entity. For example, SIRET for France */
    registrationNumber: string;
    /**  */
    masterAddress: Address;
    /** Same as master address if not provided */
    commercialAddress?: Address;
    /**  Current or last year turnover in account currency code unit */
    turnover: string;
    /** Y or N */
    regulatedSociety: YesOrNo;
    /** US-Person for legal entity */
    usPerson?: YesOrNo;
    /** At least one person must be provided with CP role */
    physicalPersons: Array<OnlineRegisterPerson>;
    /**  */
    account: Account;
    /** Account owner information */
    owner: Owner;
    /** Scoring information */
    scoring?: string;
    /** Vigilance level */
    introducerRiskLevel?: string;
    /** Scoring */
    introducerRiskScore?: string;
    /** Tax address for a legal entity: limited to the registered office address and, where applicable, the commercial address. */
    taxAddress?: string;
    /** For all countries considered high-risk where the client operates and carries out activities. */
    riskCountry?: Array<RiskCountry>;
    /**  */
    countryPurchase?: Array<CountryPurchase>;
    /**  */
    specificOperation?: SpecificOperation;
    /**  */
    licensedOperation?: LicensedOperation;
    /**  */
    introducerLastKYCReview?: string;
    /** Account holder registration channel (ex: EPI) */
    channel?: Channel;
}
/**
 *  @prop {string | undefined} socialReason
 *  @prop {string | undefined} companyName
 *  @prop {string | undefined} country
 *  @prop {Address | undefined} masterAddress
 *  @prop {Address | undefined} commercialAddress
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
    companyName?: string;
    /** The ISO country code in 3 characters format. */
    country?: string;
    /**  */
    masterAddress?: Address;
    /**  */
    commercialAddress?: Address;
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
export { RegisterAccountHolderOptions, UpdateAccountHolderOptions, OnlineRegisterAccountHolderOptions };
