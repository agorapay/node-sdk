import Breakdown from "./Breakdown";
import Amount from "./Amount";
import Utils from "../../utils/Utils";
import { AccountType, OperationSide, OperationStatus, OperationType, PaymentMethodKey } from "../../utils/enums";

export default class Operation {
  /** Amount of the operation */
  public amount: Amount;
  /** Reference for the operation */
  public transactionId: string;
  /** direction of the operation */
  public side: OperationSide;
  /** status of the operation */
  public status: string;
  /** Marketplace reference for this order */
  public orderReference: string;
  /** type of the operation */
  public type: string;
  /** operation Date */
  public date?: Date;
  /** Key identifier of the payment method type id */
  public paymentMethodKey?: PaymentMethodKey;
  /** BIC SEPA or SWIFT (Bank Identifier Code) */
  public bic?: string;
  /** */
  public label?: string;
  /** Reference of the initial operation (in case of reimbursement) */
  public parentReference?: string;
  /** breakdownList for payin */
  public breakdownList: Breakdown[] = [];
  /** Account type issuer in case of a payout or transfer */
  public issuerAccountType?: string;
  /** Third Party issuer in case of a payout or transfer */
  public issuerThirdParty?: string;
  /** Issuer account number in case of a payout or transfer */
  public issuerAccountNumber?: string;
  /** Issuer account currency in case of a payout or transfer */
  public issuerAccountCurrency?: string;
  /** Receiver Third Party in case of transfer or recharge */
  public receiverThirdParty?: string;
  /** Receiver account type  in case of transfer or recharge */
  public receiverAccountType?: string;
  /** Receiver account number in case of transfer or recharge */
  public receiverAccountNumber?: string;
  /** Receiver account currency in case of transfer or recharge */
  public receiverAccountCurrency?: string;
  /** JSON data for the marketplace. This data is not used by payment system */
  public metaData?: object;
  /** ISO 8601 format (ex: 20210325T082300+01:00) */
  public creationDateTime?: string;
  /** Virtual Iban for payin */
  public iban?: string;
  /**  */
  public accountType?: AccountType;
  /** A string representing the account number */
  public accountNumber?: string;
  /** Currency code in 3 characters ISO format */
  public accountCurrency?: string;
  /** Amount already cached. */
  public cachedCumulAmount?: string;
  /** Label of the operation. */
  public operationLabel?: string;
  /** Status explanation. */
  public relatedMsgStatusLabel?: string;
  /**  */
  public thirdPartyName?: string;
  /** A string representing the account number. */
  public accountCptNumber?: string;
  /**  */
  public accountCptTypeLabel?: AccountType;
  /** Currency code in 3 characters ISO format. */
  public accountCptCurrencyCode?: string;
  /**  */
  public thirdPartyCptName?: string;

  constructor(data: { [key: string]: any }) {
    const side = Utils.hasEnumOrDefault(data.side, OperationSide, null);
    const status = Utils.hasEnumOrDefault(data.status, OperationStatus, null);
    const type = Utils.hasEnumOrDefault(data.type, OperationType, null);

    if (!data.transactionId) {
      throw new Error("Missing required field: transactionId");
    } else if (!side) {
      throw new Error("Missing required field or invalid data: side");
    } else if (!status) {
      throw new Error("Missing required field or invalid data: status");
    } else if (!type) {
      throw new Error("Missing required field or invalid data: type");
    }

    // required data
    this.amount = new Amount(data.amount);
    this.transactionId = data.transactionId;
    this.side = side;
    this.status = status;
    this.type = type;
    this.accountType = Utils.hasEnumOrDefault(data.accountType, AccountType, undefined);
    this.accountCptTypeLabel = Utils.hasEnumOrDefault(data.accountCptTypeLabel, AccountType, undefined);

    // not required
    this.date = Utils.stringToDate(data.date);
    this.parentReference = data.parentReference;
    this.orderReference = data.orderReference;
    this.paymentMethodKey = <PaymentMethodKey>data.paymentMethodKey;
    this.bic = data.bic;
    this.label = data.label;
    this.breakdownList = (data.breakdownList ?? []).map((x: any) => new Breakdown(x));
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
