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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiRest_1 = require("../../utils/apiRest");
var MandateApi = /** @class */ (function (_super) {
    __extends(MandateApi, _super);
    function MandateApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description Generate a new direct debit mandate without payment.
     * @param {CreateMandateOptions} options mandate creation options.
     * @prop {PaymentMethod}      transPaymentMethod: Payment method information
     * @prop {Payer}              payer: Payer's details
     * @prop {string | undefined} firstName
     * @prop {string | undefined} lastName
     * @prop {string | undefined} address: Road name and number
     * @prop {string | undefined} city
     * @prop {string | undefined} postalCode
     * @prop {string | undefined} country: Country in 3 letters ISO format
     * @prop {string | undefined} iban
     * @prop {string | undefined} email
     * @prop {string | undefined} state
     * @prop {string | undefined} gender
     * @prop {string | undefined} phoneNumber
     * @prop {PaymentSequence | undefined} sequence: For payment method with mandate, the sequence is FRST for first use of recurrent mandate, RCUR for use of recurrent mandate, FNAL for last use of recurrent mandate, OOFF for a mandate used only one time
     * @prop {string | undefined} reference: For payment with mandate, this field is the reference to the mandate for sequence RCUR or LAST. For payment with card, this field is the transactionId of the first authorization transaction
     * @prop {string | undefined} socialReason: Compagny name
     * @prop {string | undefined} address2: Additional address
     * @prop {string | undefined} urlRedirect: Url where the customer must be redirected at the end of the payment with the partner. This URL is completed by /success, /error or /cancel according to the partner response status. When the customer will be redirected to the marketPlace at the end of the partner payment process, the paymentDetails function must be called to terminate payment with the data transmitted by the partner. For development purpose, you can use http:\/\/127.0.0.1 (localhost is not supported)
     * @prop {OTP | undefined} otp: Force signature by OTP
     * @returns {CreateMandateResponse}  New direct debit mandate generation response. If ok, either reference (UMR) or mandateId (withour UMR) should be present.
     * @example
     * ````javascript
      payoutApi.createPayout({
        endToEndId: "1",
        accountNumber: "12345678",
        paymentMethodAlias: "12334566",
        payoutAmount: new Amount(10000, "EUR")
      }).then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
     * ````
     */
    MandateApi.prototype.createPayout = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (success, reject) {
                        var opt = {
                            transPaymentMethod: options.transPaymentMethod,
                            payer: options.payer,
                            details: {
                                firstName: options.firstName,
                                lastName: options.lastName,
                                address: options.address,
                                city: options.city,
                                postalCode: options.postalCode,
                                country: options.country,
                                iban: options.iban,
                                email: options.email,
                                state: options.state,
                                gender: options.gender,
                                phoneNumber: options.phoneNumber,
                                sequence: options.sequence,
                                reference: options.reference,
                                socialReason: options.socialReason,
                                address2: options.address2
                            },
                            urlRedirect: options.urlRedirect,
                            otp: options.otp
                        };
                        return _this.sendToApiPost('/mandate/create', opt).then(function (resp) {
                            if (+resp.resultCode === 0)
                                success({
                                    reference: resp.reference,
                                    mandateId: resp.mandateId
                                });
                            else
                                reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                        });
                    })];
            });
        });
    };
    /**
    * @description "Update existing SEPA Direct Debit mandate with information like Unique Mandate Reference (UMR).
    * @param {UpdateMandateOptions} options mandate update options.
    * @prop {string} reference: Unique Mandate Reference (UMR) value to be added on the mandate
    * @prop {string} mandateId: Identifier for the mandate to update
    * @example
    * ````javascript
      payoutApi.updatePayout({
        reference: "2020110907201100Y0H1102",
        mandateId: "5120"
      }).then(resp => {
        console.log(resp)
      }).catch(error => {
        console.log(error)
      })
    * ````
    */
    MandateApi.prototype.updateMandate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (success, reject) {
                        return _this.sendToApiPost('/mandate/update', options).then(function (resp) {
                            if (+resp.resultCode === 0)
                                success(null);
                            else
                                reject(new Error("".concat(resp.resultCode, " - ").concat(resp.resultCodeMessage)));
                        });
                    })];
            });
        });
    };
    return MandateApi;
}(apiRest_1.default));
exports.default = MandateApi;
