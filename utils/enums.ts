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
  LAST = "LAST",
  /** for a mandate used only one time */
  OOFF = "OOFF"
}

enum PayoutAutoFrequency {
  Deactivate = "0",
  OnceADay = "1",
  OnceAWeek = "2",
  OnceAMonth = "3"
}

enum FileType {
  JPEG = "JPEG",
  JPG = "JPG",
  PNG = "PNG",
  PDF = "PDF"
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
  Reload = 'Reload'
}

enum RequirementStatus {
  Missing = 'MISSING',
  Partial = 'PARTIAL',
  ToValidate = 'TOVALIDATE',
  Validated = 'VALIDATED',
  Refused = 'REFUSED'
}

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
enum RequirementFileType {
  Passeport = "Passeport",
  IdCard = "Id card",
  ResidencePermit = "Residence permit",
  Company_Kbis_extract_less_than_3_months_old = "Company Kbis extract less than 3 months old",
  Copy_of_the_articles_of_association = "Copy of the articles of association",
  Professional_RIB_on_behalf_of_the_individual = "Professional RIB on behalf of the individual",
  Professional_RIB_on_behalf_of_the_legal_entity = "Professional RIB on behalf of the legal entity",
  AG_PV = "AG PV",
  BATICA_Certificate_of_Deposit_or_Register_Extract = "BATICA Certificate of Deposit or Register Extract",
  List_A  = "List A ",
  FIRCOSOFT = "FIRCOSOFT",
  Account_agreement = "Account agreement",
  Country_questionnaire = "Country questionnaire",
  Front_side_ID_card = "Front-side ID card",
  Back_ID_card = "Back ID card",
}

enum CbChallenge {
  NoPreference = "01",
  NoChallengeRequired = "02",
  DesiredChallenge = "03",
  RequiredChallenge = "04"
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
  CbChallenge
}