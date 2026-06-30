# sites-api-overview

Source: https://developer.squareup.com/docs/sites-api/overview
Downloaded: 2026-06-30T20:41:12.700Z

---

Sites API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Square Online Sites API
 Applies to: Sites API | Snippets API 
 Learn about the Sites API, which you can use to list the Square Online sites that belong to a Square seller. 
 On this page Overview Requirements and limitations See also Link to section Overview
 Square sellers use Square Online to build eCommerce websites by choosing from a variety of built-in templates and features. Developers can create integrations and third-party applications that extend Square Online features and add custom functionality.
 The Sites API lets you retrieve basic details about the sites that belong to a seller (such as site ID, title, and domain). You can use the Sites API in combination with the Snippets API to add a snippet to a Square Online site.
 Note
 Square Online APIs are publicly available as part of an early access program. For more information, see Early access program for Square Online APIs. 
 Link to section Requirements and limitations
 Applications that use OAuth require the ONLINE_STORE_SITE_READ
 permission to access site resources for a Square seller account. Depending on its functionality, your application might also require other Square permissions. For more information, see OAuth API .

 Square doesn&#x27;t provide a sandbox eCommerce environment for testing calls to the Sites API.

 The Sites API cannot be used to access or manage Square Online orders. To work with orders, use SearchOrders
 and other Orders API endpoints. For more information, see Orders API .

 Link to section See also
 Use the Sites API 
 API Reference: Sites API 
 On this page Overview Requirements and limitations See also
