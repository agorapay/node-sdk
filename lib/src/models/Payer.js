"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Payer = /** @class */ (function () {
    /**
     *
     * @param reference - IP Address of the customer.
     * @param IPAddress - reference of the customer from the marketplace.
     * @param userAgent - The browser information use to request the payment.
     * @param language - The default language of the browser. The first two characters are used to identify the language code.
     */
    function Payer(reference, IPAddress, userAgent, language) {
        this.IPAddress = IPAddress;
        this.reference = reference;
        this.userAgent = userAgent;
        this.language = language;
    }
    Payer.prototype.encode = function () {
        return {
            IPAddress: this.IPAddress,
            reference: this.reference,
            userAgent: this.userAgent,
            language: this.language
        };
    };
    return Payer;
}());
exports.default = Payer;
