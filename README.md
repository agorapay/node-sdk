CAPSPAYMENT Node.Js SDK
=================================================

CAPSPayment SDK is a Node.Js client library to work with CAPSPayment REST API.

Usage
-------------------------------------------------

### Usage inside your app

```typescript
import { CAPSPaymentAPI } from 'caps-payment'

const capsPaymentApi = new CAPSPaymentAPI('myTokenUser', 'myTokenPassword', 'https://myTokenAuthUrl', 'https://theCAPSPaymentURL', 2000)

const operationApi = capsPaymentApi.operationApi()

operationApi.listOperation({
  pagination: 10,
  currency: "EUR"
}).then(resp => {
  console.log(resp)
}).catch(err => {
  console.log(err)
})
```


### Authenticate manually

By default the SDK will try to authenticate automatically when needed. If you want to obtain a fresh token, you can use the `authenticate` method.

```typescript
const newToken = await capsPaymentApi.commonApi().authenticate();
```

### Serverless environment

In a serverless environment, you may need to store the AuthToken in a cache/database to avoid requesting a new one at each function call.

```typescript
// Get the token from the cache or database if you have one
const token = await getTokenFromYourCacheOrDatabase();

capsPaymentApi.commonApi().setAuthToken(token); // optional, will authenticate at first call if not set
// note: If you set a expired token it will be refreshed automatically

// ... do your stuff with the SDK

// you should store the token in the cache or database if the token has been refreshed
const newToken = capsPaymentApi.commonApi().getAuthToken();
if (!newToken.equals(token) && !newToken.isInvalidOrExpired) {
  await storeTokenInYourCacheOrDatabase(newToken);
}
```

List SDK functions to use for API Payin
-------------------------------------------------

| Payin Endpoint      | SDK Functions | Method |
| ----------- | ----------- | -----------
| /payin/payment      | Payin.payment(options: PaymentOptionsWithOrderId, PaymentOptionsWithoutOrderId)       | POST
| /payin/paymentDetails   | Payin.paymentDetails(options: PaymentDetailsOptions)        | POST
| /payin/paymentMethods   | Payin.paymentMethods(options: PaymentMethodOptions)        | POST
| /payin/capture   | Payin.capture(options: CaptureOptions)        | POST
| /payin/cancel   | Payin.cancel(options: CancelOptions)        | POST
| /payin/orderDetails   | Payin.orderDetails(orderId: number)        | GET
| /payin/adjustPayment   | Payin.adjustPayment(options: AdjustPaymentOptions)        | POST
| /payin/paymentIframe   | Payin.paymentIframe(options: PaymentIFrameOptions)        | POST
| /payin/refund   | Payin.refund(options: RefundOptions)        | POST
| /payin/mandate   | Payin.mandate(transactionId?: string, reference?: string)        | POST
| /payin/ticket   | Payin.ticket(transactionId: string, type: TicketType, format: TicketFormat, message?: string)        | POST

List SDK functions to use for API Operation
-------------------------------------------------

| Operation Endpoint      | SDK Functions | Method
| ----------- | ----------- | ----------- |
| /operations/list      | Operation.operationList(options: ListOperationOptions)       | POST

List SDK functions to use for API PaymentAccount
-------------------------------------------------

| PaymentAccount Endpoint      | SDK Functions | Method 
| ----------- | ----------- | ----------- |
| /paymentAccount/List   | PaymentAccount.list(options: PaymentAccountListOptions)        | POST
| /paymentAccount   | PaymentAccount.details(accountNumber: string)       | GET
| /paymentAccount/payoutAuto   | PaymentAccount.payoutAuto(options: PaymentAccountPayoutAutoOptions)       | POST
| /paymentAccount/credit   | PaymentAccount.credit(options: PaymentAccountCreditOptions)       | POST
| /paymentAccount/setIBAN   | PaymentAccount.setIBAN(options: PaymentAccountSetIBANOptions)       | POST
| /paymentAccount/disableIBAN   | PaymentAccount.disableIBAN(requestId: string, accountNumber?: string)       | POST

List SDK functions to use for API Payout
-------------------------------------------------

| Payout Endpoint      | SDK Functions | Method 
| ----------- | ----------- | ----------- |
| /payout/create      | Payout.createPayout(options: CreatePayoutOptions)       | POST

List SDK functions to use for API Transfer
-------------------------------------------------

| Transfer Endpoint      | SDK Functions | Method
| ----------- | ----------- | ----------- |
| /transfer/create      | Transfer.createTransfer(options: CreateTransferOptions)       | POST

List SDK functions to use for API Account Holder
-------------------------------------------------

| Transfer Endpoint      | SDK Functions | Method
| ----------- | ----------- | ----------- |
| /accountHolder/register      | AccountHolder.register(options: RegisterAccountHolderOptions)       | POST
| /accountHolder/update      | AccountHolder.update(options: UpdateAccountHolderOptions)       | POST
| /accountHolder/uploadDocument      | AccountHolder.uploadDocument(requirements: Array<Requirement>, requestId: string)       | POST
| /accountHolder/registrationDetails      | AccountHolder.registrationDetails(requestId: string, accountNumber?: string)       | POST
| /accountHolder/unregister      | AccountHolder.unregister(requestId: string, accountNumber?: string)       | POST
 
