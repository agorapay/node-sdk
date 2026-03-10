class SignedMandateFile {
  /** Id of the payment transaction. */
  transactionId?: string;

  /** Mandate reference. */
  reference?: string;

  /** PDF file base64 encoded. */
  signedFileContent?: string;

  /**
   * @constructor
   * @param data - Object which contains required mandate file attributes.
   * @throws Will throw an error if one of the required attributes is missing.
   */
  constructor(data: { [key: string]: any }) {
    this.transactionId = data.transactionId;
    this.reference = data.reference;
    this.signedFileContent = data.signedFileContent;
  }
}

export default SignedMandateFile;
