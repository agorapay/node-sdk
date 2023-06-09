"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageOption = exports.ReportFormat = exports.ReportType = exports.PaymentOptions = exports.CbChallenge = exports.RequirementFileType = exports.AccountType = exports.RequirementStatus = exports.OperationType = exports.OperationStatus = exports.OperationSide = exports.Role = exports.Gender = exports.PaymentMethodType = exports.FileType = exports.PayoutAutoFrequency = exports.PaymentSequence = exports.PaymentMethodKey = exports.AccountStatus = exports.TicketMode = exports.TicketSide = exports.TicketFormat = exports.TicketType = exports.TransactionStatus = exports.OrderStatus = exports.YesOrNo = void 0;
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
    /** Payment is not performed. */
    TransactionStatus["Refund"] = "refund";
})(TransactionStatus || (TransactionStatus = {}));
exports.TransactionStatus = TransactionStatus;
var PaymentOptions;
(function (PaymentOptions) {
    PaymentOptions["CardOnFile"] = "cardOnFile";
    PaymentOptions["WithoutCardOnFile"] = "withoutCardOnFile";
})(PaymentOptions || (PaymentOptions = {}));
exports.PaymentOptions = PaymentOptions;
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
    PaymentSequence["FNAL"] = "FNAL";
    // LAST = "LAST",
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
    PayoutAutoFrequency["AutoOnThreshold"] = "10";
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
    PaymentMethodType["SepaDirectDebit"] = "1";
    /** Sepa Credit Transfer  */
    PaymentMethodType["SepaCreditTransfer"] = "2";
    /** Transfer  */
    PaymentMethodType["Transfer"] = "3";
    /** Card  */
    PaymentMethodType["Card"] = "4";
    /** SWIFT  */
    PaymentMethodType["SWIFT"] = "5";
    /** Sepa Direct Debit B2B  */
    PaymentMethodType["SepaDirectDebitB2B"] = "6";
    /** Letter of credit  */
    PaymentMethodType["LetterOfcredit"] = "7";
    /** Voucher  */
    PaymentMethodType["Voucher"] = "8";
    /** Remainder */
    PaymentMethodType["Remainder"] = "9";
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
 INDIVIDUAL_INDIFICATION
 * * `PASSPORT`: Passeport
 * * `IDCARD_FRONT_BACK`: Identity document
 * * `IDCARD_FRONT`: Identity document
 * * `IDCARD_BACK`: Identity document
 * * `PERMANENT_RES`: Permanent residence permit

 BUSINESS_IDENTIFICATION
 * * `COMPANY_REG`: Proof of registration

 NONPROFIT_IDENTICIATION
 * * `NONPROFIT_REG`: Proof of existence of the association
 * * `NONPROFIT_OJ`: JOAFE publication

 BUSINESS_ARTICLES
 * * `COMPANY_ART`: Final status

 NONPROFIT_DIRECTORS
 * * `REPORT_GEN_ASS`: Minutes of last general assembly

 BUSINESS_UBO
 * * `UBO_REG`: Register of beneficial owners filed with the registry

 LEGAL_EXISTENCE
 * * `SIRENE_REG`: INSEE file less than 3 months old
 * * `RECEIPT_APP`: Receipt of prefecture
 * * `SIRENE_NOT`: Notice of situation

 REGISTRATION_PROOF
 * * `INDIVIDUAL_REG`: Registration with the Trade and Companies Register or Trades and Crafts Register

 ADDRESS_PROOF
 * * `PROPERTY_TAX`: Property tax less than a year old
 * * `HOUSING_TAX`: Housing tax less than a year old
 * * `INVOICE`: Energy or telephony supplier bill (less than 3 months old)

 COOPERATIVE_APPROUVAL
 * * `COOP_APP`: Approval of the High Council of the agricultural cooperative (if agricultural cooperative)

 SUBSCRIPTION_PROOF
 * * `PROOF_REG`: Proof of registration for SCs and SCPs

 BUSINESS_IDENTIFICATION_WORLD
 * * `COMPANY_REG_WORLD`: Extract from the commercial register (original + translation)
 * * `COMPANY_CER_WORLD`: Certificate of legal validity of the company (original + translation)

 BUSINESS_ARTICLES_WORLD
 * * `COMPANY_ART_WORLD`: Definitive statutes or equivalent (original + translation)

 BUSINESS_UBO_WORLD
 * * `UBO_REG_WORLD`: Beneficial ownership declaration form (original + translation)

 BANK_ID
 * * `BANK_ID`: Bank Account Proof

 OTHER_DOC
 * * `OTHER_DOC`: Additional supporting documents

 ACCOUNT_AGR
 * * `ACCOUNT_AGR`: Account Agreement

 QUESTIONNAIRE
 * * `QUESTIONNAIRE`: Country Questionnaire (FR)
 */
var RequirementFileType;
(function (RequirementFileType) {
    RequirementFileType["PASSPORT"] = "PASSPORT";
    RequirementFileType["IDCARD_FRONT_BACK"] = "IDCARD_FRONT_BACK";
    RequirementFileType["COMPANY_REG"] = "COMPANY_REG";
    RequirementFileType["BANK_ID"] = "BANK_ID";
    RequirementFileType["COMPANY_REG_WORLD"] = "COMPANY_REG_WORLD";
    RequirementFileType["OTHER_DOC"] = "OTHER_DOC";
    RequirementFileType["ACCOUNT_AGR"] = "ACCOUNT_AGR";
    RequirementFileType["QUESTIONNAIRE"] = "QUESTIONNAIRE";
    RequirementFileType["IDCARD_FRONT"] = "IDCARD_FRONT";
    RequirementFileType["IDCARD_BACK"] = "IDCARD_BACK";
    RequirementFileType["NONPROFIT_REG"] = "NONPROFIT_REG";
    RequirementFileType["NONPROFIT_OJ"] = "NONPROFIT_OJ";
    RequirementFileType["COMPANY_ART"] = "COMPANY_ART";
    RequirementFileType["REPORT_GEN_ASS"] = "REPORT_GEN_ASS";
    RequirementFileType["PERMANENT_RES"] = "PERMANENT_RES";
    RequirementFileType["UBO_REG"] = "UBO_REG";
    RequirementFileType["SIRENE_REG"] = "SIRENE_REG";
    RequirementFileType["RECEIPT_APP"] = "RECEIPT_APP";
    RequirementFileType["SIRENE_NOT"] = "SIRENE_NOT";
    RequirementFileType["INDIVIDUAL_REG"] = "INDIVIDUAL_REG";
    RequirementFileType["PROPERTY_TAX"] = "PROPERTY_TAX";
    RequirementFileType["HOUSING_TAX"] = "HOUSING_TAX";
    RequirementFileType["INVOICE"] = "INVOICE";
    RequirementFileType["COOP_APP"] = "COOP_APP";
    RequirementFileType["PROOF_REG"] = "PROOF_REG";
    RequirementFileType["COMPANY_CER_WORLD"] = "COMPANY_CER_WORLD";
    RequirementFileType["COMPANY_ART_WORLD"] = "COMPANY_ART_WORLD";
    RequirementFileType["UBO_REG_WORLD"] = "UBO_REG_WORLD";
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
var ReportType;
(function (ReportType) {
    ReportType["ACCOUNT_STATEMENT"] = "ACCOUNT_STATEMENT";
    ReportType["INVOICE"] = "INVOICE";
    ReportType["IC_FEE_REPORT"] = "IC_FEE_REPORT";
})(ReportType || (ReportType = {}));
exports.ReportType = ReportType;
var ReportFormat;
(function (ReportFormat) {
    ReportFormat["PDF"] = "P";
    ReportFormat["CSV"] = "C";
})(ReportFormat || (ReportFormat = {}));
exports.ReportFormat = ReportFormat;
var PageOption;
(function (PageOption) {
    PageOption["iframe"] = "iframe";
    PageOption["full"] = "full";
    PageOption["page"] = "page";
})(PageOption || (PageOption = {}));
exports.PageOption = PageOption;
