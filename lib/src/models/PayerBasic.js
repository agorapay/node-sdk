class PayerBasic {
    /**
     *
     * @param reference - Reference of your payer.
     */
    constructor(reference) {
        this.reference = reference;
    }
    encode() {
        return {
            reference: this.reference,
        };
    }
}
export default PayerBasic;
