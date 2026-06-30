# inventory-api-overview

Source: https://developer.squareup.com/docs/inventory-api/what-it-does
Downloaded: 2026-06-30T20:41:16.809Z

---

Inventory API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce Inventory API
 Applies to: Inventory API | Catalog API 
 Learn about using the Inventory API to adjust inventory quantities and review inventory changes for products in a Square catalog. 
 On this page Overview Link to section Overview
 A Square seller maintains inventory to keep track of the quantity of products for sale or services for hire. Inventory tracking is essentially the process of moving quantities of item variations between the different inventory states. For example, when the online order for a leather collar and heavy sweater is processed, the on-hand quantities for leather collar and heavy sweater are automatically updated by moving the number of purchased units for each item variation from IN_STOCK
 to SOLD
.
 
 In addition to automatic inventory tracking, Square supports nuanced inventory tracking (such as receiving stock and marking waste) and reconciliation.
 With inventory, the seller can get answers to questions like "How much do I have in store now?" and "How many of a particular item were lost?" Through historical data, the seller might even get a view of trends of how fast a particular product sells or how soon a product should be restocked.
 For products or services to be tracked in an inventory, they must be defined as item variations in the Square catalog. In other words, a catalog defines what the seller has for sale, whereas an inventory describes how much the seller has in stock or has changed in stock. In the Square Dashboard, managing the catalog and maintaining the inventory are integrated in the item library.
 The Square Inventory API lets you create applications to manage Square inventories programmatically on behalf of Square sellers. Specifically, you can use the Inventory API to adjust inventory quantities and review inventory changes for products in a Square catalog. To track new products or services, you must enable your application to call the Catalog API to create appropriate items with required item variations.
