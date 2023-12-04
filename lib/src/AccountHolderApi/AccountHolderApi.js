"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRest_1 = require("../../utils/ApiRest");
const PhysicalPerson_1 = require("../models/PhysicalPerson");
const Requirement_1 = require("../models/Requirement");
const enums_1 = require("../../utils/enums");
const AccountHolder_1 = require("../models/AccountHolder");
class AccountHolderApi extends ApiRest_1.default {
    /**
     * Creates a new accountHolder.
     * @param {RegisterAccountHolderOptions} options accountHolder registering options.
     * @prop {string} socialReason
     * @prop {string} companyName
     * @prop {string} country
     * @prop {string} legalForm
     * @prop {string} registrationNumber
     * @prop {Address} masterAddress
     * @prop {Address | undefined} commercialAddress
     * @prop {string} turnover
     * @prop {boolean | YesOrNo} regulatedSociety
     * @prop {Array<Person>} physicalPersons
     * @prop {Account} account
     * @returns {AccountHolder} The created account holder.
     * @example
     * ````javascript
     *accountHolderApi.create({
     *  account: new Account("FRA", "EUR", "FR7618206004320000165551134", 230.00),
     *  companyName: "lusis",
     *  country: "FRA",
     *  legalForm: "SAS",
     *  commercialAddress: new Address("entr", "ville", "91000", "FRA"),
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
    async register(options) {
        if (typeof options.regulatedSociety === "boolean") {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        const result = await this.sendToApiPost("/accountHolder/register", options);
        return new AccountHolder_1.default((result.requirements ?? []).map((x) => new Requirement_1.default(x)), (result.physicalPersons ?? []).map((x) => new PhysicalPerson_1.default(x)), result.paymentMethodAlias, result.accountNumber, result.requestId);
    }
    /**
     * Update account holder registration.
     * @param {UpdateAccountHolderOptions} options accountHolder updating options.
     * @prop {string | undefined} socialReason
     * @prop {string | undefined} companyName
     * @prop {string | undefined} country
     * @prop {string | undefined} registrationNumber
     * @prop {Address | undefined} masterAddress
     * @prop {Address | undefined} commercialAddress
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
     *  companyName: "lusis",
     *  country: "FRA",
     *  masterAddress: new Address("entr", "ville", "91000", "FRA"),
     *  physicalPersons: [new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.LegalRepresentative])],
     *  registrationNumber: "49775144944556",
     *  regulatedSociety: YesOrNo.Yes,
     *  socialReason: "entreprise",
     *  turnover: "47586.00",
     *  commercialAddress: new Address("rue", "ville", "91199", "FRA"),
     *  requestId: accountHolder.requestId!,
     *  currency: "EUR"
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    async update(options) {
        if (typeof options.regulatedSociety === "boolean") {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        const result = await this.sendToApiPost("/accountHolder/update", options);
        return new AccountHolder_1.default((result.requirements ?? []).map((x) => new Requirement_1.default(x)), (result.physicalPersons ?? []).map((x) => new PhysicalPerson_1.default(x)), result.paymentMethodAlias, result.accountNumber, result.requestId);
    }
    /**
     * Upload document in registration process.
     * @param {Requirement} requirement The requirements to upload.
     * @param {string} requestId ID to identify processing request.
     * @returns {AccountHolder} The updated account holder.
     * @example
     * ````javascript
     *accountHolderApi.uploadDocument(new Requirement("52211", "Y", "", "JPEG", "test", "Passeport"), "12345")).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    async uploadDocument(requirement, requestId) {
        const payload = {
            json: {
                requestId: requestId,
                requirements: [
                    {
                        id: requirement.id,
                        fileExt: requirement.fileExt,
                        fileType: requirement.fileType
                    }
                ]
            },
            files: [
                {
                    name: 'file',
                    fileName: `${requirement.id}.${requirement.fileExt}`,
                    data: requirement.fileContent
                }
            ]
        };
        const result = await this.sendToApiPost("/accountHolder/uploadDocument", payload);
        return new AccountHolder_1.default((result.requirements ?? []).map((x) => new Requirement_1.default(x)), (result.physicalPersons ?? []).map((x) => new PhysicalPerson_1.default(x)), result.paymentMethodAlias, result.accountNumber, result.requestId);
    }
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
    async registrationDetails(requestId) {
        const result = await this.sendToApiPost("/accountHolder/registrationDetails", { requestId: requestId });
        return new AccountHolder_1.default((result.requirements ?? []).map((x) => new Requirement_1.default(x)), (result.physicalPersons ?? []).map((x) => new PhysicalPerson_1.default(x)), result.paymentMethodAlias, result.accountNumber, result.requestId);
    }
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
    async unregister(requestId, accountNumber) {
        await this.sendToApiPost("/accountHolder/unregister", {
            requestId: requestId,
            accountNumber: accountNumber
        });
    }
}
exports.default = AccountHolderApi;
