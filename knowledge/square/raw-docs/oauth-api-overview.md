# oauth-api-overview

Source: https://developer.squareup.com/docs/oauth-api/overview
Downloaded: 2026-06-30T20:41:14.828Z

---

OAuth API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Get Started Create an Account and App Make your First API Call View the API Logs Verify the Payment What&#x27;s Next Overview Build Basics Versioning Access Tokens Frontend and Backend Development General Development Concepts TLS and HTTPS Using the REST API Handling Errors Collecting Information Language Preferences Common Data Types Working with Dates Working with Monetary Amounts Working with Addresses Common Square API Patterns Custom Attributes Idempotency Pagination Optimistic Concurrency Clear Object Fields Square eCommerce APIs Square API Lifecycle Brand Guidelines Developer Tools Developer Console Square Dashboard Sandbox Test in Sandbox Sandbox Payments API Explorer API Logs Webhook Event Logs Webhooks Create a Notification URL Subscribe to Event Notifications Verify and Validate an Event Notification Manage Operations Move Event Notifications to Production Webhook Events Reference Troubleshooting Build a Developer Team Authentication Postman MCP Server Square SDKs Java Quickstart Common API Patterns Migration Guide .NET Quickstart Common API Patterns Migration Guide Node.js Quickstart Common API Patterns Migration Guide PHP Quickstart Common API Patterns Migration Guide Python Quickstart Common API Patterns Migration Guide Ruby Quickstart Common API Patterns Migration Guide Go Quickstart Sample Applications GraphQL GraphQL Basics Build your First Query GraphQL Explorer Query Examples Reporting API Getting Started Views Understanding Dynamic Schemas Metadata Discovery Query Construction Measures Dimensions Time Dimensions Segments Filters Ordering & Pagination Real-World Scenarios Working with Cubes Core Cubes Measure & Dimension Types Multi-Cube Joins Time Handling Schema Discovery Error Handling Best Practices OAuth Create Redirect URL and Authorization Page URL Receive Authorization and Manage OAuth Tokens Refresh and Revoke OAuth Tokens Token Introspection OAuth Best Practices Test Authorization Migrate to the Square API OAuth Flow Move OAuth to Production Permissions Reference Webhook Subscriptions Events Migrate from Deprecated APIs Deprecated Items API Migration Guides v1 Payments API v1 Refunds API Square Transactions API Migrate Employees to Team Members Migrate from CreateCheckout to CreatePaymentLink International Development Develop for Japan Compliance with Japan&#x27;s Tax Invoice System /
 Dev Essentials OAuth API
 Applies to: OAuth API 
 Use the OAuth API to connect your application to a seller&#x27;s account using OAuth. 
 On this page Overview Requirements and limitations OAuth flows Code flow PKCE flow Determine which OAuth flow applies to your application Webhooks OAuth in the production and Sandbox environments Common errors See also Link to section Overview
 The Square OAuth API uses the OAuth 2 protocol to obtain permission from Square sellers to access specific types of resources in their account. During this process, client applications request specific permissions and receive an authorization code, which is then exchanged for an access token and refresh token. These tokens allow you to manage resources for a seller and call Square APIs on their behalf. Typically, the OAuth flow is initiated when onboarding a Square seller to your application.
 The OAuth flow includes the following high-level stages:
 Stage 1: Authorization Stage 2: Callback Stage 3: Token request 
 Your application uses an authorization URL to send the seller to the Square authorization page where they can sign in to Square and grant the permissions you requested. Square uses your redirect URL to send the seller back to your application and appends a code
 query parameter that contains an authorization code. Your application calls ObtainToken
 and sends the authorization code, your application ID, and other fields. Square returns an access token and refresh token. 
 Link to section Requirements and limitations
 The OAuth API requires HTTPS for the redirect URL for the authorization callback. For testing purposes using the Square Sandbox, you can use HTTP with localhost.

 Authorization codes returned by the Square authorization page expire after 5 minutes. An authorization code can only be used once.

 Square OAuth access tokens expire after 30 days. To maintain access, you must generate a new OAuth access token using the refresh token received with the original authorization. For more information about managing OAuth access tokens and refresh tokens, see OAuth API Best Practices .

 Refresh tokens obtained using the code flow don&#x27;t expire. Refresh tokens obtained using the PKCE flow are single-use tokens and expire after 90 days. If you lose a refresh token, you must repeat the full OAuth authorization flow to obtain a new OAuth access token and refresh token. A refresh token only becomes invalid when the application&#x27;s access has been completely revoked.

 A refresh token obtained using the code flow can be used to get multiple active access tokens. You can call ObtainToken multiple times with a refresh token. Each access token expires 30 days after it is obtained and each can be individually revoked. Developers sometimes choose to have multiple access tokens for a seller when the seller has a multi-store eCommerce site and wants a separate access token for each store.

 Link to section OAuth flows
 Square offers two types of OAuth: a code flow and a PKCE (Proof Key for Code Exchange) flow:
 The code flow is an OAuth flow that requires a confidential client to pass in the client_id
 and client_secret
 values when redeeming an authorization code from Square. Passing these types of sensitive data requires you to use a confidential client.

 The PKCE flow is an OAuth flow for public clients that removes the need to pass the client_secret
 and replaces it with a code_verifier
. The code_verifier
 is a unique string that the client application creates for every authorization request. The PKCE flow must be used by any client that cannot safely store secrets in the application, such as mobile applications, single-page applications, and native desktop applications.

 Important
 A confidential client is one where the application runs on a server and the seller interacts with the application by using a browser or an API. A public client, on the other hand, is a mobile or desktop application where the seller has the actual application on their device. Public clients shouldn&#x27;t store secrets because the secret is stored inside the application and a debugger or disassembler can be used to find the secret.
 The OAuth API uses the following OAuth terms when using the code flow or PKCE flow:
 Authorization code - A code that is returned when calling the Authorize
 endpoint. This code is used to redeem an access token and a refresh token.
 Access token - A token that grants access to a client&#x27;s resources and has some privileges attached to it. Access tokens expire after a certain amount of time.
 Refresh token - A token that is used to generate more access tokens. If you use the code flow, refresh tokens are valid until their access is revoked. If you use the PKCE flow, refresh tokens are single-use tokens and expire after 90 days.
 Square doesn&#x27;t support OpenID or other single sign-on (SSO) protocols on top of the OAuth implementation.
 Link to section Code flow
 The OAuth code flow is designed for confidential client applications that run on a server and can store client information securely. The code flow uses the following OAuth terms:
 client_id
 - The ID that is associated with an application using the OAuth process. This is a public variable and is called the Application ID in the Developer Console on the OAuth page.
 client_secret
 - The secret that is associated with an application. It is used to redeem refresh tokens and should never be shared by a public client. Leaking this information is equivalent to leaking a password. This variable is called the Application secret in the Developer Console on the OAuth page.
 The code flow process is as follows:
 Your client application builds an authorization URL that you provide to the seller who approves the permissions you requested. The authorization URL contacts the Authorize
 endpoint.
 The Authorize
 endpoint returns an authorization code by making a GET
 request to the redirect URL you registered for your application in the Developer Console.
 The client calls the ObtainToken
 endpoint and provides the client ID, client secret, and the authorization code.
 The ObtainToken
 endpoint returns an access token and a refresh token.
 
 Link to section PKCE flow
 The OAuth PKCE flow is designed for public clients that shouldn&#x27;t store secret information in their application. The PKCE process removes the need to pass the client_secret
 and doesn&#x27;t require a secure backend server. The PKCE flow adds two new terms:
 code_verifier
 - A unique random string generated by the client.
 code_challenge
 - A Base64-URL-encoded string of the SHA256 hash of the code verifier
.
 The PKCE flow process is as follows:
 The client application builds an authorization URL that&#x27;s the authorization request. The client application creates the code_verifier
 and uses the Base64-URL-encoding of its SHA256 hash to create the  code_challenge
. The authorization request calls the Authorize
 endpoint and includes the code_challenge
. You provide this URL to the seller who approves the permissions you request.
 The Authorize
 endpoint returns an authorization code by making a GET
 request to the redirect URL you registered for your application in the Developer Console. The server retains the code_challenge
.
 The client calls the ObtainToken
 endpoint and provides the client ID, code_verifier
, and authorization code. The server verifies that the code_verifier
 is the same value as the value that was encrypted to create the code_challenge
.
 The ObtainToken
 endpoint returns an access token and a single-use refresh token that expires in 90 days.
 
 Link to section Determine which OAuth flow applies to your application
 If your application has a confidential client, one that is able to securely authenticate with an authorization server and is able to store the client_secret
 securely, you should use the OAuth code flow for your application. Using the OAuth code flow lets you receive multiple-use refresh tokens that don&#x27;t expire.
 If you have a public client that is unable to use registered client secrets or an application running in a browser or on a mobile device, you must use the OAuth PKCE flow. You should also choose the OAuth PKCE flow if you have a native desktop application, a single-page web application, or a mobile application. Refresh tokens expire after 90 days using the OAuth PKCE flow and you don&#x27;t have to store the client_secret
.
 You can determine which OAuth flow to use by answering the following questions:
 Are you building a server application where you control the hosting? If yes, use the OAuth code flow.
 Are you building a single-purpose application where the application needs an access token? If yes, use the PKCE flow and use a short-lived token .
 Are you building a mobile application for installation on mobile devices around the world? If yes, use the PKCE flow and use a short-lived token.
 Important
 You cannot mix and match OAuth flows; you must choose either the code flow or the PKCE flow end to end.
 To learn how to set up a basic website that uses the OAuth code flow, see OAuth Walkthrough: Test Authorization with a Web Server . For more information about writing authentication code, see OAuth Best Practices .
 Link to section Webhooks
 A webhook is a subscription that notifies you when a Square event occurs. For more information about using webhooks, see Square Webhooks .
 The OAuth API supports the following webhook event:
 Event Permission Description 
 oauth.authorization.revoked N/A Notifies an application whenever a seller revokes all access tokens and refresh tokens granted to the application. 
 If you use the OAuth API to get authorization to manage a seller&#x27;s resources, you should create a webhook that notifies you of the oauth.authorization.revoked
 event. It indicates that a seller has removed your application&#x27;s access to their resources. For a complete list of Square webhook events, see Webhook Events Reference .
 Link to section OAuth in the production and Sandbox environments
 Production is the live environment where Square sellers process real transactions and conduct business operations. The Square Sandbox is an isolated testing environment that developers can use to test integrations without affecting real users or data.
 The base URL and application credentials must correspond to the target environment:
   Production Sandbox 
 Domain squareup.com
 squareupsandbox.com
 
 OAuth API base URL https://connect.squareup.com/oauth2
 https://connect.squareupsandbox.com/oauth2
 
 Example authorization URL https://connect.squareup.com/oauth2/authorize?client_id=sq0idp-LJ1Sr4Iim0hGGvsMrx83&scope=ORDERS_READ+MERCHANT_PROFILE_READ&state=abc123
 https://connect.squareupsandbox.com/oauth2/authorize?client_id=sandbox-sq0idb-ioiyW39PwrXoGy4&scope=ORDERS_READ+MERCHANT_PROFILE_READ&state=abc123
 
 Important
 Make sure to provide sellers with the authorization URL for the production environment, which uses the production base URL and your production application ID. The Sandbox is only used for testing.
 Link to section Access tokens
 The tokens you obtain are also scoped to an environment. To call Square APIs (except the OAuth API), use the access token that corresponds to the base URL.
 Production
 Sandbox
 Calls to https://connect.squareup.com/v2
 require a valid production access token.
 curl https://connect.squareup.com/v2/locations \ 
 -H &#x27;Square-Version: 2025-01-23&#x27; \ 
 -H &#x27;Authorization: Bearer {PRODUCTION_ACCESS_TOKEN}&#x27; \ 
 -H &#x27;Content-Type: application/json&#x27; 
 Note
 Webhook Subscriptions API and Events API endpoints require the developer&#x27;s personal access token . OAuth access tokens aren&#x27;t valid with these APIs.
 Mixing the access token environment results in an AUTHENTICATION_ERROR
 error with the UNAUTHORIZED
 error code.
 Link to section Sandbox testing
 When testing the OAuth flow in the Sandbox, you cannot sign in directly to the Square authorization page like you can in the production environment.
 Instead, you must open the Sandbox Square Dashboard for a Sandbox test account in a separate web page and then use the authorization URL to open the Square authorization page. For instructions, see step 3 in OAuth Walkthrough: Test Authorization with a Web Server . This limitation is the reason the session=false
 parameter in the authorization URL isn&#x27;t supported in the Sandbox.
 If you don&#x27;t need to test the OAuth flow, you can create Sandbox test accounts and quickly generate Sandbox access tokens to test with specific permissions.
 Link to section Common errors
 Authorization errors are typically caused by typos or mismatched credentials (Sandbox versus Production credentials).
 Make sure you&#x27;ve updated placeholders and default values in the sample code with valid application credentials.
 Make sure you&#x27;ve configured your credentials correctly. For example, if you&#x27;re testing calls in production, make sure you&#x27;re not using Sandbox credentials.
 Make sure you&#x27;re using the right credential type. For example, application IDs are used for OAuth API calls but access tokens are often used in other API calls.
 Make sure the access token is sent as a bearer token (for example, Authorization: Bearer {ACCESS_TOKEN}
).
 For more information, see Authentication errors .
 Link to section See also
 Create the Redirect URL and Square Authorization Page URL 
 Receive Seller Authorization and Manage Seller OAuth Tokens 
 Refresh, Revoke, and Limit the Scope of OAuth Tokens 
 OAuth Walkthrough: Test Authorization with a Web Server 
 OAuth Best Practices 
 Move OAuth from the Sandbox to Production 
 OAuth Permissions Reference 
 Video: OAuth Best Practices 
 On this page Overview Requirements and limitations OAuth flows Code flow PKCE flow Determine which OAuth flow applies to your application Webhooks OAuth in the production and Sandbox environments Common errors See also
