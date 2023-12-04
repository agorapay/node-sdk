"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentMethod_1 = require("../models/PaymentMethod");
const ApiRest_1 = require("../../utils/ApiRest");
class PaymentMethodApi extends ApiRest_1.default {
    /**
     * List payment methods and eventually aliases
     * @param {ListPaymentMethodsOptions} options
     */
    async listPaymentMethods(options) {
        const result = await this.sendToApiPost("/paymentMethod/list", options);
        return {
            paymentMethodList: (result.paymentMethodList ?? []).map(method => new PaymentMethod_1.default(method.id, method.aliasList, method.label, method.type)) ?? undefined,
        };
    }
    /**
     * Get list of aliases according to the payer reference, and eventually for a specific payment method
     * @param {GetAliasesOptions} options
     */
    async getPaymentMethodAliases(options) {
        const result = await this.sendToApiPost("/paymentMethod/getAlias", options);
        return {
            paymentMethodList: (result.paymentMethodList ?? []).map(method => new PaymentMethod_1.default(method.id, method.aliasList, method.label, method.type)),
        };
    }
    /**
     * Remove payment method alias for a given alias id
     * @param options
     */
    async removePaymentAlias(options) {
        await this.sendToApiPost("/paymentMethod/removeAlias", options);
    }
}
exports.default = PaymentMethodApi;
