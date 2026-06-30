# snippets-api-overview

Source: https://developer.squareup.com/docs/snippets-api/overview
Downloaded: 2026-06-30T20:41:13.765Z

---

Snippets API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Square Online Snippets API
 Applies to: Snippets API | Sites API 
 Learn how applications can integrate with the Snippets API to add custom functionality to Square Online sites. 
 On this page Overview Requirements and limitations How it works Security considerations Best practices See also Link to section Overview
 Square sellers use Square Online to build eCommerce websites with a rich set of features. Sellers can also add custom functionality to their sites through third-party applications. You can use the Snippets API to create applications that help sellers streamline business operations and create a better online experience.
 Note
 Square Online APIs are publicly available as part of an early access program. For more information, see Early access program for Square Online APIs. 
 Link to section Requirements and limitations
 You should be aware of the following requirements, limitations, and other considerations when working with snippets and the Snippets API:
 Snippets can be added to Square Online sites only.

 Integration with the checkout flow isn&#x27;t supported. A snippet is injected at the end of the <head>
 element on all pages on a site, except checkout pages. You shouldn&#x27;t attempt to integrate with any part of the checkout flow on a Square Online site.

 An application can add one snippet per site. A site can contain snippets from multiple applications, but only one snippet from a given application.

 You must disclose information to the seller about your snippet, such as how to use the snippet, the information that it collects, and how to enable or disable it.

 Sellers cannot view or edit your snippet code from the Square Dashboard.
 If a seller disconnects your application or revokes its permissions, Square removes your snippet from the site. For more information, see Subscribe to the token revoked event .

 Square doesn&#x27;t provide a sandbox eCommerce environment for testing snippets or calls to the Sites or Snippets API. For more information, see Test your application .

 For best practices and additional requirements for snippets and applications that integrate with the Snippets API, see Best practices .
 Link to section How it works
 Applications can use the Snippets API to add a snippet to a Square Online site. Snippets are scripts that can run as various site components (such as modals, pop ups, or background jobs) and offer a range of functionality. For example, a snippet can integrate with Square and external products or services, improve customer acquisition and engagement, and provide industry-specific or general tools that help businesses run more efficiently. For more integration ideas, see Introducing Snippets API .
 
 When a seller decides to add your snippet to their site, they connect their Square account to your application. The seller is then redirected to your application, where they can configure preferences, options, or any other details your application needs to generate your snippet.
 When the snippet is ready, your application calls the Snippets API to add the snippet to the target site. This operation injects the snippet at the end of the <head>
 element on all pages of the site, except for checkout pages.
 A snippet application includes the following components:
 Snippet code - A string that can contain valid HTML, CSS, and JavaScript. The code is sent to the Snippets API in the content
 field of a Snippet object, as shown in the following example request body:
 { 
 "snippet" : { 
 "content" : "{YOUR SNIPPET CODE HERE}" 
 } 
 } 
 An application can have only one snippet on a given site at a time.
 Although the snippet is limited to a single string, it can contain multiple HTML elements and reference external JavaScript libraries. In addition, you can build the snippet dynamically per site before sending it to the Snippets API.
 Snippets aren&#x27;t intended to interact directly with Square APIs. To integrate with orders, customers, or other Square features, your application can call Square APIs and then call UpsertSnippet
 to update the snippet as needed.
 Note
 If your application sends a high number of calls to Square APIs in a short period of time, you should make sure to handle potential rate limiting errors. For more information, see  RATE_LIMIT_ERROR .
 
 Management dashboard - If you offer snippets through your application, you must provide a UI and dashboard that allow sellers to manage their snippets on one or more sites. This is required because sellers cannot use Square products or tools to manage snippets.
 Depending on your workflows, your dashboard might call the Snippets and Sites APIs to perform the following tasks:
 List sites 
 Add or update a snippet 
 Retrieve a snippet 
 Delete a snippet 
 Applications can only access their own snippet for a given site; they cannot access snippets created by other applications.
 Note
 Square also requires that your application allows sellers to view the status of their Square OAuth access token and to disconnect your application by revoking the access token. For more information, see OAuth Best Practices .
 
 Link to section OAuth requirements
 Applications that use OAuth require the following OAuth permissions to access and manage site and snippet resources for a Square seller account:
 ONLINE_STORE_SITE_READ

 ONLINE_STORE_SNIPPETS_READ

 ONLINE_STORE_SNIPPETS_WRITE

 Your application uses these permissions to call the Snippets and Sites APIs on behalf of a seller. Depending on its functionality, your application might also require other Square permissions. For more information, see OAuth API .
 A snippet is tied to a particular application through the client_id
 parameter provided in the OAuth flow.
 Important
 Make sure to periodically refresh your OAuth tokens. This is especially important when your application calls other Square APIs. If a token expires, your calls to Square APIs will fail. For more information, see Refresh the access token .
 You must follow best practices for obtaining and handling customer data and OAuth access tokens. For more information, see Best Practices for Collecting Information and OAuth Best Practices .
 Link to section Subscribe to the token revoked event (recommended)
 If a seller disconnects your application from the Square Dashboard, Square revokes the OAuth permissions for your application and triggers the oauth.authorization.revoked webhook event. Square listens for this event and then removes your snippet code from the seller&#x27;s site.
 If you store customer data or OAuth access tokens for sellers, you should also subscribe to this event. Then, you can use the merchant_id
 field in the event notification to find and delete any information you stored for the seller.
 In the Developer Console , open your application.
 Note
 For information about signing up for a Square account and creating an application, see Get Started .
 
 At the top of the page, choose Production . The Snippets API isn&#x27;t available in the Sandbox environment.

 In the left pane, expand Webhooks , and then choose Subscriptions .

 Choose Add subscription , and then configure the subscription:
 For Webhook name , enter a name such as Access Revoked .
 For URL , enter the URL of your listener. If you don&#x27;t have a working URL yet, you can enter https://example.com as a placeholder.
 Optional. For API version , choose a Square API version. By default, this is set to the same version as the application.
 For Events , choose oauth.authorization.revoked .
 Choose Save .
 
 Your listener must validate the notification and respond with an HTTP 2xx response code in a timely manner. For general information about webhooks, see Square Webhooks . For information about viewing webhook logs, see Webhook Event Logs .
 Note
 Square doesn&#x27;t send webhook notifications for snippet events because a snippet can be accessed only by the application that added it to the site. It cannot be accessed by the seller or other applications.
 Link to section Security considerations
 You should be aware of the following security considerations when working with snippets and the Snippets API:
 Snippets integration must be approved for Square App Marketplace - Applications that integrate with the Snippets API must receive explicit approval from Square before they can be listed in the Square App Marketplace. Snippet applications that are submitted for approval are subject to a stringent review and vetting process.

 Integration with the checkout flow isn&#x27;t supported - Snippets are injected at the end of the <head>
 element on all pages of the site, except for checkout pages. This reduces the risk that a snippet can access sensitive customer or payment information. You shouldn&#x27;t attempt to integrate with any part of the checkout flow on a Square Online site.

 The session cookie is protected - Cookies are stored on the .square.site
 domain or on a custom domain, so the Square session cannot be accessed or hijacked.

 Link to section Best practices
 The following best practices and additional requirements apply when working with snippets:
 Avoid blocking code in your snippet - Snippets are inserted into the <head>
 element of site pages, so you should avoid any code that might cause pages to load slowly or prevent the rest of the page from loading.
 You can have your snippet code execute after the Document Object Model (DOM) is loaded . Many JavaScript libraries have this functionality built in.

 Use CDNs to load remote assets - When possible, your snippet should use content delivery networks (CDNs ) to load remote assets (using the HTTPS and TLS protocols). Also when possible, the assets should be loaded asynchronously.

 Use appropriate HTML elements - Your snippet should include only HTML elements that are permitted in the <head>
 element, such as <script>
, *
, <meta>
, <style>
, and <title>
. Don&#x27;t include displayable HTML elements, such as , 
, or ``.
 Important
 Although your snippet can manipulate the DOM, it shouldn&#x27;t rely on class names for DOM nodes or other HTML elements on Square Online pages. These names are subject to change without notice, so snippets that target specific DOM elements on the page might break at any time.
 
 Don&#x27;t use iFrames - Different browsers use different security protocols for iFrames, which can lead to inconsistent behavior across browsers for iFrames and snippets that use them.

 Avoid behavior that results in a poor buyer experience - The snippet must not:
 Display ads, JavaScript alerts, confirmation boxes, or other distracting items.
 Expose unfriendly text to site users, such as overly technical error messages. All messages displayed to site users must be user friendly.
 Obscure any major element on a site without providing easy recourse.
 Excessively log debug or error messages to the JavaScript console.
 
 Don&#x27;t ask Square customers for a password - Your snippet shouldn&#x27;t prompt customers to provide a password in the browser. If your implementation has a use case that requires obtaining a password from a customer in the browser, you should redirect the customer to your log in page or open a separate window to allow the customer to log in.

 Don&#x27;t call Square APIs directly from the browser - Browsers don&#x27;t provide a secure environment for storing OAuth access tokens, application secrets, or other sensitive information.

 Test on multiple device types - You must test your snippet to ensure that it functions properly on various device types, including desktop, mobile, and tablet. Learn how to get set up for testing .

 Enable sellers to manage your snippet - Your application must provide a UI that enables sellers to:
 View a list of their Square Online sites and select which site or sites they want to add the snippet to.

 Check the status of the snippets on their site. For example, sellers should be able to see which sites the snippet is added to and whether the snippet is activated or deactivated.

 Remove the snippet from one or more sites.

 Make sure your application, application listing, or onboarding flow also provides information about your snippet, such as how to use the snippet and any information it collects.

 Link to section See also
 Use the Snippets API 
 Add a Snippet to a Site 
 Square Online Store Snippets Example 
 Video: Introducing Snippets API 
 Video: Sandbox Sessions: Snippets API 
 Video: Workshop: Snippets API 
 API Reference: Snippets API 
 On this page Overview Requirements and limitations How it works Security considerations Best practices See also
