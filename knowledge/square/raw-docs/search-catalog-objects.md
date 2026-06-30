# search-catalog-objects

Source: https://developer.squareup.com/docs/catalog-api/search-catalog-objects
Downloaded: 2026-06-30T20:40:58.533Z

---

Call the SearchCatalogObjects Endpoint 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog /
 Search a Catalog Call the SearchCatalogObjects Endpoint
 Applies to: Catalog API 
 Learn how to programmatically search for objects of any type. 
 On this page Overview Search with an exact query filter Search with a combination of query filters Search with a prefix query filter Search with a text query filter Search with items for a modifier list filter Search for deleted objects Link to section Overview
 You can call the SearchCatalogObjects endpoint to search for catalog objects of any type using the following query filters assigned as a query
 parameter value:
 Filter Purpose 
 exact_query
 - CatalogQueryExact Returns any types of objects matching an attribute name and value exactly. 
 prefix_query
 - CatalogQueryPrefix Returns any types of objects matching a prefix of an attribute value. 
 range_query
 - CatalogQueryRange Returns any types of objects matching a numerical range of an attribute value. 
 text_query
 - CatalogQueryText Returns any types of objects matching keywords against searchable attribute values. Searchable attributes include name
 and description
. 
 sorted_attribute_query
 - CatalogQuerySortedAttribute Sorts returned results in a specified order by an attribute. 
 items_for_tax_query
 - CatalogQueryItemsForTax Returns items with specified catalog tax IDs. 
 items_for_modifier_list_query
 - CatalogQueryItemsForModifierList Returns items enabled with specified modifier lists as identified by their IDs. 
 items_for_item_options
 - CatalogQueryItemsForItemOptions Returns items with specified item options as identified by their IDs. 
 items_variations_for_item_option_values_query
 - CatalogQueryItemVariationsForItemOptionValues Returns item variations with specified item option values as identified by their IDs. 
 In addition, you can call the SearchCatalogObjects
 endpoint to search for catalog objects by matching values of the following system attributes:
 A begin_time
 attribute returns objects last modified since the specified time.
 An include_category_path_to_root
 Boolean attribute includes a path_to_root
 list for each returned category instance if set to true
. This attribute is useful if objects in the catalog belong to categories nested within other categories. If set to true
, include_deleted_objects
 must be set to false
.
 An include_deleted_objects
 Boolean attribute returns deleted objects in the results list ( true
) or not ( false
, the default). If set to true
, include_category_path_to_root
 must be set to false
.
 An include_related_objects
 attribute of a Boolean flag returns ( true
) or not ( false
) objects related to those matching other specified query filters.
 An object_types
 attribute returns objects of the specified types matching other specified query filters.
 Important
 A SearchCatalogObjects
 request fails if both include_deleted_objects
 and include_category_path_to_root
 parameters are set to true
. Only one of the two attributes can be true
 at a time.
 You cannot call SearchCatalogObjects
 with custom attribute query filters.
 Link to section Search with an exact query filter
 To search for catalog objects of a known attribute name and value, call the SearchCatalogObjects
 endpoint while supplying the exact_query
 filter in the query
 parameter.
 This is shown in the following examples.
 Request
 Response
 This example searches for catalog objects with the name
 attribute with a value of coffee
:
 Search catalog objects
 cURL
 
 When using an exact query filter, the names of the attributes must match exactly with what you specify. However, the values of these attributes are matched without worrying about uppercase or lowercase letters.
 Link to section Search with a combination of query filters
 You can combine a query with other search conditions to return the result that satisfies all the specified query expressions and search conditions.
 Request
 Response
 The following cURL example shows how to call the SearchCatalogObjects
 endpoint to search for objects of the ITEM_VARIATION
 type matching their name
 attribute value to coffee
, without including any related object:
 Search catalog objects
 cURL
 
 Link to section Search with a prefix query filter
 To search for catalog objects with a given attribute value starting with a specified text string, call SearchCatalogObject
 while supplying a prefix_query
 filter in the query
 parameter.
 Request
 Response
 The following example searches for objects whose name
 attribute starts with the text of "sma":
 Search catalog objects
 cURL
 
 As another example, try to search for objects with "happy" as a prefix to the name
 attribute value:
 Request
 Response
 Search catalog objects
 cURL
 
 Link to section Search with a text query filter
 Search with a text_query
 filter is like free-text search that returns objects by matching searchable attribute values of objects against the specified list of keywords. The search result doesn&#x27;t depend on the order of the keywords specified.
 Request
 Response
 The following example uses a text_query
 filter to search for objects containing the words "one", "free", and "drink" in any of their searchable attributes:
 Search catalog objects
 cURL
 
 Link to section Search with items for a modifier list filter
 The SearchCatalogObjects
 endpoint also supports searching for catalog items with the specified modifier list enabled. To do so, use the items_for_modifier_list_query
 filter in the query
 parameter. The filter defines the IDs of modifier lists enabled for the items.
 Request
 Response
 The following example searches for the catalog items that have a specific modifier list ( ["ZVSGY6U63IGCZQL4IOPZAKYW"]
) enabled. The specified modifier list is named Milk Options
 and contains two modifiers defined for the Skim Milk
 and Whole Milk
 variations enabled for the item.
 Search catalog objects
 cURL
 
 Link to section Search for deleted objects
 When a catalog object is deleted, its is_deleted
 attribute is set to true
. To retrieve a deleted object, you can set include_deleted_objects
 to true
 when calling the SearchCatalogObjects
 endpoint and then inspect the result to filter those with "is_deleted": true
.
 Request
 Response
 The following example searches for the catalog items that can include the deleted ones:
 Search catalog objects
 cURL
 
 On this page Overview Search with an exact query filter Search with a combination of query filters Search with a prefix query filter Search with a text query filter Search with items for a modifier list filter Search for deleted objects
