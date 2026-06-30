# web-payments-quickstart

Source: https://developer.squareup.com/docs/web-payments/quickstart/add-sdk-to-web-client
Downloaded: 2026-06-30T20:41:11.675Z

---

Add the Web Payments SDK to the Web Client 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Payments Take Payments Card Payments Delayed Capture Partial Payments Statement Descriptions Card Surcharges ACH Bank Transfer Payment Afterpay and Clearpay Payments Cash App Payments Cash Payments External Payments House Accounts Collect Application Fees Update Payment and Tip Amounts Retrieve Payments Troubleshoot Webhooks Refunds Refund Payments Refund a Payment with an App Fee Retrieve Refunds Process an Unlinked Refund Webhooks Disputes Process Disputes Test in the Sandbox Take Payments on Hardware Terminal API Quickstart Take Payments for Orders Take One-Off Payments Manage Terminals POS App Pairing Monitor Square Terminals Check Device Information Customize Terminal Checkouts Add Payment and Checkout Features Save Card on File Print or Issue Receipts Customize the Idle Screen Custom Screen Workflows Confirmation Screen Signature Capture Screen Data Collection Screen Menu Selection List Screen QR Code Screen Link and Dismiss Actions Manage Terminal Actions Mobile Payments SDK Build on Android Authorize the Mobile Payments SDK Pair and Manage Card Readers Take a Payment Tap to Pay on Android Offline Payments Handling Errors Build on iOS Authorize the Mobile Payments SDK Pair and Manage Card Readers Take a Payment Tap to Pay on iPhone Offline Payments Configure for Square Stand or Square Kiosk Handling Errors Migrate from Reader SDK React Native Plugin Flutter Plugin Point of Sale API How It Works Build on Android Build on iOS Build on Mobile Web Find Your Android Fingerprint Use the API in Offline Mode Add an Alert Dialog Helper Class Accept E-Money Payments Accept QR Payments Mobile Web Technical Reference Payments API Integration Take Payments Online Web Payments SDK Quickstart Set Up the Web Client App Add the SDK to the Web Client Deploy the Application Take a Card Payment Integrate Digital Wallets Apple Pay Google Pay Digital Wallet Payment Requests ACH Bank Transfer Store and Charge Bank Accounts on File Afterpay Cash App Pay Square Gift Card Payments Take a Gift Card Payment Take Partial Payments Customize the Card Entry Form Charge and Store Cards Add a Content Security Policy Exception Handling In-App Payments SDK Quickstart Set up the Client Deploy the Server Install the SDK Build on Android Build on iOS Integrate Digital Wallets Google Pay Apple Pay Localize an Application Gift Card Payments Flutter Plugin React Native Plugin Customize the Payment Entry Form Connect to a Backend Service Remove the Postal Code Requirement Troubleshoot How It Works Strong Customer Authentication Verify a Buyer Checkout API Quick Pay Checkout Square Order Checkout Subscription Plan Checkout Checkout Settings Checkout Configurations Manage Checkout Guidelines and Limitations Common Pitfalls and Solutions Subscriptions API Subscription Plans and Variations Manage Subscriptions Subscription Actions and Events Pause, Resume, or Cancel Subscriptions Subscription Billing and Invoices Swap Subscription Plan Variations Invoices API Create and Publish Invoices Retrieve, List, or Search Invoices Create or Delete Invoice Attachments Update Invoices Cancel or Delete Invoices Pay or Refund Invoices Walkthrough: Create and Publish Invoices Cards Manage Cards Create a Card on File from Payment ID Create a Card on File and Make a Payment Create a Shared Card on File and Make a Payment Manage Card Declines Payouts List Payouts Get Payout List Payout Entries Bank Accounts API Bank Account API Operations Payment Methods by Country Payments Pricing Strong Customer Authentication Payment Minimums /
 Payments /
 Take Payments Online /
 Web Payments SDK /
 Quickstart Add the Web Payments SDK to the Web Client
 Applies to: Web Payments SDK | Payments API 
 Learn how to initialize the Web Payments SDK with the web client and a Square application to accept a card payment, generate a payment token with buyer verification, and send the resulting payment token to the server for payment verification. 
 On this page Overview 1. Get application credentials 2. Configure the quickstart access token 3. Add pay elements to the page 4. Attach the Card payment method to the pay elements 5. Set up the card payment tokenization method 6. Pass the result of the card payment tokenization method to CreatePayment 7. Test the application Complete quickstart example code Verify the Payment Next step Link to section Overview
 At the highest level, to add the Web Payments SDK to the web client, you need to:
 Get your application credentials, set up your localhost development environment, and initialize the SDK.
 Collect buyer input.
 Tokenize the buyer input in a call to card.tokenize()
 .
 Pass the token for future use in a server-side call to the CreatePayment endpoint.
 The following code demonstrates the basic order of operations:
 // Customer input, hard-coded for example only 
 const verificationDetails = { 
 amount : &#x27;1.00&#x27; , 
 billingContact : { 
 givenName : &#x27;John&#x27; , 
 familyName : &#x27;Doe&#x27; , 
 email : &#x27; [email&#160;protected] &#x27; , 
 phone : &#x27;3214563987&#x27; , 
 addressLines : [ &#x27;123 Main Street&#x27; , &#x27;Apartment 1&#x27; ] , 
 city : &#x27;London&#x27; , 
 state : &#x27;LND&#x27; , 
 countryCode : &#x27;GB&#x27; , 
 } , 
 currencyCode : &#x27;GBP&#x27; , 
 intent : &#x27;CHARGE&#x27; , 
 customerInitiated : true , 
 sellerKeyedIn : false , 
 } ; 
 
 // Tokenize the input 
 const token = await card . tokenize ( verificationDetails ) ; 
 
 // Pass the token to create a Payment 
 const payment = CreatePayment ( token ) ; 
 The following sections explain these steps in more detail and include sample code that you can add to the quickstart repository to test a concept.
 Link to section 1. Get application credentials
 The quickstart application is configured to send requests to the Square Sandbox instead of your production Square account. To find your Sandbox credentials:
 Open the Developer Console and choose the plus symbol under Applications to create a new application.
 Open the application, and then choose Credentials in the left pane.
 At the top of the page, set the Developer Console mode to Sandbox to get to the Sandbox Application ID and Sandbox Access Token values.
 In the left pane, choose Locations to find the Sandbox Location ID .
 Paste all of these Sandbox credentials ( Application ID , Location ID , and Sandbox Access Token ) into a temporary text file.
 Important
 Your Sandbox credentials are secure secrets. Don&#x27;t share these values with anyone or upload them to the cloud.
 
 Link to section ⚠️ Critical Production Requirement
 You must use your seller&#x27;s location ID and access token when deploying to production. Your testing credentials will not work for processing real payments.
 To properly configure your production environment:
 Replace your test access token with your seller&#x27;s production token.
 Obtain this token through the OAuth flow by calling the ObtainToken endpoint.
 
 Replace your test location ID with your seller&#x27;s actual location ID.
 After obtaining the production token, retrieve a list of the seller&#x27;s locations to get the seller&#x27;s valid location IDs.
 Select the appropriate location ID for this deployment.
 
 ❌ Common Issue : Application payments often fail in production because developers forget to replace their test location ID with the seller&#x27;s actual location ID.
 If payments are being rejected in production, verify that you&#x27;re using the correct seller credentials, especially the location ID.
 Link to section 2. Configure the quickstart access token
 The quickstart server code calls the CreatePayment endpoint and needs to be updated to use your Sandbox access token.
 In the project root folder, create a copy of the .env.example
 file and name it .env.sandbox
.
 The dotenv library is used to manage secrets that shouldn&#x27;t be made public. The .env.sandbox
 file should never be committed.

 In .env.sandbox, define SQUARE_ACCESS_TOKEN
 with your Sandbox access token from the Developer Console.
 SQUARE_ACCESS_TOKEN = { SANDBOX_ACCESS_TOKEN } 
 
 Restart your server for the Sandbox test environment ( npm run dev
) to use this new value.

 Link to section 3. Add pay elements to the page
 Replace the contents of the <body>
 in public/index.html
 with the following HTML elements:
 < form id = " payment-form " > 
 < div id = " card-container " > </ div > 
 < button id = " card-button " type = " button " > Pay $1.00 </ button > 
 </ form > 
 < div id = " payment-status-container " > </ div > 
 This HTML adds an element ( div id="card-container"
) that the Web Payments SDK attaches the card element to and adds a button that starts the tokenization process.
 Did you know?
 The SDK also enables the Apple Pay , Google Pay , ACH (bank transfer) , Square gift card , and Cash App Pay payment methods.
 
 Link to section 4. Attach the Card payment method to the pay elements
 The quickstart code already includes the following <script>
 tag to initialize the SDK. Add this tag to your own application if you&#x27;re working outside the quickstart.
 < script 
 type = " text/javascript " 
 src = " https://sandbox.web.squarecdn.com/v1/square.js " 
 > </ script > 
 Add an empty <script>
 tag to the <head>
 of index.html.
 < script > 
 </ script > 
 
 Add the following global constants inside the <script>
 tag, substituting the IDs from the Developer Console for the placeholder ( {YOUR_SANDBOX_APPLICATION_ID}
 and {YOUR_SANDBOX_LOCATION_ID}
) values:
 const appId = &#x27;{YOUR_SANDBOX_APPLICATION_ID}&#x27; ; 
 const locationId = &#x27;{YOUR_SANDBOX_LOCATION_ID}&#x27; ; 
 
 Add the following code inside the <script>
 tag, beneath your credentials:
 async function initializeCard ( payments ) { 
 const card = await payments . card ( ) ; 
 await card . attach ( &#x27;#card-container&#x27; ) ; 
 return card ; 
 } 
 
 document . addEventListener ( &#x27;DOMContentLoaded&#x27; , async function ( ) { 
 if ( ! window . Square ) { 
 throw new Error ( &#x27;Square.js failed to load properly&#x27; ) ; 
 } 
 
 let payments ; 
 try { 
 payments = window . Square . payments ( appId , locationId ) ; 
 } catch { 
 const statusContainer = document . getElementById ( 
 &#x27;payment-status-container&#x27; , 
 ) ; 
 statusContainer . className = &#x27;missing-credentials&#x27; ; 
 statusContainer . style . visibility = &#x27;visible&#x27; ; 
 return ; 
 } 
 
 let card ; 
 try { 
 card = await initializeCard ( payments ) ; 
 } catch ( e ) { 
 console . error ( &#x27;Initializing Card failed&#x27; , e ) ; 
 return ; 
 } 
 } ) ; 
 
 The code does the following:
 Defines a helper initializeCard
 function.
 In the event listener, initializes the Square payments object by calling Square.payments(appId, locationId) .
 In the event listener, calls the initializeCard
 helper.
 The initializeCard
 helper calls the Payments .card()
 method to initialize the Card
 and calls the Card .attach()
 method to attach the payment method to the DOM.
 Test the application 
 Navigate to http://localhost:3000/
 in your browser.

 Success
 You should see the payment card input rendered on your page.
 Link to section 5. Set up the card payment tokenization method
 Collect input from the customer to pass to Card.tokenize() . You need to pass the following properties in a verificationDetails
 object:
 amount
 - The amount of the card payment to be charged.
 billingContact
 - The buyer&#x27;s contact information for billing.
 intent
 - The transactional intent of the payment.
 sellerKeyedIn
 - Indicates that the seller keyed in payment details on behalf of the customer. This is used to flag a payment as Mail Order / Telephone Order (MOTO).
 customerInitiated
 - Indicates whether the customer initiated the payment.
 currencyCode
 - The three-letter ISO 4217 currency code.
 Important
 Provide as much buyer information as possible for billingContact
 so that you get more accurate decline rate performance from 3DS authentication.
 To follow along and continue adding code in the quickstart repository , declare a verificationDetails
 object as a constant after the appId
 and locationId
.
 const verificationDetails = { 
 amount : &#x27;1.00&#x27; , 
 billingContact : { 
 givenName : &#x27;John&#x27; , 
 familyName : &#x27;Doe&#x27; , 
 email : &#x27; [email&#160;protected] &#x27; , 
 phone : &#x27;3214563987&#x27; , 
 addressLines : [ &#x27;123 Main Street&#x27; , &#x27;Apartment 1&#x27; ] , 
 city : &#x27;Oakland&#x27; , 
 state : &#x27;CA&#x27; , 
 countryCode : &#x27;US&#x27; , 
 } , 
 currencyCode : &#x27;USD&#x27; , 
 intent : &#x27;CHARGE&#x27; , 
 customerInitiated : true , 
 sellerKeyedIn : false , 
 } ; 
 Warning
 Don&#x27;t hardcode any buyer information in production. These example instructions are for testing only.
 
 Declare a token
 object to handle the result of the card.tokenize(verificationDetails)
 function call. Include the await
 parameter.
 const tokenResult = await card . tokenize ( verificationDetails ) ; 
 To add the code to the quickstart, wrap the call to card.tokenize(verificationDetails)
 in a helper function as shown in the following example. Add the helper to the <script>
 tag.
 async function tokenize ( card ) { 
 const tokenResult = await card . tokenize ( verificationDetails ) ; 
 if ( tokenResult . status === &#x27;OK&#x27; ) { 
 return tokenResult . token ; 
 } else { 
 let errorMessage = ` Tokenization failed-status: ${ tokenResult . status } ` ; 
 if ( tokenResult . errors ) { 
 errorMessage += ` and errors: ${ JSON . stringify ( 
 tokenResult . errors
 ) } ` ; 
 } 
 throw new Error ( errorMessage ) ; 
 } 
 } 
 
 Link to section 6. Pass the result of the card payment tokenization method to CreatePayment
 Define the CreatePayment
 helper function.
 The CreatePayment
 helper function passes the token and the seller&#x27;s location ID to the server to make the CreatePayment call.
 Warning
 The location ID must match in these places:
 Your Web Payments SDK initialization
 Your backend payment processing request
 This example demonstrates the correct approach by passing the same locationId
 from the client to the server endpoint.
 The following is an example CreatePayment
 helper function. Add it to the quickstart in the <script>
 under initializeCard
.
 async function CreatePayment ( token ) { 
 const body = JSON . stringify ( { 
 locationId , 
 sourceId : token , 
 idempotencyKey : window . crypto . randomUUID ( ) , 
 } ) ; 
 
 const paymentResponse = await fetch ( &#x27;/payment&#x27; , { 
 method : &#x27;POST&#x27; , 
 headers : { 
 &#x27;Content-Type&#x27; : &#x27;application/json&#x27; , 
 } , 
 body , 
 } ) ; 
 
 if ( paymentResponse . ok ) { 
 return paymentResponse . json ( ) ; 
 } 
 
 const errorBody = await paymentResponse . text ( ) ; 
 throw new Error ( errorBody ) ; 
 } 
 
 Declare a Payment
 object to store the result of the call to CreatePayment
.
 const paymentResults = await CreatePayment ( token ) ; 
 Define the Payment
 within a handlePaymentMethodSubmission
 helper function. When the cardButton
 element is clicked, handlePaymentMethodSubmission
 calls the tokenize card and creates payment methods sequentially.
 To keep working in the quickstart, nest handlePaymentMethodSubmission
 within the DomContentLoaded
 event listener that you added in step 4.
 document . addEventListener ( &#x27;DOMContentLoaded&#x27; , async function ( ) { 
 // ... 
 // ...Previous Payments and Card initialization code... 
 // ... 
 async function handlePaymentMethodSubmission ( event , card ) { 
 event . preventDefault ( ) ; 
 
 try { 
 cardButton . disabled = true ; 
 const token = await tokenize ( card ) ; 
 const paymentResults = await CreatePayment ( token ) ; 
 displayPaymentResults ( &#x27;SUCCESS&#x27; ) ; 
 
 console . debug ( &#x27;Payment Success&#x27; , paymentResults ) ; 
 } catch ( e ) { 
 cardButton . disabled = false ; 
 displayPaymentResults ( &#x27;FAILURE&#x27; ) ; 
 console . error ( e . message ) ; 
 } 
 } 
 
 const cardButton = document . getElementById ( 
 &#x27;card-button&#x27; 
 ) ; 
 cardButton . addEventListener ( &#x27;click&#x27; , async function ( event ) { 
 await handlePaymentMethodSubmission ( event , card ) ; 
 } ) ; 
 } ) 
 handlePaymentMethodSubmission
 also calls a helper displayPaymentResults
 function that displays whether the transaction was a success. Add displayPaymentResults
 to the <script>
 tag under the tokenize
 function definition.
 function displayPaymentResults ( status ) { 
 const statusContainer = document . getElementById ( 
 &#x27;payment-status-container&#x27; 
 ) ; 
 if ( status === &#x27;SUCCESS&#x27; ) { 
 statusContainer . classList . remove ( &#x27;is-failure&#x27; ) ; 
 statusContainer . classList . add ( &#x27;is-success&#x27; ) ; 
 } else { 
 statusContainer . classList . remove ( &#x27;is-success&#x27; ) ; 
 statusContainer . classList . add ( &#x27;is-failure&#x27; ) ; 
 } 
 
 statusContainer . style . visibility = &#x27;visible&#x27; ; 
 } 
 
 Link to section 7. Test the application
 Navigate to http://localhost:3000/
 in your browser.

 Complete the card payment form and submit a test payment with a card-not-present test credit card from Sandbox Payments .

 Use an SCA test card with a challenge type of "Modal with Verification Code".
 The following modal launches:

 Enter the verification code in the pop-up window and choose Authenticate . After authentication, the application sends the payment request to complete the card payment.

 Add a console.log()
 to check the token in your browser or check your terminal for the returned TokenResult object to confirm that the payment token is generated.

 Refresh your browser and use a test card from the Card-not-present success state values table or an SCA test card with no challenge .

 Check the console log again in your browser or the returned TokenResult object to confirm that the payment token is generated.

 Link to section Complete quickstart example code
 If you have any issues with testing, copy and paste the following into the quickstart index.html
:
 <! doctype html > 
 < html lange = " en " > 
 < head > 
 < meta charset = " utf-8 " /> 
 < title > Square Web Payments Quickstart </ title > 
 < link href = " app.css " rel = " stylesheet " /> 
 < script 
 type = " text/javascript " 
 src = " https://sandbox.web.squarecdn.com/v1/square.js " 
 > </ script > 
 < script > 
 const appId = &#x27;{APP_ID}&#x27;;
 const locationId = &#x27;{LOCATION_ID}&#x27;;
 
 const verificationDetails = { 
 amount: &#x27;1.00&#x27;,
 billingContact: {
 givenName: &#x27;John&#x27;,
 familyName: &#x27;Doe&#x27;,
 email: &#x27; [email&#160;protected] &#x27;,
 phone: &#x27;3214563987&#x27;,
 addressLines: [&#x27;123 Main Street&#x27;, &#x27;Apartment 1&#x27;],
 city: &#x27;Oakland&#x27;,
 state: &#x27;CA&#x27;,
 countryCode: &#x27;US&#x27;,
 },
 currencyCode: &#x27;USD&#x27;,
 intent: &#x27;CHARGE&#x27;,
 customerInitiated: true,
 sellerKeyedIn: false,
 };
 
 async function initializeCard(payments) {
 const card = await payments.card();
 await card.attach(&#x27;#card-container&#x27;); 
 
 return card; 
 }
 
 async function CreatePayment(token) {
 const body = JSON.stringify({
 locationId,
 sourceId: token,
 idempotencyKey: window.crypto.randomUUID(),
 });
 
 const paymentResponse = await fetch(&#x27;/payment&#x27;, {
 method: &#x27;POST&#x27;,
 headers: {
 &#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
 },
 body,
 });
 
 if (paymentResponse.ok) {
 return paymentResponse.json();
 }
 
 const errorBody = await paymentResponse.text();
 throw new Error(errorBody);
 }
 
 async function tokenize(card) {
 const tokenResult = await card.tokenize(verificationDetails);
 if (tokenResult.status === &#x27;OK&#x27;) {
 return tokenResult.token;
 } else {
 let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
 if (tokenResult.errors) {
 errorMessage += ` and errors: ${JSON.stringify(
 tokenResult.errors
 )}`;
 }
 throw new Error(errorMessage);
 }
 }
 
 // status is either SUCCESS or FAILURE;
 function displayPaymentResults(status) {
 const statusContainer = document.getElementById(
 &#x27;payment-status-container&#x27;
 );
 if (status === &#x27;SUCCESS&#x27;) {
 statusContainer.classList.remove(&#x27;is-failure&#x27;);
 statusContainer.classList.add(&#x27;is-success&#x27;);
 } else {
 statusContainer.classList.remove(&#x27;is-success&#x27;);
 statusContainer.classList.add(&#x27;is-failure&#x27;);
 }
 
 statusContainer.style.visibility = &#x27;visible&#x27;;
 } 
 
 document.addEventListener(&#x27;DOMContentLoaded&#x27;, async function () {
 if (!window.Square) {
 throw new Error(&#x27;Square.js failed to load properly&#x27;);
 }
 
 let payments;
 try {
 payments = window.Square.payments(appId, locationId);
 } catch {
 const statusContainer = document.getElementById(
 &#x27;payment-status-container&#x27;,
 );
 statusContainer.className = &#x27;missing-credentials&#x27;;
 statusContainer.style.visibility = &#x27;visible&#x27;;
 return;
 }
 
 let card;
 try {
 card = await initializeCard(payments);
 } catch (e) {
 console.error(&#x27;Initializing Card failed&#x27;, e);
 return;
 }
 
 async function handlePaymentMethodSubmission(event, card) {
 event.preventDefault();
 
 try {
 // disable the submit button as we await tokenization 
 cardButton.disabled = true;
 const token = await tokenize(card);
 const paymentResults = await CreatePayment(token);
 displayPaymentResults(&#x27;SUCCESS&#x27;);
 
 console.debug(&#x27;Payment Success&#x27;, paymentResults);
 } catch (e) {
 cardButton.disabled = false;
 displayPaymentResults(&#x27;FAILURE&#x27;);
 console.error(e.message);
 }
 }
 
 const cardButton = document.getElementById(&#x27;card-button&#x27;);
 cardButton.addEventListener(&#x27;click&#x27;, async function (event) {
 await handlePaymentMethodSubmission(event, card);
 });
 });
 </ script > 
 </ head > 
 
 < body > 
 < form id = " payment-form " > 
 < div id = " card-container " > </ div > 
 < button id = " card-button " type = " button " > Pay $1.00 </ button > 
 </ form > 
 < div id = " payment-status-container " > </ div > 
 </ body > 
 </ html > 
 Link to section Verify the Payment
 The payment is credited to the Sandbox test account whose access token is used in the application that you just built. To see the payment in the Sandbox Square Dashboard, go to the Developer Console .
 In the left pane, choose Sandbox test accounts .
 Choose Default Test Account .
 Choose Open in Square Dashboard .
 In the left pane, choose Transactions .
 Link to section Next step
 Deploy the Application 
 On this page Overview 1. Get application credentials 2. Configure the quickstart access token 3. Add pay elements to the page 4. Attach the Card payment method to the pay elements 5. Set up the card payment tokenization method 6. Pass the result of the card payment tokenization method to CreatePayment 7. Test the application Complete quickstart example code Verify the Payment Next step
