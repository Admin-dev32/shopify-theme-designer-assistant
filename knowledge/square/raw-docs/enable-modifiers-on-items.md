# enable-modifiers-on-items

Source: https://developer.squareup.com/docs/catalog-api/enable-modifiers-on-items
Downloaded: 2026-06-30T20:41:02.001Z

---

Enable Item Customization with Modifiers 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Enable Item Customization with Modifiers
 Applies to: Catalog API 
 Learn how to enable item customization with list-based and text-based modifiers. 
 On this page Overview List-based modifiers Text-based modifiers Controlling modifier selection Assign item modifier lists Batch catalog updates See also Link to section Overview
 Modifiers are used to customize items at checkout. Instead of creating separate items for every possible burger combination, a seller can create one hamburger item and let buyers customize it with different toppings, condiments, and types of cheese. A seller can also have one item for a scoop of ice cream and modifiers for each available flavor.
 These customization options are represented by CatalogModifier objects in the Catalog API. The seller sets the price for each modifier option and controls how many can be selected. When the item is sold, the total price includes the basic item price and the price of each selected modifier option.
 The Square catalog supports two types of modifiers:
 List-based modifiers represent lists of available modifications for an item.
 Text-based modifiers represent a single text field.
 Link to section List-based modifiers
 A list of modifier options lets customers choose their modifiers when buying an item. For example, a buyer can select from different flavored syrups in their latte and add extra pumps of their preferred syrup or extra espresso shots. When customizing a meal, buyers might choose a required protein and select from various sauces or premium toppings for an extra charge.
 Each group of options is represented by a CatalogModifierList , and each option within the list is a CatalogModifier . Sellers can control:
 How many different modifiers can be selected.
 Whether the same modifier can be selected multiple times.
 Which modifiers are selected by default.
 Whether modifiers appear in online ordering.
 Whether modifiers are shown on customer receipts.
 Important
 Individual modifiers in a list always appear at all locations — you cannot restrict them to specific locations. If you want different modifiers at different locations, you need to create separate modifier lists for each location. The present_at_all_locations
 property is always treated as true
 by Square products.
 Link to section List-based data model
 An example data model for list-based modifiers is shown in the following UpsertCatalogObject
 request. The request creates a latte catalog item with small, medium, and large size variations and three modifier lists:
 A milk modifier list that:
 Sets whole milk as the default milk type ( "on_by_default": true
).
 Requires one selection ( "min_selected_modifiers": 1, "max_selected_modifiers": 1
).
 Prohibits selecting more than one milk type ( "allow_quantities": false
).
 Adds a $1 charge for non-dairy milk.
 
 An espresso shot modifier list that:
 Makes extra shots optional ( "min_selected_modifiers": 0
).
 Allows multiple extra shots ( "allow_quantities": true
).
 Allows up to four extra shots ( "max_selected_modifiers": 4
).
 
 A flavor shot modifier list that:
 Makes flavored syrup optional ( "min_selected_modifiers": 0
).
 Allows for multiple flavor types ( "allow_quantities": true
).
 Allows up to six extra shots ( "max_selected_modifiers": 6
).
 
 Request
 Response
 Batch upsert catalog objects
 cURL
 
 Link to section Text-based modifiers
 A text-based modifier lets the buyer set a text property when buying an item. For example, custom text printed or embroidered onto a piece of clothing, personalized gift messages, or custom engraving.
 Sellers can control:
 The maximum length of the text, in Unicode points.
 Whether non-empty text input is required by the buyer.
 Link to section Text-based data model
 Text modifiers are also represented by a CatalogModifierList , but they don&#x27;t have a modifiers
 list property. There&#x27;s no accompanying CatalogModifier object, so price and other modifier properties cannot be set for a text-based modifier. The cost should be built into the price of the item itself, not the modifier.
 min_selected_modifiers
 and max_selected_modifiers
 aren&#x27;t relevant for text-based modifiers, so you don&#x27;t need to set these fields on the modifier list. To include multiple text-based modifiers for an item, create a separate CatalogModifierList
 object for each text field.
 The following example invokes BatchUpsertCatalogObjects
 to create three catalog objects:
 A CatalogModifierList
 representing custom text for the front of a T-shirt.
 Another CatalogModifierList
 representing custom text for the back of a T-shirt.
 A CatalogItem
 representing the T-shirt item with custom text.
 Request
 Response
 Batch upsert catalog objects
 cURL
 
 Link to section Controlling modifier selection
 Sellers have a number of ways to control which modifiers are available on items and how buyers can select them. Modifier behavior can be controlled at the individual modifier level, the modifier list level, or the item level.
 Link to section Individual modifier settings
 Individual modifiers ( CatalogModifier objects) have settings that control their default behavior:
 Setting Description Example use 
 hidden_online
 Hides this modifier from online ordering. A special in-store only option. 
 on_by_default
 This modifier is selected by default. Common options such as lettuce on a burger, 
 price_money
 The cost of the modifier. $1 for extra cheese. 
 You can override these individual modifier settings for specific items using CatalogModifierOverride
 objects within the CatalogItemModifierListInfo.modifier_overrides
 array. You can also override the default modifier price based on location if you set a location_overrides price.
 Link to section Modifier list settings
 Modifier lists ( CatalogModifierList objects) control how the entire group of modifiers behaves, and how the modifiers can be selected:
 Setting Description Example use 
 allow_quantities
 When set to true
, allows multiple quantities of the same modifier. Ordering multiple scoops of vanilla ice cream on one sundae. 
 min_selected_modifiers
 The minimum number of modifiers that must be selected. Requiring at least one scoop of ice cream. 
 max_selected_modifiers
 The maximum number of modifiers that can be selected (0 means no limit). Limiting a sundae to three scoops. 
 hidden_from_customer
 When set to true
, hides modifiers from customer receipts. Internal cooking instructions. 
 You can override these modifier list settings when the modifiers are applied to specific items by using fields defined in CatalogItemModifierListInfo
.
 Link to section Item-specific settings
 You apply modifier lists to an item using a CatalogItemModifierListInfo object. With this object, you can customize how modifiers behave for that specific item and optionally override the modifier settings defined on the modifier list.
 Setting Description 
 allow_quantities
 When set to YES
, allows multiple quantities of the same modifier. 
 min_selected_modifiers
 The smallest number of modifiers that must be selected. Set this value and max_selected_modifiers
 to -1 to use the minimum and maximum selection values set on the CatalogItemModifierList
. 
 max_selected_modifiers
 The largest number of modifiers that can be selected. Set this value and min_selected_modifiers
 to -1 to use the minimum and maximum selection values set on the CatalogItemModifierList
. 
 hidden_from_customer_override
 When set to YES
, the modifiers in this list aren&#x27;t shown on customer receipts. 
 Link to section Assign item modifier lists
 Occasionally, a seller might want to reassign different modifier lists to existing catalog items. The assignment is stored in the CatalogItem.modifier_list_info
 property. To change it, your application makes an UpsertCatalogObject
 call. Because the Catalog API doesn&#x27;t support sparse updates, you need to fetch the CatalogItem
, update the modifier_list_info
 property, and make the update request with the full catalog object body.
 The Catalog API provides another way to reassign lists. Using the UpdateItemModifierLists endpoint, provide the ID of the catalog item whose modifier list you want to change. Provide the IDs of the lists you want to enable for the catalog item and those you want to disable. If multiple catalog items need to have the same modifier lists reassigned, you can batch the updates by providing the IDs of each catalog item in a single API call.
 Link to section Batch catalog updates
 When multiple catalog objects are created, you can call UpsertCatalogObject
 for each object to be created or call BatchUpsertCatalogObjects
 once to create all the required catalog objects.
 When making individual UpsertCatalogObject
 calls to create a set of related objects, you need to parse the id_mappings
 property from each response. This property contains the object IDs that you use in subsequent calls to create related objects.
 When using the BatchUpsertCatalogObjects
, you define your own temporary object IDs to be used within the single batch request body. These IDs tell Square how you want new objects to relate to each other. With the batch operation, you don&#x27;t need to parse each individual response to get the Square-assigned IDs.
 Square recommends using the batch pattern because it&#x27;s more efficient. The seller using your application might make many updates over a short period. In this case, the batch pattern is advised. If your application uses the individual pattern, it can be rate-limited by Square when your seller makes too many updates too often.
 Link to section See also
 Design a Catalog 
 Build a Catalog 
 On this page Overview List-based modifiers Text-based modifiers Controlling modifier selection Assign item modifier lists Batch catalog updates See also
