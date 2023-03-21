/**
 * Base class for webhooks
 */
export default abstract class WebHook {
    /** Operation (fix value) */
    eventCode: string;
    /** Version number of the webhook */
    versionNumber: string;
    /** TransactionId for this payment */
    transactionId: string;
    /** The orderReference sent by the Marketplace for this payment */
    orderRef: string;
    /**
     * @param code The expected eventCode for this webhook
     * @param data The data to be used to create the webhook
     */
    protected constructor(code: string, data: Partial<WebHook>);
}
