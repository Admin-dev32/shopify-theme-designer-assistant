# item-options

Source: https://developer.squareup.com/docs/catalog-api/item-options
Downloaded: 2026-06-30T20:41:03.055Z

---

Define Item Variations Using Options 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Define Item Variations Using Options
 Applies to: Catalog API 
 Learn how to use item options to simplify the process of creating standard variants for catalog items. 
 On this page Overview Item options and variations Item variation name strategy Item option strategy Search for item variations with or without item options Link to section Overview
 Leveraging item options offers a more efficient strategy for application developers, especially when addressing inconsistencies in how sellers name product variations. By standardizing attributes like size and color, item options simplify the search process, allowing users to quickly find specific variations (such as a large red polo shirt) without navigating through poorly labeled or inconsistent entries (such as like Large red polo shirt, Red Polo shirt - LG, or Polo shirt: red large). This approach enhances usability and ensures a more seamless shopping experience.
 Link to section Item options and variations
 The Catalog API includes several objects that enable efficient and standardized definitions of item variations in the seller&#x27;s inventory. These objects include:
 Items - Generalized items, such as "Shirt".
 Item variation - Specific items for sale, such as "Polo shirt: Lg, red".
 Item options - Standardized attributes such as color, size, and style.
 When creating item variations in the Square Dashboard, sellers have two options: using item options or the variation name model. In both cases, the item_variation_data.name
 property is assigned a descriptive name. If item options are used, Square sets the variation name by combining the chosen option values into a comma-separated string and the item_variation_data.item_option_values
 property references the selected options and values.
 Important
 When using item options, the CatalogItemVariation.name
 includes only the option values, not the item&#x27;s name (for example, "Large, Red" instead of "Polo shirt: Large, Red"). The item name should be set in the parent catalog item, such as "Polo shirt".
 Link to section Defining variations
 There are two strategies for defining shirt variations:
 Item variation name strategy - Add variation attributes to its name (such as "small red polo shirt").
 Item option strategy - Use item options to set variation attributes (such as "small", "red", and "polo").
 When the variation name strategy is used, a seller might give variations inconsistent names, such as:
 "LG Red Camp Shirt".
 "Blue Polo shirt - small".
 "Yellow T-shirt: XL".
 This can complicate searches within your application. For example, finding a blue polo shirt involves a text query like "blue polo shirt" to locate the relevant catalog objects. For more information, see Search for item variations by searchable attribute .
 Link to section Benefits of using item options
 Item options streamline the creation of item variations by linking them to standardized attributes, such as these examples:
 Color - Options include "Red", "Green", and "Blue".
 Size - Options range from "Extra Large" to "Small".
 Style - Varieties such as "Polo", "Dress", and "Camp".
 After your application creates a CatalogItemOption —such as "color" with predefined values—that option can be applied to define the color attribute for any new catalog items. Your application can also use catalog item options created by the seller in the Square Dashboard.
 Using item options, a variation is automatically generated for every combination of option values. Each variation is linked to options and values (such as Red, Small, and Polo), eliminating the need for sellers to manually format individual descriptions. These examples (color, size, and style) are just that—examples. Your application can create any type of option with various values.
 For information about querying by item option value, see Search for item variations using item options .
 Link to section Item variation name strategy
 Item variations can be straightforward, defined by a single characteristic, or more complex, combining multiple characteristics to represent a composite variation.
 In the following example, $35 polo shirts in three sizes and two colors are sold by a clothing retailer. To add these shirts to the catalog, six item variations are created. All the shirts have the same variation properties except for the variation name, which is unique to each variation.
 "Polo shirt, Red, Large"
 "Polo shirt, Red, Medium"
 "Polo shirt, Red, Small"
 "Polo shirt, Blue, Large"
 "Polo shirt, Blue, Medium"
 "Polo shirt, Blue, Small"
 In the seller&#x27;s item library and at the point of sale, items are organized alphabetically by name. If the naming of variations is inconsistent, the sorting order might appear illogical and confusing.
 Link to section Create item size and color variations using a variation name
 To add item variations to a catalog, create a CatalogItem
 instance with a list of CatalogItemVariation
 instances nested within the item through the variations
 attribute on the CatalogItem
 object. A variation is created for each combination of color and size.
 Request
 Response
 Upsert catalog object
 cURL
 
 Link to section Item option strategy
 Continuing with the polo shirt example, a "Polo shirt" variation must have a color and size because the parent "Shirt" item was defined with these options. The possible values for these variation options are taken from the "Shirt" item definition.
 
 Keep in mind that because "Polo shirt" and "Club shirt" are variations of "Shirt", they&#x27;re restricted to the same option values. If the seller later receives teal polo shirts, they must add "Teal" to the color option set. Prices can be set for each variation, allowing for different styles to have distinct prices. For example, a "Shirt" item with "Polo shirt" and "Club shirt" variations can have the "Polo shirt" priced at $35 and the "Club shirt" at $45.
 Link to section Get existing item options
 A seller might have already created a set of standard item options in the Square Dashboard. Before creating new options, you should see whether the option you need is already available.
 Request
 Response
 The following request looks for an existing color item option by querying for item options whose name includes "Color":
 Search catalog objects
 cURL
 
 Link to section Generated item variations
 Your application can create the CatalogItem
, CatalogItemOption
 objects, and CatalogVariations
 objects with a single BatchCatalogUpsert
 call.
 
 To simplify the following examples, the options are limited to "color" and "size", while the CatalogItemOption
 for "Style" is omitted. Additionally, the CatalogItem
 name is updated to "Polo Shirt" for clarity and specificity, replacing the more generic "Shirt".
 Link to section Create item size and color variations using item options
 The following example shows how to create item options similar to the previous example.
 The process starts by using BatchUpsertCatalogObject
 to create two CatalogItemOption
 objects. A CatalogItem
 is then created with nine CatalogItemVariation
 objects nested within it. Each CatalogItemVariation
 has two item option values attached, which specify the colors (red, blue, and yellow) and sizes (small, medium, and large).
 Request
 Response
 Batch upsert catalog objects
 cURL
 
 Item option values are linked to an item variation by referencing the corresponding item_option_ids
 and item_option_value_ids
 in the item_option_values
 attribute of the item variation. This ensures that each variation is accurately associated with its specific options and values.
 Link to section Search for item variations with or without item options
 When an item option is used in an item variation, the display order is determined by the sequence of the associated item option values. The display name for an item variation is created by combining the names of these option values. You must manage the name and order of an item variation through the item option.
 If you&#x27;re not using item options, you can still manage the name and order directly on the item variations. Other attributes, such inventory counts and SKU, are maintained at the item variation level, regardless of whether item options are used.
 Link to section Search for item variations using item options
 The following example searches for the small and red item variation with item options defining the size and color. Notice that the item option values ( Small
 and RED
) are referred to by the respective item option value IDs ( item_option_value_ids
).
 Request
 Response
 Search catalog objects
 cURL
 
 Request
 Response
 To specify the RED
 option value in the search query, set the RED
 item option value ID ( O7XQMPXSMFSGUSATAGARGX3E
) on the item_variation_for_item_option_values_query
 filter.
 Search catalog objects
 cURL
 
 Link to section Search for item variations by attribute name
 The Catalog API supports various query filters to search for catalog objects. The name
 attribute is one of the searchable attributes.
 The following cURL example illustrates how to search for item variations with "small red shirt"
 or "small red"
 set on their names:
 Request
 Response
 Search catalog objects
 cURL
 
 Instead of using the "Small red shirt"
 phrase as a single element of the keywords
 list, you can specify a three-element list in the text_query
 expression as shown. The result is the same.
 Search catalog objects
 cURL
 
 Link to section Less specific text query
 This query example uses only keywords that are common to multiple item variations, regardless of whether the variations were defined with item options.
 In the example catalog, there&#x27;s an item variation (named Small red shirt
) without item options and another item variation (named Small, RED
) with item option values defining the size and color. As a result, this request returns both for the match.
 Request
 Response
 Search catalog objects
 cURL
 
 The order of the query expression list doesn&#x27;t matter and punctuations are ignored.
 On this page Overview Item options and variations Item variation name strategy Item option strategy Search for item variations with or without item options
