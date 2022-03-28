"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbChallenge = exports.RequirementFileType = exports.AccountType = exports.RequirementStatus = exports.OperationType = exports.OperationStatus = exports.OperationSide = exports.Role = exports.Gender = exports.PaymentMethodType = exports.FileType = exports.PayoutAutoFrequency = exports.PaymentSequence = exports.PaymentMethodKey = exports.AccountStatus = exports.TicketMode = exports.TicketSide = exports.TicketFormat = exports.TicketType = exports.TransactionStatus = exports.OrderStatus = exports.YesOrNo = void 0;
var YesOrNo;
(function (YesOrNo) {
    YesOrNo["Yes"] = "Y";
    YesOrNo["No"] = "N";
})(YesOrNo || (YesOrNo = {}));
exports.YesOrNo = YesOrNo;
var OrderStatus;
(function (OrderStatus) {
    /** The order is created. */
    OrderStatus["Created"] = "created";
    /** Payment in progress. */
    OrderStatus["PendingPayment"] = "pending_payment";
    /** Payment is completed. */
    OrderStatus["Complete"] = "complete";
    /** Payment is completed but all order amount is not payed. */
    OrderStatus["PartialComplete"] = "partial_complete";
    /** The order is canceled. */
    OrderStatus["Canceled"] = "canceled";
})(OrderStatus || (OrderStatus = {}));
exports.OrderStatus = OrderStatus;
/**
  * Status of a transaction. The following value may be provided:
  * * `Created`: The transaction is just created. No payment is already made.
  * * `InProgress`: Payment is in progress
  * * `Accepted`: Payment is accepted
  * * `Completed`: Payment confirmation is received
  * * `Canceled`: Payment is canceled
  * * `Refused`: payment is refused
  * * `Abandonned` : Payment is not performed
  */
var TransactionStatus;
(function (TransactionStatus) {
    /** The transaction is just created. No payment is already made. */
    TransactionStatus["Created"] = "created";
    /** Payment is in progress. */
    TransactionStatus["InProgress"] = "in_progress";
    /** Payment is accepted. */
    TransactionStatus["Accepted"] = "accepted";
    /** Payment confirmation is received. */
    TransactionStatus["Completed"] = "completed";
    /** Payment is canceled. */
    TransactionStatus["Canceled"] = "canceled";
    /** payment is refused. */
    TransactionStatus["Refused"] = "refused";
    /** Payment is not performed. */
    TransactionStatus["Abandonned"] = "abandonned";
})(TransactionStatus || (TransactionStatus = {}));
exports.TransactionStatus = TransactionStatus;
var TicketType;
(function (TicketType) {
    TicketType["Client"] = "C";
    TicketType["Merchant"] = "M";
})(TicketType || (TicketType = {}));
exports.TicketType = TicketType;
var TicketFormat;
(function (TicketFormat) {
    TicketFormat["JSON"] = "J";
    TicketFormat["PDF"] = "P";
})(TicketFormat || (TicketFormat = {}));
exports.TicketFormat = TicketFormat;
var TicketSide;
(function (TicketSide) {
    TicketSide["DEBIT"] = "1";
    TicketSide["CREDIT"] = "2";
})(TicketSide || (TicketSide = {}));
exports.TicketSide = TicketSide;
var TicketMode;
(function (TicketMode) {
    TicketMode["PROD"] = "PROD";
    TicketMode["TEST"] = "TEST";
})(TicketMode || (TicketMode = {}));
exports.TicketMode = TicketMode;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["Activated"] = "activated";
    AccountStatus["Deactivated"] = "deactivated";
    AccountStatus["Registered"] = "registered";
    AccountStatus["Suspended"] = "suspended";
})(AccountStatus || (AccountStatus = {}));
exports.AccountStatus = AccountStatus;
var AccountType;
(function (AccountType) {
    AccountType["principal"] = "1";
    AccountType["waiting"] = "3";
    AccountType["suspense"] = "4";
    AccountType["change"] = "5";
    AccountType["commission"] = "6";
    AccountType["voucher"] = "13";
    AccountType["reliquat"] = "14";
    AccountType["autorization"] = "15";
    AccountType["preAutorization"] = "16";
})(AccountType || (AccountType = {}));
exports.AccountType = AccountType;
var PaymentMethodKey;
(function (PaymentMethodKey) {
    PaymentMethodKey["SDD"] = "SDD";
    PaymentMethodKey["SCT"] = "SCT";
    PaymentMethodKey["transfer"] = "transfer";
    PaymentMethodKey["card"] = "card";
    PaymentMethodKey["swift"] = "swift";
    PaymentMethodKey["B2B"] = "B2B";
    PaymentMethodKey["Voucher"] = "Voucher";
    PaymentMethodKey["Remainder"] = "Remainder";
})(PaymentMethodKey || (PaymentMethodKey = {}));
exports.PaymentMethodKey = PaymentMethodKey;
var PaymentSequence;
(function (PaymentSequence) {
    /** for first use of recurrent mandate */
    PaymentSequence["FRST"] = "FRST";
    /** for use of recurrent mandate */
    PaymentSequence["RCUR"] = "RCUR";
    /** for last use of recurrent mandate */
    PaymentSequence["LAST"] = "LAST";
    /** for a mandate used only one time */
    PaymentSequence["OOFF"] = "OOFF";
})(PaymentSequence || (PaymentSequence = {}));
exports.PaymentSequence = PaymentSequence;
var PayoutAutoFrequency;
(function (PayoutAutoFrequency) {
    PayoutAutoFrequency["Deactivate"] = "0";
    PayoutAutoFrequency["OnceADay"] = "1";
    PayoutAutoFrequency["OnceAWeek"] = "2";
    PayoutAutoFrequency["OnceAMonth"] = "3";
})(PayoutAutoFrequency || (PayoutAutoFrequency = {}));
exports.PayoutAutoFrequency = PayoutAutoFrequency;
var FileType;
(function (FileType) {
    FileType["JPEG"] = "JPEG";
    FileType["JPG"] = "JPG";
    FileType["PNG"] = "PNG";
    FileType["PDF"] = "PDF";
})(FileType || (FileType = {}));
exports.FileType = FileType;
/**
* * Sepa Direct Debit (1)
* * Sepa Credit Transfer (2)
* * Transfer (3)
* * Card (4)
* * SWIFT (5)
* * Sepa Direct Debit B2B (6)
* * Letter of credit (7)
* * Voucher (8)
* * Remainder(9)
*/
var PaymentMethodType;
(function (PaymentMethodType) {
    /** Sepa Direct Debit   */
    PaymentMethodType[PaymentMethodType["SepaDirectDebit"] = 1] = "SepaDirectDebit";
    /** Sepa Credit Transfer  */
    PaymentMethodType[PaymentMethodType["SepaCreditTransfer"] = 2] = "SepaCreditTransfer";
    /** Transfer  */
    PaymentMethodType[PaymentMethodType["Transfer"] = 3] = "Transfer";
    /** Card  */
    PaymentMethodType[PaymentMethodType["Card"] = 4] = "Card";
    /** SWIFT  */
    PaymentMethodType[PaymentMethodType["SWIFT"] = 5] = "SWIFT";
    /** Sepa Direct Debit B2B  */
    PaymentMethodType[PaymentMethodType["SepaDirectDebitB2B"] = 6] = "SepaDirectDebitB2B";
    /** Letter of credit  */
    PaymentMethodType[PaymentMethodType["LetterOfcredit"] = 7] = "LetterOfcredit";
    /** Voucher  */
    PaymentMethodType[PaymentMethodType["Voucher"] = 8] = "Voucher";
    /** Remainder */
    PaymentMethodType[PaymentMethodType["Remainder"] = 9] = "Remainder";
})(PaymentMethodType || (PaymentMethodType = {}));
exports.PaymentMethodType = PaymentMethodType;
/**
 * * Male (M),
 * * Female (F)
 */
var Gender;
(function (Gender) {
    Gender["Male"] = "M";
    Gender["Female"] = "F";
})(Gender || (Gender = {}));
exports.Gender = Gender;
var Role;
(function (Role) {
    Role["BeneficialOwner"] = "BE";
    Role["Manager"] = "D";
    Role["Mandatary"] = "MD";
    Role["ProtalAdmin"] = "AP";
    Role["LegalRepresentative"] = "CP";
})(Role || (Role = {}));
exports.Role = Role;
var OperationSide;
(function (OperationSide) {
    OperationSide["Payin"] = "PAYIN";
    OperationSide["Payout"] = "PAYOUT";
})(OperationSide || (OperationSide = {}));
exports.OperationSide = OperationSide;
var OperationStatus;
(function (OperationStatus) {
    OperationStatus["Registered"] = "registered";
    OperationStatus["Waiting"] = "waiting";
    OperationStatus["Cashed"] = "cashed";
    OperationStatus["Cancelled"] = "cancelled";
    OperationStatus["Suspended"] = "suspended";
    OperationStatus["Rejected"] = "rejected";
})(OperationStatus || (OperationStatus = {}));
exports.OperationStatus = OperationStatus;
var OperationType;
(function (OperationType) {
    OperationType["Payment"] = "Payment";
    OperationType["Refund"] = "Refund";
    OperationType["Manual"] = "Manual";
    OperationType["Transfer"] = "Transfer";
    OperationType["Purchase"] = "Purchase";
    OperationType["Reload"] = "Reload";
})(OperationType || (OperationType = {}));
exports.OperationType = OperationType;
var RequirementStatus;
(function (RequirementStatus) {
    RequirementStatus["Missing"] = "MISSING";
    RequirementStatus["Partial"] = "PARTIAL";
    RequirementStatus["ToValidate"] = "TOVALIDATE";
    RequirementStatus["Validated"] = "VALIDATED";
    RequirementStatus["Refused"] = "REFUSED";
})(RequirementStatus || (RequirementStatus = {}));
exports.RequirementStatus = RequirementStatus;
/**
* * `Passeport` - Passeport
* * `IdCard` - Id card
* * `ResidencePermit` - Residence permit
* * `Company_Kbis_extract_less_than_3_months_old` - Company Kbis extract less than 3 months old
* * `Copy_of_the_articles_of_association` - Copy of the articles of association
* * `Professional_RIB_on_behalf_of_the_individual` - Professional RIB on behalf of the individual
* * `Professional_RIB_on_behalf_of_the_legal_entity` - Professional RIB on behalf of the legal entity
* * `AG_PV` - AG PV
* * `BATICA_Certificate_of_Deposit_or_Register_Extract` - BATICA Certificate of Deposit or Register Extract
* * `List_A` -="List A
* * `FIRCOSOFT` - FIRCOSOFT
* * `Account_agreement` - Account agreement
* * `Country_questionnaire` - Country questionnaire
* * `Front_side_ID_card` - Front-side ID card
* * `Back_ID_card` - Back ID card
 */
var RequirementFileType;
(function (RequirementFileType) {
    RequirementFileType["Passeport"] = "Passeport";
    RequirementFileType["IdCard"] = "Id card";
    RequirementFileType["ResidencePermit"] = "Residence permit";
    RequirementFileType["Company_Kbis_extract_less_than_3_months_old"] = "Company Kbis extract less than 3 months old";
    RequirementFileType["Copy_of_the_articles_of_association"] = "Copy of the articles of association";
    RequirementFileType["Professional_RIB_on_behalf_of_the_individual"] = "Professional RIB on behalf of the individual";
    RequirementFileType["Professional_RIB_on_behalf_of_the_legal_entity"] = "Professional RIB on behalf of the legal entity";
    RequirementFileType["AG_PV"] = "AG PV";
    RequirementFileType["BATICA_Certificate_of_Deposit_or_Register_Extract"] = "BATICA Certificate of Deposit or Register Extract";
    RequirementFileType["List_A"] = "List A ";
    RequirementFileType["FIRCOSOFT"] = "FIRCOSOFT";
    RequirementFileType["Account_agreement"] = "Account agreement";
    RequirementFileType["Country_questionnaire"] = "Country questionnaire";
    RequirementFileType["Front_side_ID_card"] = "Front-side ID card";
    RequirementFileType["Back_ID_card"] = "Back ID card";
})(RequirementFileType || (RequirementFileType = {}));
exports.RequirementFileType = RequirementFileType;
var CbChallenge;
(function (CbChallenge) {
    CbChallenge["NoPreference"] = "01";
    CbChallenge["NoChallengeRequired"] = "02";
    CbChallenge["DesiredChallenge"] = "03";
    CbChallenge["RequiredChallenge"] = "04";
})(CbChallenge || (CbChallenge = {}));
exports.CbChallenge = CbChallenge;
