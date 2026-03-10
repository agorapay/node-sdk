"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRest_1 = __importDefault(require("../../utils/apiRest"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
const PhysicalPerson_1 = __importDefault(require("../models/PhysicalPerson"));
const Requirement_1 = __importDefault(require("../models/Requirement"));
const enums_1 = require("../../utils/enums");
const AccountHolder_1 = __importDefault(require("../models/AccountHolder"));
const AccountHolderOnlineRegisterResponse_1 = __importDefault(require("../models/AccountHolderOnlineRegisterResponse"));
class AccountHolderApi extends apiRest_1.default {
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
     *  masterAddress: new Address("entr", "ville", "91000", "FRA"),
     *  owner: new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.BeneficialOwner]),
     *  physicalPersons: [new Person(Gender.Male, "foo", "foo", "foo@foo.fr", "0101010101", [Role.LegalRepresentative])],
     *  registrationNumber: "49775144944556",
     *  regulatedSociety: YesOrNo.Yes,
     *  socialReason: "entreprise",
     *  turnover: "47586.00",
     *  commercialAddress: new Address("rue", "ville", "91199", "FRA")
     *}).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    register(options) {
        if (typeof options.regulatedSociety === 'boolean') {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        return new Promise((success, reject) => {
            return this.sendToApiPost('/accountHolder/register', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map((x) => new Requirement_1.default(x))
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map((x) => new PhysicalPerson_1.default(x))
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId, resp.status));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }
    /**
     * @param {OnlineRegisterAccountHolderOptions} options
     * @returns {Promise<AccountHolderOnlineRegisterResponse>}
     * @example
     * ````javascript
     *accountHolderApi.onlineRegister({
     *                 "productCode": "MPos",
     *                 "externalReference ": "REF EXTERNE COMMERCANT 12345",
     *                 "NAFCode": "COMM123",
     *                 "VATCode": "TAXID COMM 123",
     *                 "socialReason": "Mon entreprise",
     *                 "companyName": "Entreprise",
     *                 "country": "FR",
     *                 "legalForm": "SAS",
     *                 "registrationNumber": "4953288578",
     *                 "masterAddress": {
     *                   "address": "Rue d'ici",
     *                   "city": "Ville",
     *                   "postalCode": "00000",
     *                   "countryCode": "FR"
     *                 },
     *                 "turnover": "456789.00",
     *                 "currency": "EUR",
     *                 "regulatedSociety": "N",
     *                 "physicalPersons": [
     *                   {
     *                     "gender": "M",
     *                     "firstName": "Contact",
     *                     "lastName": "Principal",
     *                     "email": "pnom@email.com",
     *                     "phoneNumber": "+337687686876",
     *                     "resident": "R",
     *                     "birthDate": "19901231",
     *                     "citizenShipCode": "FR",
     *                     "birthCountryCode": "FR",
     *                     "birthPlaceTown": "PARIS",
     *                     "birthPlaceZipCode": "75020",
     *                     "roles": [
     *                       {
     *                         "role": "BE"
     *                       },
     *                       {
     *                         "role": "CP"
     *                       }
     *                     ]
     *                   },
     *                   {
     *                     "gender": "M",
     *                     "firstName": "Dirigeant",
     *                     "lastName": "Nom",
     *                     "email": "d@email.com",
     *                     "phoneNumber": "0687686876",
     *                     "resident": "R",
     *                     "birthDate": "20040228",
     *                     "citizenShipCode": "FR",
     *                     "birthPlaceZipCode": "75013",
     *                     "roles": [
     *                       {
     *                         "role": "D"
     *                       }
     *                     ]
     *                   }
     *                 ],
     *                 "account": {
     *                   "countryCode": "FR",
     *                   "currency": "EUR",
     *                   "name": "Mon nom",
     *                   "address": "5 cité Rougement 75006 Paris",
     *                   "iban": "FR762098098320°492490",
     *                   "floorLimit": "0.00"
     *                 }
     *               }
     *             }
     *           }
     *         }).then(resp => {
     *  console.log(resp)
     *}).catch(error => {
     *  console.log(error)
     *})
     * ````
     */
    async onlineRegister(options) {
        return Utils_1.default.handleApiResponse(this.sendToApiPost('/accountHolder/onlineRegister', options), (resp) => new AccountHolderOnlineRegisterResponse_1.default(resp.sellerReference, resp.requestId, resp.tokenId, resp.externalReference));
    }
    /**
     * Update account holder registration.
     * @param {UpdateAccountHolderOptions} options accountHolder updating options.
     * @prop {string | undefined} socialReason
     * @prop {string | undefined} companyName
     * @prop {string | undefined} country
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
    update(options) {
        if (typeof options.regulatedSociety === 'boolean') {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        return new Promise((success, reject) => {
            return this.sendToApiPost('/accountHolder/update', options).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map((x) => new Requirement_1.default(x))
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map((x) => new PhysicalPerson_1.default(x))
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId, resp.status));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }
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
    uploadDocument(requirement, requestId) {
        return new Promise((success, reject) => {
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
            return this.sendToApiPost('/accountHolder/uploadDocument', payload, true).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map((x) => new Requirement_1.default(x))
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map((x) => new PhysicalPerson_1.default(x))
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId, resp.status));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
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
    registrationDetails(requestId) {
        return new Promise((success, reject) => {
            return this.sendToApiGet('/accountHolder/registrationDetails', {
                requestId: requestId
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map((x) => new Requirement_1.default(x))
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map((x) => new PhysicalPerson_1.default(x))
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId, resp.status));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
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
    unregister(requestId, accountNumber) {
        return new Promise((success, reject) => {
            return this.sendToApiPost('/accountHolder/unregister', {
                requestId: requestId,
                accountNumber: accountNumber
            }).then((resp) => {
                if (+resp.resultCode !== 0)
                    reject(new Error(`${resp.resultCode} - ${resp.resultCodeMessage}`));
                else {
                    try {
                        success(null);
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }
}
exports.default = AccountHolderApi;
