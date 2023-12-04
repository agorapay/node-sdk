import PaymentMethod from "../models/PaymentMethod";
import ApiRest from "../../utils/ApiRest";
import {GetAliasesOptions, GetAliasesResponse, ListPaymentMethodsOptions, ListPaymentMethodsResponse, RemoveAliasOptions} from "./PaymentMethodInterfaces";
import {PaymentMethodResponse} from "../PayinApi/PayinInterfaces";

export default class PaymentMethodApi extends ApiRest {
  /**
   * List payment methods and eventually aliases
   * @param {ListPaymentMethodsOptions} options
   */
  public async listPaymentMethods(options: ListPaymentMethodsOptions): Promise<ListPaymentMethodsResponse> {
    const result = await this.sendToApiPost<PaymentMethodResponse>("/paymentMethods/list", options);
    return {
      paymentMethodList: (result.paymentMethodList ?? []).map(method => new PaymentMethod(method.id, method.aliasList, method.label, method.type)) ?? undefined,
    };
  }

  /**
   * Get list of aliases according to the payer reference, and eventually for a specific payment method
   * @param {GetAliasesOptions} options
   */
  public async getPaymentMethodAliases(options: GetAliasesOptions): Promise<GetAliasesResponse> {
    const result = await this.sendToApiPost<PaymentMethodResponse>("/paymentMethods/getAlias", options);
    return {
      paymentMethodList: (result.paymentMethodList ?? []).map(method => new PaymentMethod(method.id, method.aliasList, method.label, method.type)),
    };
  }

  /**
   * Remove payment method alias for a given alias id
   * @param options
   */
  public async removePaymentAlias(options: RemoveAliasOptions): Promise<void> {
    await this.sendToApiPost<PaymentMethodResponse>("/paymentMethods/removeAlias", options);
  }
}
