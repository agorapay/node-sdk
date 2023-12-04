/**
 * PaymentMethodSimple
 * Payment method information
 */
export interface PaymentMethodSimple {
    /**
     * ID of the type of payment method.
     * This id must be provided to identify the payment method.
     * The list of payment method IDs is provided when your AgoraPay account is created.
     * */
    id: string;
}
