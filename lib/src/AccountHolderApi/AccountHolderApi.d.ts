import ApiRest from '../../utils/apiRest';
import Requirement from '../models/Requirement';
import { RegisterAccountHolderOptions, UpdateAccountHolderOptions } from './AccountHolderInterfaces';
import AccountHolder from '../models/AccountHolder';
declare class AccountHolderApi extends ApiRest {
    /**
     * Creates a new accountHolder.
     * @param {RegisterAccountHolderOptions} options accountHolder registering options.
     * @prop {string} socialReason
     * @prop {string} compagnyName
     * @prop {string} country
     * @prop {string} legalForm
     * @prop {string} registrationNumber
     * @prop {Address} masterAddress
     * @prop {Address | undefined} billingAddress
     * @prop {string} turnover
     * @prop {boolean | YesOrNo} regulatedSociety
     * @prop {Array<Person>} physicalPersons
     * @prop {Account} account
     * @returns {AccountHolder} The created account holder.
     * @example
     * ````javascript
     *accountHolderApi.create({
     *  account: new Account("FRA", "EUR", "FR7618206004320000165551134", 230.00),
     *  compagnyName: "lusis",
     *  country: "FRA",
     *  legalForm: "SAS",
     *  masterAddress: new Address("entr", "ville", "91000", "FRA"),
     *  owner: new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.BeneficialOwner]),
     *  physicalPersons: [new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.LegalRepresentative])],
     *  registrationNumber: "49775144944556",
     *  regulatedSociety: YesOrNo.Yes,
     *  socialReason: "entreprise",
     *  turnover: "47586.00",
     *  billingAddress: new Address("rue", "ville", "91199", "FRA")
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    register(options: RegisterAccountHolderOptions): Promise<AccountHolder>;
    /**
     * Update account holder registration.
     * @param {UpdateAccountHolderOptions} options accountHolder updating options.
     * @prop {string | undefined} socialReason
     * @prop {string | undefined} compagnyName
     * @prop {string | undefined} country
     * @prop {string | undefined} registrationNumber
     * @prop {Address | undefined} masterAddress
     * @prop {Address | undefined} billingAddress
     * @prop {string | undefined} turnover
     * @prop {boolean | YesOrNo | undefined} regulatedSociety
     * @prop {Array<Person> | undefined} physicalPersons
     * @prop {Account} account
     * @prop {string | undefined} currency
     * @prop {string} requestId
     * @returns {AccountHolder} The updated account holder.
     * @example
     * ````javascript
     *accountHolderApi.update({
     *  account: new Account("FRA", "EUR", "FR7618206004320000165551134", 230.00),
     *  compagnyName: "lusis",
     *  country: "FRA",
     *  masterAddress: new Address("entr", "ville", "91000", "FRA"),
     *  physicalPersons: [new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.LegalRepresentative])],
     *  registrationNumber: "49775144944556",
     *  regulatedSociety: YesOrNo.Yes,
     *  socialReason: "entreprise",
     *  turnover: "47586.00",
     *  billingAddress: new Address("rue", "ville", "91199", "FRA"),
     *  requestId: accountHolder.requestId!,
     *  currency: "EUR"
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    update(options: UpdateAccountHolderOptions): Promise<AccountHolder>;
    /**
     * Upload document in registration process.
     * @param {Array<Requirement>} requirements The requirements to upload.
     * @param {string} requestId ID to identify processing request.
     * @returns {AccountHolder} The updated account holder.
     * @example
     * ````javascript
     *accountHolderApi.uploadDocument([new Requirement("52211", "Y", "", "JPEG", "test", "Passeport")], "12345")).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    uploadDocument(requirements: Array<Requirement>, requestId: string): Promise<AccountHolder>;
    /**
     * Gets registration information.
     * @param {string} requestId Registration request identifier.
     * @returns {AccountHolder} The Account Holder.
     * @example
     * ````javascript
     *accountHolderApi.registrationDetails("12345").then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    registrationDetails(requestId: string): Promise<AccountHolder>;
    /**
     * Unregisters pending account holder registration.
     * @param {string} requestId ID to identify processing request.
     * @param {string | undefined} accountNumber Marketplace account number.
     * @example
     * ````javascript
     *accountHolderApi.unregister("12345").then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    unregister(requestId: string, accountNumber?: string): Promise<null>;
}
export default AccountHolderApi;
