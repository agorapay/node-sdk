import { AccountStatus } from '../../utils/enums.js';
/**
 * Class representing a payment account.
 */
class PaymentAccount {
    constructor(data) {
        if (!data.account)
            throw new Error('Missing required field: account');
        const account = data.account;
        this.number = account.number;
        this.name = account.name;
        if (account.status &&
            Object.values(AccountStatus).some((status) => status === account.status))
            this.status = account.status;
        this.currency = account.currency;
        this.type = account.type;
        this.payoutAuto = account.payoutAuto;
        this.floorLimit = account.floorLimit;
        this.balance = account.balance;
        this.reference = account.reference;
        this.availableBalance = account.availableBalance;
        this.iban = account.iban;
    }
}
export default PaymentAccount;
