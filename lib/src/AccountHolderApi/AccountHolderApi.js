"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apiRest_1 = require("../../utils/apiRest");
var PhysicalPerson_1 = require("../models/PhysicalPerson");
var Requirement_1 = require("../models/Requirement");
var enums_1 = require("../../utils/enums");
var AccountHolder_1 = require("../models/AccountHolder");
var AccountHolderApi = /** @class */ (function (_super) {
    __extends(AccountHolderApi, _super);
    function AccountHolderApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    AccountHolderApi.prototype.register = function (options) {
        var _this = this;
        if (typeof options.regulatedSociety === 'boolean') {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/accountHolder/register', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map(function (x) { return new Requirement_1.default(x); })
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map(function (x) { return new PhysicalPerson_1.default(x); })
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    AccountHolderApi.prototype.update = function (options) {
        var _this = this;
        if (typeof options.regulatedSociety === 'boolean') {
            options.regulatedSociety = options.regulatedSociety
                ? enums_1.YesOrNo.Yes
                : enums_1.YesOrNo.No;
        }
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/accountHolder/update', options).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map(function (x) { return new Requirement_1.default(x); })
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map(function (x) { return new PhysicalPerson_1.default(x); })
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    AccountHolderApi.prototype.uploadDocument = function (requirement, requestId) {
        var _this = this;
        return new Promise(function (success, reject) {
            var payload = {
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
                        fileName: "".concat(requirement.id, ".").concat(requirement.fileExt),
                        data: requirement.fileContent
                    }
                ]
            };
            return _this.sendToApiPost('/accountHolder/uploadDocument', payload, true).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map(function (x) { return new Requirement_1.default(x); })
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map(function (x) { return new PhysicalPerson_1.default(x); })
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    AccountHolderApi.prototype.registrationDetails = function (requestId) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiGet('/accountHolder/registrationDetails', {
                requestId: requestId
            }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                else {
                    try {
                        success(new AccountHolder_1.default(resp.requirements
                            ? resp.requirements.map(function (x) { return new Requirement_1.default(x); })
                            : [], resp.physicalPersons
                            ? resp.physicalPersons.map(function (x) { return new PhysicalPerson_1.default(x); })
                            : [], resp.paymentMethodAlias, resp.accountNumber, resp.requestId));
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            });
        });
    };
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
    AccountHolderApi.prototype.unregister = function (requestId, accountNumber) {
        var _this = this;
        return new Promise(function (success, reject) {
            return _this.sendToApiPost('/accountHolder/unregister', {
                requestId: requestId,
                accountNumber: accountNumber
            }).then(function (resp) {
                if (+resp.resultCode !== 0)
                    reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
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
    };
    return AccountHolderApi;
}(apiRest_1.default));
exports.default = AccountHolderApi;
