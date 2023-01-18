import { AccountStatus } from "../../utils/enums";
import Utils from "../../utils/Utils";

/**
 * Class representing a payment account.
 */
export default class PaymentAccount {
  /** Number of the account. */
  public number?: string;

  /** Thirdparty name. */
  public name?: string;

  /** The status os the account. */
  public status?: AccountStatus;

  /** Currency code in 3 characters ISO format. */
  public currency?: string;

  /** Account type. */
  public type?: string;

  /** 1 if payout auto activated. */
  public payoutAuto?: string;

  /** Minimum amount for payout auto. */
  public floorLimit?: string;

  /**  */
  public balance?: string;

  /** Account reference. */
  public reference?: string;

  /** Available balance is the balance minus the floor limit. Set to 0 if result is negative */
  public availableBalance?: string;

  constructor(data: { [key: string]: any }) {
    if (!data.account) {
      throw new Error("Missing required field: account");
    }

    const account = data.account;
    this.number = account.number;
    this.name = account.name;
    this.status = Utils.hasEnumOrDefault(account.status, AccountStatus, undefined);
    this.currency = account.currency;
    this.type = account.type;
    this.payoutAuto = account.payoutAuto;
    this.floorLimit = account.floorLimit;
    this.balance = account.balance;
    this.reference = account.reference;
    this.availableBalance = account.availableBalance;
  }
}
