/**
 * @prop {string} firstName - Seller first name
 * @prop {string} lastName - Seller last name
 * @prop {string} email -
 * @prop {string} phone - Seller phone number
 * @prop {string} socialReason - Seller social reason
 * @prop {string} accountFloorLimit - Seller floor limit amount. The value of the amount in decimal with max 2 digits after separator. Only digits and dot are authorized.
 * @prop {string} language - The first two characters are used to identify the language code. Must be in upper case. Only french is supported at this time.
 */
interface InitSelfcareOptions {
  /** Seller first name */
  firstName: string;
  /** Seller last name */
  lastName: string;
  /** */
  email: string;
  /** Seller phone number */
  phone: string;
  /** Seller social reason */
  socialReason: string;
  /** Seller floor limit amount. The value of the amount in decimal with max 2 digits after separator. Only digits and dot are authorized. */
  accountFloorLimit: string;
  /** The first two characters are used to identify the language code. Must be in upper case. Only french is supported at this time. */
  language: string;
}

/**
 * @prop {string | undefined} requestId - ID to identify processing request
 * @prop {string | undefined} statusLabel - Request status label
 */
interface InitSelfcareResponse {
  /** ID to identify processing request. */
  requestId?: string;
  /** Request status label */
  statusLabel?: string;
}

export { InitSelfcareOptions, InitSelfcareResponse };
