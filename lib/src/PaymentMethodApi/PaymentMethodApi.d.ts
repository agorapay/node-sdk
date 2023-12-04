import ApiRest from "../../utils/ApiRest";
import { GetAliasesOptions, GetAliasesResponse, ListPaymentMethodsOptions, ListPaymentMethodsResponse, RemoveAliasOptions } from "./PaymentMethodInterfaces";
export default class PaymentMethodApi extends ApiRest {
    /**
     * List payment methods and eventually aliases
     * @param {ListPaymentMethodsOptions} options
     */
    listPaymentMethods(options: ListPaymentMethodsOptions): Promise<ListPaymentMethodsResponse>;
    /**
     * Get list of aliases according to the payer reference, and eventually for a specific payment method
     * @param {GetAliasesOptions} options
     */
    getPaymentMethodAliases(options: GetAliasesOptions): Promise<GetAliasesResponse>;
    /**
     * Remove payment method alias for a given alias id
     * @param options
     */
    removePaymentAlias(options: RemoveAliasOptions): Promise<void>;
}
