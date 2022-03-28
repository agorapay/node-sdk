import { AccountStatus } from '../../utils/enums';
/**
 * Class representing a payment account.
 */
declare class PaymentAccount {
    /** Number of the account. */
    number?: string;
    /** Thirdparty name. */
    name?: string;
    /** The status os the account. */
    status?: AccountStatus;
    /** Currency code in 3 characters ISO format. */
    currency?: string;
    /** Account type. */
    type?: string;
    /** 1 if payout auto activated. */
    payoutAuto?: string;
    /** Minimum amount for payout auto. */
    floorLimit?: string;
    /**  */
    balance?: string;
    /** Account reference. */
    reference?: string;
    /** Avalibale balance is the balance minus the floor limit. Set to 0 if result is negative */
    availableBalance?: string;
    constructor(data: {
        [key: string]: any;
    });
}
export default PaymentAccount;
