import Breakdown from './Breakdown';
import Amount from './Amount';
import Utils from '../../utils/Utils';
import {
  AccountType,
  OperationSide,
  OperationStatus,
  OperationType,
  PaymentMethodKey
} from '../../utils/enums';

class Operation {
  /** Amount of the operation */
  amount: Amount;
  /** Reference for the operation */
  transactionId: string;
  /** direction of the operation */
  side: OperationSide;
  /** status of the operation */
  status: string;
  /** Marketplace reference for this order */
  orderReference: string;
  /** type of the operation */
  type: string;
  /** operation Date */
  date?: Date;
  /** Key identifier of the payment method type id */
  paymentMethodKey?: PaymentMethodKey;
  /** BIC SEPA or SWIFT (Bank Identifier Code) */
  bic?: string;
  /** */
  label?: string;
  /** Reference of the initial operation (in case of reimbursement) */
  parentReference?: string;
  /** breakdownList for payin */
  breakdownList: Array<Breakdown> = [];
  /** Account type issuer in case of a payout or transfer */
  issuerAccountType?: string;
  /** Third Party issuer in case of a payout or transfer */
  issuerThirdParty?: string;
  /** Issuer account number in case of a payout or transfer */
  issuerAccountNumber?: string;
  /** Issuer account currency in case of a payout or transfer */
  issuerAccountCurrency?: string;
  /** Receiver Third Party in case of transfer or recharge */
  receiverThirdParty?: string;
  /** Receiver account type  in case of transfer or recharge */
  receiverAccountType?: string;
  /** Receiver account number in case of transfer or recharge */
  receiverAccountNumber?: string;
  /** Receiver account currency in case of transfer or recharge */
  receiverAccountCurrency?: string;
  /** JSON data for the marketplace. This data is not used by payment system */
  metaData?: object;
  /** ISO 8601 format (ex: 20210325T082300+01:00) */
  creationDateTime?: string;
  /** Virtual Iban for payin */
  iban?: string;
  /**  */
  accountType?: AccountType;
  /** A string representing the account number */
  accountNumber?: string;
  /** Currency code in 3 characters ISO format */
  accountCurrency?: string;
  /** Amount already cached. */
  cachedCumulAmount?: string;
  /** Label of the operation. */
  operationLabel?: string;
  /** Status explanation. */
  relatedMsgStatusLabel?: string;
  /**  */
  thirdPartyName?: string;
  /** A string representing the account number. */
  accountCptNumber?: string;
  /**  */
  accountCptTypeLabel?: AccountType;
  /** Currency code in 3 characters ISO format. */
  accountCptCurrencyCode?: string;
  /**  */
  thirdPartyCptName?: string;

  constructor(data: { [key: string]: any }) {
    // required data
    this.amount = new Amount(data.amount);

    if (data.transactionId) this.transactionId = data.transactionId;
    else throw new Error('Missing required field: transactionId');

    if (
      data.side &&
      Object.values(OperationSide).some((side: string) => side === data.side)
    ) {
      this.side = <OperationSide>data.side;
    } else {
      throw new Error('Missing required field or invalid data: side');
    }

    if (
      data.status &&
      Object.values(OperationStatus).some(
        (status: string) => status === data.status
      )
    ) {
      this.status = <OperationStatus>data.status;
    } else {
      throw new Error('Missing required field or invalid data: status');
    }

    if (
      data.type &&
      Object.values(OperationType).some((type: string) => type === data.type)
    ) {
      this.type = <OperationType>data.type;
    } else {
      throw new Error('Missing required field or invalid data: type');
    }

    if (
      data.accountType &&
      Object.values(AccountType).some(
        (accountType: string) => accountType === data.accountType
      )
    ) {
      this.accountType = <AccountType>data.accountType;
    }

    if (
      data.accountCptTypeLabel &&
      Object.values(AccountType).some(
        (accountCptTypeLabel: string) =>
          accountCptTypeLabel === data.accountCptTypeLabel
      )
    ) {
      this.accountCptTypeLabel = <AccountType>data.accountCptTypeLabel;
    }

    // not required
    this.date = Utils.stringToDate(data.date);
    this.parentReference = data.parentReference;
    this.orderReference = data.orderReference;
    this.paymentMethodKey = <PaymentMethodKey>data.paymentMethodKey;
    this.bic = data.bic;
    this.label = data.label;
    this.breakdownList = [];

    if (data.breakdownList) {
      this.breakdownList = data.breakdownList.map((x: any) => new Breakdown(x));
    }

    this.issuerAccountType = data.issuerAccountType;
    this.issuerThirdParty = data.issuerThirdParty;
    this.issuerAccountNumber = data.issuerAccountNumber;
    this.issuerAccountCurrency = data.issuerAccountCurrency;
    this.receiverThirdParty = data.receiverThirdParty;
    this.receiverAccountType = data.receiverAccountType;
    this.receiverAccountNumber = data.receiverAccountNumber;
    this.receiverAccountCurrency = data.receiverAccountCurrency;
    this.metaData = data.metaData;
    this.creationDateTime = data.creationDateTime;
    this.iban = data.iban;
    this.accountNumber = data.accountNumber;
    this.accountCurrency = data.accountCurrency;
    this.cachedCumulAmount = data.cachedCumulAmount;
    this.operationLabel = data.operationLabel;
    this.relatedMsgStatusLabel = data.relatedMsgStatusLabel;
    this.thirdPartyName = data.thirdPartyName;
    this.accountCptNumber = data.accountCptNumber;
    this.accountCptCurrencyCode = data.accountCptCurrencyCode;
    this.thirdPartyCptName = data.thirdPartyCptName;
  }
}

export default Operation;
