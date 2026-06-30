# orders-api-overview

Source: https://developer.squareup.com/docs/orders-api/what-it-does
Downloaded: 2026-06-30T20:41:07.382Z

---

Orders API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce Orders API
 Applies to: Orders API | Catalog API | Customers API 
 Learn about the Orders API and how to track and manage the lifecycle of a purchase. 
 On this page Overview Orders components Integrating with the Orders API Webhooks See also Link to section Overview
 The Orders API can record purchase items, calculate totals, confirm payments, track an order&#x27;s progress through fulfillment, and update a catalog inventory. It can also create fulfillment orders and send them to the Square Point of Sale application for fulfillment.
 Important
 There is no transaction fee for orders paid using Square payments. If you want to use the Square Orders API with a non-Square payments provider, there is a 1% fee per transaction. For more information, contact us .
 Link to section Orders components
 The following are some of the key data elements for the Orders API:
 Orders - An order is a top-level container representing a request to purchase goods or services from a business. Every order includes fields for line item details, fulfillment details, and order summary data, such as the location ID credited with the order and the total amount of taxes collected.

 Line items - Individual items that are purchased as part of the order (for example, an order for a sandwich and two cups of tea). Each line item can have one or more modifiers to represent an available size or color (for example, a chicken sandwich with extra mustard). Line items and modifiers can be built from CatalogItemVariation and CatalogModifier objects or created ad hoc (at the time of creation).

 Price adjustments - An order (or individual line items) might be eligible for discounts or subject to service charges and taxes. The Orders API calculates and applies any price adjustments at the order or line item level. Price adjustments can be configured as Catalog API objects or created ad hoc. For more information, see Order Price Adjustments .

 Fulfillment information - Additional details about how to fulfill an order, such as the customer&#x27;s name or the order pick up time. Every order that has fulfillment information is pushed to the Square Dashboard Order Manager when paid, so that sellers can manage order fulfillment. For more information, see Manage Order Fulfillments .

 Order source - Tracks the digital or physical source of the order. Orders can be searched or retrieved by the source.

 For more information, see Orders objects and data types .
 Link to section Integrating with the Orders API
 The Orders API integrates seamlessly with other Square APIs and resources to expand the functionality of your application.
 Link to section Square Order visibility
 Orders with fulfillment that have been fully paid are pushed to the Square Point of Sale and Square Dashboard Order Manager so that sellers can manage fulfillment with Square. The Orders API supports three types of fulfillment orders: Pickup, Shipment, and Delivery. For more information, see Add fulfillment details .
 The Orders API can also get orders that are originated and completed on the Square Point of Sale. Such an order might have the Order.source
 field set to SQUARE_POS
. Any associated payments will have the Payment.application_details.
 square_product field set to SQUARE_POS
. If an order is created while Point of Sale is in Offline mode, the created_at
 timestamp is set to the time that a Square server received the create request from Point of Sale.
 Any Order that is created for the Square account that your application is connected to is visible to your application, regardless if it was created by Square, your application, or an application published by another developer. If another application attaches custom attributes to an order, your application may not see them depending on the visibility of the custom attribute.
 Link to section Payments
 Link your payments to Order
 objects to itemize sales and apply price modifiers such as taxes, discounts, and service charges. You can also use the Orders API to retrieve any payment activity associated with a sale, whether from the Square Point of Sale, invoices, or an integration build with the Payments API and Orders API. For more information, see Pay for Orders .
 Link to section Catalog
 Line items, line item modifiers, taxes, and discounts can all be defined as catalog objects. The Orders API reaches its full range of capabilities when orders are built using Square Catalog objects .
 Key advantages to using catalog item variations and other catalog objects include:
 Orders that reference catalog IDs for taxes and discounts are automatically calculated and applied to these price modifiers.
 Orders with ad-hoc items can still get the correct tax amounts when letting Square automatically apply taxes by using a seller-defined CatalogTax .
 Orders that reference catalog line items use details defined in the catalog, such as the item name, price, and measurement unit .
 When these orders are completed or refunded, Square updates the inventory for those items.
 Use the Catalog API to build a catalog and unlock the full range of capabilities of the Orders API. For more information about integrating orders with the catalog, see Create Orders .
 Did you know?
 Orders can also be built from ad hoc line items defined when the Order
 object is created. You only need to supply an item name and price.
 Link to section Customers
 Order
 objects can reference a customer profile. You can later use SearchOrders
 to search orders by customer. For more information about making customer profiles, see Manage Customer Profiles . To learn about considerations for assigning a customer to an order, see Linking customers to orders and payments .
 Link to section Webhooks
 A webhook is a subscription that notifies you when a Square event occurs. The Orders API supports the following events:
 Event Permission Description 
 order.created ORDERS_READ
 An Order was created. 
 order.fulfillment.updated ORDERS_READ
 An OrderFulfillment was created or updated. 
 order.updated ORDERS_READ
 An Order was updated. 
 For more information about using webhooks, see Square Webhooks . For a list of webhook events you can subscribe to, see Webhook Events Reference .
 Link to section See also
 Create Orders 
 Pay for Orders 
 Video: Manage Orders with the Orders API 
 On this page Overview Orders components Integrating with the Orders API Webhooks See also
