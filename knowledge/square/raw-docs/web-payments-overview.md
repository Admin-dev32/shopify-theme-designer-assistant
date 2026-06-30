# web-payments-overview

Source: https://developer.squareup.com/docs/web-payments/overview
Downloaded: 2026-06-30T20:41:10.561Z

---

Web Payments SDK 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Payments Take Payments Card Payments Delayed Capture Partial Payments Statement Descriptions Card Surcharges ACH Bank Transfer Payment Afterpay and Clearpay Payments Cash App Payments Cash Payments External Payments House Accounts Collect Application Fees Update Payment and Tip Amounts Retrieve Payments Troubleshoot Webhooks Refunds Refund Payments Refund a Payment with an App Fee Retrieve Refunds Process an Unlinked Refund Webhooks Disputes Process Disputes Test in the Sandbox Take Payments on Hardware Terminal API Quickstart Take Payments for Orders Take One-Off Payments Manage Terminals POS App Pairing Monitor Square Terminals Check Device Information Customize Terminal Checkouts Add Payment and Checkout Features Save Card on File Print or Issue Receipts Customize the Idle Screen Custom Screen Workflows Confirmation Screen Signature Capture Screen Data Collection Screen Menu Selection List Screen QR Code Screen Link and Dismiss Actions Manage Terminal Actions Mobile Payments SDK Build on Android Authorize the Mobile Payments SDK Pair and Manage Card Readers Take a Payment Tap to Pay on Android Offline Payments Handling Errors Build on iOS Authorize the Mobile Payments SDK Pair and Manage Card Readers Take a Payment Tap to Pay on iPhone Offline Payments Configure for Square Stand or Square Kiosk Handling Errors Migrate from Reader SDK React Native Plugin Flutter Plugin Point of Sale API How It Works Build on Android Build on iOS Build on Mobile Web Find Your Android Fingerprint Use the API in Offline Mode Add an Alert Dialog Helper Class Accept E-Money Payments Accept QR Payments Mobile Web Technical Reference Payments API Integration Take Payments Online Web Payments SDK Quickstart Set Up the Web Client App Add the SDK to the Web Client Deploy the Application Take a Card Payment Integrate Digital Wallets Apple Pay Google Pay Digital Wallet Payment Requests ACH Bank Transfer Store and Charge Bank Accounts on File Afterpay Cash App Pay Square Gift Card Payments Take a Gift Card Payment Take Partial Payments Customize the Card Entry Form Charge and Store Cards Add a Content Security Policy Exception Handling In-App Payments SDK Quickstart Set up the Client Deploy the Server Install the SDK Build on Android Build on iOS Integrate Digital Wallets Google Pay Apple Pay Localize an Application Gift Card Payments Flutter Plugin React Native Plugin Customize the Payment Entry Form Connect to a Backend Service Remove the Postal Code Requirement Troubleshoot How It Works Strong Customer Authentication Verify a Buyer Checkout API Quick Pay Checkout Square Order Checkout Subscription Plan Checkout Checkout Settings Checkout Configurations Manage Checkout Guidelines and Limitations Common Pitfalls and Solutions Subscriptions API Subscription Plans and Variations Manage Subscriptions Subscription Actions and Events Pause, Resume, or Cancel Subscriptions Subscription Billing and Invoices Swap Subscription Plan Variations Invoices API Create and Publish Invoices Retrieve, List, or Search Invoices Create or Delete Invoice Attachments Update Invoices Cancel or Delete Invoices Pay or Refund Invoices Walkthrough: Create and Publish Invoices Cards Manage Cards Create a Card on File from Payment ID Create a Card on File and Make a Payment Create a Shared Card on File and Make a Payment Manage Card Declines Payouts List Payouts Get Payout List Payout Entries Bank Accounts API Bank Account API Operations Payment Methods by Country Payments Pricing Strong Customer Authentication Payment Minimums /
 Payments /
 Take Payments Online Web Payments SDK
 Applies to: Web Payments SDK | Payments API | Cards API | Customers API 
 Learn about the Square Web Payments SDK and taking payments in a web client. 
 On this page Overview Requirements and limitations SDK and payment acceptance implementation Web Payments SDK features Payment tokens Create a customer profile Accepting cards with postal codes Payment session timeout Application integrations Next step See also Link to section Overview
 The Web Payments SDK is a JavaScript browser-client SDK that provides a secure payment-card entry method, along with other secure payment methods.
 The following video introduces the Web Payments SDK and demonstrates how to get started. For an optimal viewing experience, expand the video window to a desired size or watch the video on YouTube. For a detailed overview, see the following sections.
 The Web Payments SDK enables the client implementation of the client/server Square online payment solution. The SDK produces a secure single-use payment token that your application web client sends to your backend, where it&#x27;s processed as a payment with the Payments API. For more information, see Take Payments .
 The backend is the server part of the client/server Square payment solution, which processes the payment using a payment token. Square provides the Payments API as a backend solution for application developers to process payments.
 Note
 Starting October 1st, 2025, Square requires all Web Payments SDK implementations to use Secure Contexts and proper Content Security Policy .
 Link to section Requirements and limitations
 The Web Payments SDK requires the use of Secure Contexts and CSP headers.
 The Web Payments SDK cannot be used with Internet Explorer 11.
 The Web Payments SDK doesn&#x27;t create payments or customers on its own. The SDK must be used alongside the Payments API and the Customers API .
 Chrome extensions don&#x27;t work with the Web Payments SDK.
 In the EU, payments that don&#x27;t provide authentication get a CARD_DECLINED_VERIFICATION_REQUIRED
 error for transactions that require authentication. This error means that the seller didn&#x27;t implement verifyBuyer
 on the customer-initiated payments. For more information, see VerifyBuyerError .
 Link to section SDK and payment acceptance implementation
 The overall implementation flow with the Web Payments SDK and a payment acceptance backend service works as follows:
 Configure the Web Payments SDK client library with your application to render a payment method form and generate a payment token.
 Configure the Payments API, or another backend service, to take the payment token and process the payment.
 To view an example of an application web client, see Web Payments SDK Quickstart . To view additional examples of supported payment methods built with the Web Payments SDK, see Web Payments SDK showcase .
 Link to section Web Payments SDK features
 The Web Payments SDK was created to make integration with your web application simpler and provide better performance. The SDK provides the following advantages:
 Granular configuration - You only need to write configuration code for the payment methods that your application accepts. Each payment method has its own objects with configuration options appropriate for the method.

 Promise-based pattern - The async/await pattern is used in place of the callback pattern of earlier payment libraries. This pattern lets your application react to events in a more reasonable way with less code.

 Automatic localization - The SDK determines the locale of the buyer&#x27;s browser automatically. However, your application can override localization by setting a configuration option. To set the locale with your application, use the setLocale() method and pass the locale for when the application creates a new Payment object instance. The Web Payments SDK supports the following languages:
 English (Australia)
 English (Canada)
 English (Ireland)
 English (United Kingdom)
 English (United States)
 French (Canada)
 French (France)
 Japanese
 Spanish
 
 Link to section Payment tokens
 The Web Payments SDK produces payment tokens from these supported payment methods: credit card, gift card, digital wallets, ACH bank transfer, Afterpay, and Cash App Pay.
 The payment tokens produced by these payment methods share a common format and are all accepted by the Payments API as source_id
 values. The server-side Payments API code that you write for one of these tokens works seamlessly for all the other methods. You can write unique client logic for each payment method, but you only need one payment process flow on the server.
 You can also get a payment token to use with the Cards API if you need to store a card on file with a customer. This is useful when your application must support recurring card-not-present payments.
 Link to section Create a customer profile
 The Web Payments SDK doesn&#x27;t create a new customer in the Square account where a payment is credited. If you want to create a new customer along with a payment on a Square account, you need to collect at least one of the following pieces of information about a buyer:
 First name
 Family name
 Company name
 Buyer email address
 Buyer phone number
 The backend of your application can take this information and create a customer profile using the Customers API. When your backend creates a Payment
 object using the CreatePayment endpoint, it includes the Web Payments SDK-provided payment token and the new customer ID.
 Link to section Accepting cards with postal codes
 The Web Payments SDK shows a postal code input field on the payment form after the SDK determines the country that issued the buyer&#x27;s credit card. The Web Payments SDK displays the proper form label for the postal code based on the country:
 For US, the form displays "ZIP".
 For CA, the form displays "Postal Code".
 For UK, the form displays "Postcode".
 If the payment form displays the postal code field, the payment requires a postal code for the buyer to proceed. The SDK enforces input field validation for the postal code depending on the country.
 Important
 The postal code field isn&#x27;t supported for Japan and China. The field doesn&#x27;t display on the payment form if a card is issued by a Japanese or a Chinese bank. If you&#x27;re building your application in the Square Sandbox for sellers in these regions, you might still see the payment form render the postal code field if a Sandbox test card is used for testing purposes.
 Link to section Payment session timeout
 The payment session times out after 24 hours. If the buyer hasn&#x27;t completed the payment form, the buyer must refresh the browser to complete the payment. Fields that generate based on the issuing country of the credit card might not save input that the buyer entered.
 Link to section Application integrations
 Square provides examples of application integrations where you can initialize the Web Payments SDK with a backend to process payments. The following examples are provided on GitHub.
 Web Payments SDK integration with PHP 
 Set up the Web Payments SDK with Node.js 
 Link to section Next step
 If you want to go directly to the quickstart source, go to the GitHub repository for the Web Payments SDK quickstart application and review the README file to get started.

 If you want to set up the credit card payment method step by step, see Web Payments SDK Quickstart .

 Note
 If you&#x27;ve already implemented the Payments API in your application, you can replace the localhost
 domain and URL used in the Web Payments SDK example code and samples with your own server endpoint URL.
 Link to section See also
 Take an Apple Pay Payment 
 Take a Google Pay Payment 
 Take ACH Bank Transfer Payments 
 Take a Gift Card Payment 
 Customize the Card Entry Form 
 Verify the Buyer When Using a Payment Token 
 Take Afterpay and Clearpay Payments 
 Take a Payment with Cash App Pay 
 On this page Overview Requirements and limitations SDK and payment acceptance implementation Web Payments SDK features Payment tokens Create a customer profile Accepting cards with postal codes Payment session timeout Application integrations Next step See also
