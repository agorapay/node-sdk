/**
 * Base class for webhooks
 */
export default abstract class WebHook {
  /** Operation (fix value) */
  public eventCode: string;
  /** Version number of the webhook */
  public versionNumber: string;
  /** TransactionId for this payment */
  public transactionId: string;
  /** The orderReference sent by the Marketplace for this payment */
  public orderRef?: string;

  /**
   * @param code The expected eventCode for this webhook
   * @param data The data to be used to create the webhook
   */
  protected constructor(code: string, data: Partial<WebHook>) {
    if (!data) {
      throw new Error("WebHook data is required");
    } else if (!data.eventCode) {
      throw new Error("WebHook eventCode is required");
    } else if (code !== data.eventCode) {
      throw new Error(`WebHook eventCode has an invalid value (expected: ${code}, actual: ${data.eventCode})`);
    } else if (!data.versionNumber) {
      throw new Error("WebHook versionNumber is required");
    } else if (!data.transactionId) {
      throw new Error("WebHook transactionId is required");
    }

    this.eventCode = data.eventCode;
    this.versionNumber = data.versionNumber;
    this.transactionId = data.transactionId;
    this.orderRef = data.orderRef ?? undefined;
  }
}
