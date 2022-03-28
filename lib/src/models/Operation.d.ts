import Breakdown from './Breakdown';
import Amount from './Amount';
import { AccountType, OperationSide, PaymentMethodKey } from '../../utils/enums';
declare class Operation {
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
    breakdownList: Array<Breakdown>;
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
    constructor(data: {
        [key: string]: any;
    });
}
export default Operation;
