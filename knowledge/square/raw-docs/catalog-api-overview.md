# catalog-api-overview

Source: https://developer.squareup.com/docs/catalog-api/what-it-does
Downloaded: 2026-06-30T20:40:54.136Z

---

Catalog API 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce Catalog API
 Applies to: Catalog API | Inventory API | Orders API 
 Learn about creating and managing a seller&#x27;s item library (also known as a catalog) with the Catalog API. 
 On this page Overview Requirements and limitations Catalog objects Create catalog objects Catalog API types Reference other objects by their IDs Reference objects as nested objects Idempotency keys Pagination See also Link to section Overview
 The Square item library allows sellers to record detailed information about their products and business processes. It includes products or services, variations, options, categories, discounts, and taxes. It also supports pricing rules for automatic price adjustments under certain conditions.
 The Catalog API allows you to manage a seller&#x27;s item library programmatically. You can create, view, update, or delete catalog items and update inventory levels of stocked items using the Inventory API . Create and track customer orders using the Orders API . As an order is created, its line items are selected from the item library and on completion of an order, the line items sold are subtracted from the inventory of the items.
 The Catalog API supports individual or batch operations to reduce the number of API calls. It also handles large result sets page by page to reduce server load. Without the Catalog API, you need to use the Item Editor in the Square Dashboard to manage items one by one. The API integrates the item library with other Square or third-party services.
 New items created with the Catalog API are immediately visible in the Square Dashboard and Point of Sale across all locations. Use the Catalog API for item libraries and the Inventory API for inventory management.
 Link to section Requirements and limitations
 Applications using OAuth must have ITEMS_READ
 permission to read catalog objects and ITEMS_WRITE
 permission to create, update, or delete catalog objects.
 Individual catalog items can have up to 250 item variations.
 Link to section Catalog objects
 An item library entry for a product or service is called a catalog item. For example, a shirt from a specific brand of a specific style should be an item. Variations, like different sizes of the shirt, are called item variations. This makes it easy to retrieve related products together. Without item variations, you need to retrieve items one by one or filter them yourself.
 Your application should allow a seller to define items with details like description and unit of measure, create item variations, and set sale-time variation modifiers for buyers. The seller decides whether an item is defined by its brand, style, or other characteristics, as well as the number and nature of item variations. For more details, see Design a Catalog .
 Discounts and taxes are also catalog entries, called catalog discount and catalog tax. These are examples of the various types of entries in the Square catalog representing different business data or processes.
 Link to section Object inheritance
 The Catalog API exposes catalog entries as generic CatalogObject instances, which act as a wrapper for various types of Square catalog objects. Each CatalogObject
 instance has a specific type such as a CatalogItem . For example, an item variation is both a CatalogObject
 and a CatalogItemVariation . Taxes are CatalogObject
 and CatalogTax types. These are examples of the different types of catalog entries used in managing a seller&#x27;s business.
 The following diagram of CatalogObject
 instances of the ITEM
, ITEM_VARIATION
, and TAX
 types illustrates this relationship. Each instance has an idempotency_key
 property, which is required when the object is created or updated, and an object
 property, whose value depends on the type
 specified.
 
 Link to section Create catalog objects
 To create a catalog entry, choose the appropriate type and provide matching data. For example, to add an item, create a CatalogObject
 with ITEM
 as the type and assign item data. The resulting instance is both a CatalogObject
 and a CatalogItem . Similarly, to add an item variation, set the type to ITEM_VARIATION
 and provide item variation data. The result is both a CatalogObject
 and a CatalogItemVariation . Setting a mismatched data field causes an error.
 Additional examples:
 To add an item option to a catalog, create a CatalogObject
 instance and set its type
 property value as ITEM_OPTION
 and its item_option_data
 field value as a CatalogItemOption instance.

 To add a tax entry to a catalog, create a CatalogObject
 instance and set its type
 property value as TAX
 and its tax_data
 field value as a CatalogTax instance.

 To add a pricing rule to a catalog, create a CatalogObject
 instance and set its type
 property value as PRICING_RULE
 and its pricing_rule_data
 field value as a CatalogPricingRule instance.

 Link to section Catalog API types
 There are many Catalog API types. Each type models a particular data type. The following list of CatalogObject
 types are also more specific types: 
 Type API object Purpose 
 CATEGORY CatalogCategory Models a category as an association of a group of related catalog items. 
 CUSTOM_ATTRIBUTE_DEFINITION CatalogCustomAttributeDefinition Defines a custom attribute to supplement another CatalogObject
. 
 DISCOUNT CatalogDiscount Models a discount applicable to a catalog item. 
 IMAGE CatalogImage Represents an image file that can be associated with a catalog item, item variation, or category. 
 ITEM CatalogItem Represents a product for sale or a service for hire. 
 ITEM_VARIATION CatalogItemVariation Models the variations of a product or service so that the variations can be treated as a single product or service. For example, a small-, medium-, or large-sized shirt is just a shirt, possibly with the same or different price. 
 MEASUREMENT_UNIT CatalogMeasurementUnit Models the unit of products or services as specified in an item variation or the precision of numerical quantities. 
 MODIFIER CatalogModifier Represents a modification to an item at the time of sale. 
 MODIFIER_LIST CatalogModifierList Represents a list of modifiers used to apply the contained modifiers to an item. 
 PRICING_RULE CatalogPricingRule Specifies rules for automatic cost adjustments, including discounts. 
 PRODUCT_SET CatalogProductSet Represents a set of products to which price adjustments and other operations can be applied. 
 QUICK_AMOUNTS_SETTINGS CatalogQuickAmountsSettings Represents preset charges for quick transactions. 
 TAX CatalogTax Represents a tax applicable to an item. 
 TIME_PERIOD CatalogTimePeriod Represents a time span during which a specified operation or condition is applicable. 
 To learn more about Square catalog object types, see Build a Simple Catalog .
 To search for or retrieve catalog objects, you can specify a type to narrow the results to that type of CatalogObject
 instances. If you don&#x27;t specify a type, the results include all types of catalog objects that meet the query conditions.
 Link to section Reference other objects by their IDs
 When a catalog object references other catalog objects, it uses their IDs. For example, a tax applied to an item is referenced through the tax_ids
 property on the CatalogItem
 object. You must first create the tax object, get its ID, and then reference it from the item. Catalog objects can be created individually.
 When creating a new object and its dependent objects in the same batch request, you need to use client-assigned temporary IDs. These IDs are #-prefixed unique strings. After creation, Square assigns unique IDs to these objects. The batch response provides a mapping between your temporary ID and the ID assigned by Square.
 For example, the following BatchUpsertCatalogObjects
 request payload shows how temporary IDs are used to identify and reference catalog objects to be created in the same request:
 Request
 Response
 Batch upsert catalog objects
 cURL
 
 Link to section Reference objects as nested objects
 In some cases, objects can be referenced as nested objects. For example, a CatalogItem
 instance references dependent item variations through the nested CatalogItemVariation
 instances.
 The following example illustrates an ITEM
 and two nested ITEM_VARIATION
 instances:
 Request
 Response
 Batch upsert catalog objects
 cURL
 
 In the previous request, the CatalogItem
 instance references the dependent item variation as a nested CatalogItemVariation
 instance declared as an element of the variations
 list.
 Link to section Idempotency keys
 A POST or PUT request of the Catalog API must include an idempotency key in the request body. For more information, see Idempotency .
 Link to section Pagination
 All Catalog API endpoints that have the potential to return a large number of objects use pagination. For more information, see Pagination .
 Link to section See also
 Design a Catalog 
 Build a Simple Catalog 
 On this page Overview Requirements and limitations Catalog objects Create catalog objects Catalog API types Reference other objects by their IDs Reference objects as nested objects Idempotency keys Pagination See also
