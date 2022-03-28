import { PaymentMethodType } from '../../utils/enums';
import Alias from './Alias';
import Encodable from './Encodable';
declare class PaymentMethod implements Encodable {
    /** If alias exist for the customer and the payment Method. */
    aliasList?: Array<Alias>;
    /** Identifier of the payment method. */
    id: string;
    /** label of the payment Method. */
    label?: string;
    /** Id of the type of payment method
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
    type?: PaymentMethodType;
    /**
     *
     * @param id - If alias exist for the customer and the payment Method.
     * @param aliasList - Identifier of the payment method.
     * @param label - label of the payment Method.
     * @param type - Id of the type of payment method
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
    constructor(id: string, aliasList?: Array<Alias>, label?: string, type?: PaymentMethodType);
    encode(): {
        [key: string]: any;
    };
}
export default PaymentMethod;
