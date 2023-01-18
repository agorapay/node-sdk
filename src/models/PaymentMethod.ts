import { PaymentMethodType } from "../../utils/enums";
import Alias from "./Alias";
import Encodable from "./Encodable";

export default class PaymentMethod implements Encodable {
  /** If alias exist for the customer and the payment Method. */
  public aliasList?: Alias[];
  /** Identifier of the payment method. */
  public id: string;
  /** label of the payment Method. */
  public label?: string;
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
  public type?: PaymentMethodType;

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
  constructor(id: string, aliasList?: Alias[], label?: string, type?: PaymentMethodType) {
    this.aliasList = aliasList;
    this.id = id;
    this.label = label;
    this.type = type;
  }

  public encode(): { [key: string]: any } {
    return {
      aliasList: (this.aliasList ?? []).map((x) => x.encode()),
      id: this.id,
      label: this.label,
      type: this.type
    };
  }
}
