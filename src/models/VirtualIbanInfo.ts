import { VirtualIbanStatus, VirtualIbanMode, isEnumValue } from '../../utils/enums.js';

/**
 * Class representing a virtual IBAN info.
 */
class VirtualIbanInfo {

  /** Marketplace or merchant account number. */
  accountNumber?: string;

  /** Generated virtual IBAN. */
  virtualIBAN?: string;

  /** */
  status?: VirtualIbanStatus;

  /**  */
  mode?: VirtualIbanMode;

  /** Payer reference associated to the virtual IBAN. */
  payerRef?: string;

  constructor(data: { [key: string]: any });  
  constructor(...args: any[]) {
    if (args.length === 1) {
      const data = args[0];

      this.accountNumber = data.accountNumber;
      this.virtualIBAN = data.virtualIBAN;
      this.status = isEnumValue(VirtualIbanStatus, data.status)
        ? data.status
        : undefined;
      this.mode = isEnumValue(VirtualIbanMode, data.mode)
        ? data.mode
        : undefined;
      this.payerRef = data.payerRef;
    } else {
      this.accountNumber = args[0];
      this.virtualIBAN = args[1];
      this.status = isEnumValue(VirtualIbanStatus, args[2]) ? args[2] : undefined;
      this.mode = isEnumValue(VirtualIbanMode, args[3]) ? args[3] : undefined;
      this.payerRef = args[4];
    } 
  }
}

export default VirtualIbanInfo;
