enum YesOrNo {
  Yes = "Y",
  No = "N"
}

enum OrderStatus {
  /** The order is created. */
  Created = "created",
  /** Payment in progress. */
  PendingPayment = "pending_payment",
  /** Payment is completed. */
  Complete = "complete",
  /** Payment is completed but all order amount is not payed. */
  PartialComplete = "partial_complete",
  /** The order is canceled. */
  Canceled = "canceled"
}

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
enum TransactionStatus {
  /** The transaction is just created. No payment is already made. */
  Created = "created",
  /** Payment is in progress. */
  InProgress = "in_progress",
  /** Payment is accepted. */
  Accepted = "accepted",
  /** Payment confirmation is received. */
  Completed = "completed",
  /** Payment is canceled. */
  Canceled = "canceled",
  /** payment is refused. */
  Refused = "refused",
  /** Payment is not performed. */
  Abandonned = "abandonned",
  /** Payment is not performed. */
  Refund = "refund",
}

enum TicketType {
  Client = "C",
  Merchant = "M"
}

enum TicketFormat {
  JSON = "J",
  PDF = "P"
}

enum TicketSide {
  DEBIT = "1",
  CREDIT = "2"
}

enum TicketMode {
  PROD = "PROD",
  TEST = "TEST"
}

enum AccountStatus {
  Activated = 'activated', 
  Deactivated = 'deactivated', 
  Registered = 'registered', 
  Suspended = 'suspended'
}

enum AccountType {
  principal = "1",
  waiting = "3",
  suspense = "4",
  change = "5",
  commission = "6",
  voucher = "13",
  reliquat = "14",
  autorization = "15",
  preAutorization = "16"
}

enum PaymentMethodKey {
  SDD = 'SDD',
  SCT = 'SCT',
  transfer = 'transfer',
  card = 'card',
  swift = 'swift',
  B2B = 'B2B',
  Voucher = 'Voucher',
  Remainder = 'Remainder'
}

enum PaymentSequence {
  /** for first use of recurrent mandate */
  FRST = "FRST",
  /** for use of recurrent mandate */
  RCUR = "RCUR",
  /** for last use of recurrent mandate */
  //LAST = "LAST",
  FNAL = "FNAL",
  /** for a mandate used only one time */
  OOFF = "OOFF"
}

enum PayoutAutoFrequency {
  Deactivate = "0",
  OnceADay = "1",
  OnceAWeek = "2",
  OnceAMonth = "3",
  AutoOnThreshold = "10"
}

enum FileType {
  JPEG = "JPEG",
  JPG = "JPG",
  PNG = "PNG",
  PDF = "PDF",
  DOC = "DOC",
  XLS = "XLS",
  XLSX = "XLSX"
}

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
enum PaymentMethodType {
  /** Sepa Direct Debit   */
  SepaDirectDebit = 1,
  /** Sepa Credit Transfer  */
  SepaCreditTransfer = 2,
  /** Transfer  */
  Transfer = 3,
  /** Card  */
  Card = 4,
  /** SWIFT  */
  SWIFT = 5,
  /** Sepa Direct Debit B2B  */
  SepaDirectDebitB2B = 6,
  /** Letter of credit  */
  LetterOfcredit = 7,
  /** Voucher  */
  Voucher = 8,
  /** Remainder */
  Remainder = 9
}

/**
 * * Male (M),
 * * Female (F)
 */
enum Gender {
  Male = 'M',
  Female = 'F'
}

enum Role {
  BeneficialOwner = "BE",
  Manager = "D",
  Mandatary = "MD",
  ProtalAdmin = "AP",
  LegalRepresentative = "CP"
}

enum OperationSide {
  Payin = 'PAYIN',
  Payout = 'PAYOUT'
}

enum OperationStatus {
  Registered = 'registered',
  Waiting = 'waiting',
  Cashed = 'cashed',
  Cancelled = 'cancelled',
  Suspended = 'suspended',
  Rejected = 'rejected'
}

enum OperationType {
  Payment = 'Payment',
  Refund = 'Refund',
  Manual = 'Manual',
  Transfer = 'Transfer',
  Purchase = 'Purchase',
  Reload = 'Reload',
  Authorization = 'Authorization',
  PreAutho = 'Pre-autho',
  Unpaid = 'Unpaid',
  Reject = 'Reject',
  Fee = 'Fee'
}

enum RequirementStatus {
  Missing = 'MISSING',
  Partial = 'PARTIAL',
  ToValidate = 'TOVALIDATE',
  Validated = 'VALIDATED',
  Refused = 'REFUSED'
}

enum PaymentOptions {
  CardOnFile = 'cardOnFile',
  WithoutCardOnFile = 'withoutCardOnFile'
}

enum OTP {
  One = '1',
  Y = 'Y'
}

enum InstantPayment {
  Expected = 'EXPECTED'
}

enum IbanPaymentMethodKey {
  SCT = 'SCT',
  SCTInst = 'SCT INST'
}

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
enum RequirementFileType {
  PASSPORT = 'PASSPORT',
  IDCARD_FRONT_BACK = 'IDCARD_FRONT_BACK',
  COMPANY_REG = 'COMPANY_REG',
  BANK_ID = 'BANK_ID',
  COMPANY_REG_WORLD = 'COMPANY_REG_WORLD',
  OTHER_DOC = 'OTHER_DOC',
  ACCOUNT_AGR = 'ACCOUNT_AGR',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  IDCARD_FRONT = 'IDCARD_FRONT',
  IDCARD_BACK = 'IDCARD_BACK',
  NONPROFIT_REG = 'NONPROFIT_REG',
  NONPROFIT_OJ = 'NONPROFIT_OJ',
  COMPANY_ART = 'COMPANY_ART',
  REPORT_GEN_ASS = 'REPORT_GEN_ASS',
  PERMANENT_RES = 'PERMANENT_RES',
  UBO_REG = 'UBO_REG',
  SIRENE_REG = 'SIRENE_REG',
  RECEIPT_APP = 'RECEIPT_APP',
  SIRENE_NOT = 'SIRENE_NOT',
  INDIVIDUAL_REG = 'INDIVIDUAL_REG',
  PROPERTY_TAX = 'PROPERTY_TAX',
  HOUSING_TAX = 'HOUSING_TAX',
  INVOICE = 'INVOICE',
  COOP_APP = 'COOP_APP',
  PROOF_REG = 'PROOF_REG',
  COMPANY_CER_WORLD = 'COMPANY_CER_WORLD',
  COMPANY_ART_WORLD = 'COMPANY_ART_WORLD',
  UBO_REG_WORLD = 'UBO_REG_WORLD',
  SYND_ID = 'SYND_ID',
  REPORT_GEN_SYND = 'REPORT_GEN_SYND'
}

enum CbChallenge {
  NoPreference = "01",
  NoChallengeRequired = "02",
  DesiredChallenge = "03",
  RequiredChallenge = "04"
}

enum ReportType {
  ACCOUNT_STATEMENT = "ACCOUNT_STATEMENT",
  INVOICE = "INVOICE",
  IC_FEE_REPORT = "IC_FEE_REPORT"
}

enum ReportFormat {
  PDF = "P",
  CSV = "C"
}

enum PageOption {
  iframe = "iframe",
  full = "full",
  page = "page"
}

export { 
  YesOrNo, 
  OrderStatus, 
  TransactionStatus, 
  TicketType, 
  TicketFormat, 
  TicketSide, 
  TicketMode, 
  AccountStatus, 
  PaymentMethodKey, 
  PaymentSequence, 
  PayoutAutoFrequency,
  FileType,
  PaymentMethodType,
  Gender,
  Role,
  OperationSide,
  OperationStatus,
  OperationType,
  RequirementStatus,
  AccountType,
  RequirementFileType,
  CbChallenge,
  ReportType,
  ReportFormat,
  PageOption,
  PaymentOptions,
  OTP,
  InstantPayment,
  IbanPaymentMethodKey
}