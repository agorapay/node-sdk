import Amount from './Amount.js';
import Commission from './Commission.js';
/**
 * Class representing a breakdown.
 */
class Breakdown {
    constructor(...args) {
        if (args.length === 1) {
            // from data
            const data = args[0];
            this.amount = new Amount(data.amount);
            if (!data.sellerAccountNumber)
                throw new Error('Missing required field: sellerAccountNumber');
            this.sellerAccountNumber = data.sellerAccountNumber;
            this.label = data.label;
            if (data.commission) {
                this.commission = new Commission(data.commission);
            }
        }
        else {
            this.amount = args[0];
            this.sellerAccountNumber = args[1];
            this.label = args[2];
            this.commission = args[3];
        }
    }
    encode() {
        return {
            amount: this.amount.encode(),
            sellerAccountNumber: this.sellerAccountNumber,
            label: this.label,
            commission: this.commission ? this.commission.encode() : undefined
        };
    }
}
export default Breakdown;
