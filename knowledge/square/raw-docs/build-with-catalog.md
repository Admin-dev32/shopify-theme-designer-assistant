# build-with-catalog

Source: https://developer.squareup.com/docs/catalog-api/build-with-catalog
Downloaded: 2026-06-30T20:40:56.407Z

---

Add a Catalog Item 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Add a Catalog Item
 Applies to: Catalog API 
 Learn how to build a simple product catalog for a cafe that serves coffee in small and large sizes, with skim or whole milk. 
 On this page Overview Requirements and limitations Item options and variations Example: Cup of coffee 1. Add a coffee item to a catalog 2. Create a CatalogTax object for the coffee drink 3. Create a modifier list to contain two modifiers 4. Apply the modifier list to the coffee item 5. Verify the catalog you just built Create items with other product types See also Link to section Overview
 The Catalog API manages the item library in the Square Dashboard. Use it to add, update, or delete items. An item is made up of related catalog objects like taxes, modifiers, and options.
 Link to section Requirements and limitations
 You have a Square account enabled for payment processing. If you haven&#x27;t enabled payment processing on your account (or you&#x27;re not sure), visit squareup.com/activation .
 You&#x27;re familiar with HTTPS. If this is your first time working with HTTPS, see TLS and HTTPS before continuing.
 You need a valid access token. You should test with Sandbox credentials whenever possible. For more information, see Access Tokens and Other Square Credentials .
 Link to section Item options and variations
 The Catalog API includes several objects that enable efficient and standardized definitions of item variations in the seller&#x27;s inventory. These objects include the following:
 Items - Generalized items such as "Shirt".
 Item variation - Specific items for sale such as "Polo shirt: Lg, red".
 Item options - Standardized attributes such as color, size, and style.
 To add an item to a seller&#x27;s library, use the UpsertCatalogObject endpoint to create catalog objects for the item (for example, a cup of coffee). For information about using item options to set variation characteristics, see Define Item Variations Using Options .
 Link to section Example: Cup of coffee
 Before selling coffee, the catalog needs an item called "Cup of Coffee" without a size, a price, or modifiers. To charge for the coffee, include variations specifying the size, the price, and any modifiers. Add two variations (Small Coffee and Large Coffee), a CatalogTax object for taxes, and two optional CatalogModifier objects (with Skim Milk and Whole Milk). These include:
 A CatalogItem object named Coffee
 for coffee drinks.
 Two CatalogItemVariation objects named Small
 and Large
 for the coffee drink size variations.
 A CatalogTax object for the sales tax applied when a payment is made on the coffee drink order.
 Two CatalogModifier objects for the two milk choices.
 A CatalogModifierList object to hold the two CatalogModifier objects to apply the milk choices to the coffee item.
 The following steps apply to creating other types of catalog objects, except for image uploads. For details about uploading and attaching images to items, variations, or categories, see Work with Images .
 Link to section 1. Add a coffee item to a catalog
 Important
 When creating an item, you must specify at least one variation. Otherwise, you get an INVALID_REQUEST
 error.
 To add a coffee item to a catalog as a product offering of a seller, call the UpsertCatalogObject endpoint to create a CatalogItem object in the catalog. This is shown in the following REST API example:
 Request
 Response
 Upsert catalog object
 cURL
 
 In this example, the Coffee
 item has two variations ( Small
 and Large
).
 #coffee
 is a temporary ID used as a placeholder for the permanent ID generated by Square. In the same request, you can use this temporary ID to reference the new object. The two variations in this example use #coffee
 to identify their parent item. If created in a separate request, use their Square-generated permanent IDs instead.
 Because the UpsertCatalogObject
 endpoint creates various catalog objects, the data object must match the specified type. For example:
 Item - Set the item_data
 property to a CatalogItem object for the ITEM
 type.
 Item Variation - Set item_variation_data
 to a CatalogItemVariation object for the ITEM_VARIATION
 type.
 Item Discount - Set discount_data
 to a CatalogDiscount object for a DISCOUNT
.
 Warning
 The type
 property must match the {object_type}_data
 property. Otherwise, the request fails.
 Link to section 2. Create a CatalogTax object for the coffee drink
 In most locales, a sales tax must be levied on a sold product. To support taking taxes on an order, you must first create a CatalogTax object to set up the tax to be applied when the payment is made on the order.
 Request
 Response
 The following code example shows how to create a tax object and add it to the catalog:
 Upsert catalog object
 cURL
 
 In this example, the drink tax is 7.5% of the pretax subtotal of an order and it applies to catalog-item-based line items and ad hoc order line items. If you don&#x27;t specify the property, the new tax is created with "applies_to_custom_amounts": true
.
 Link to section Alternative batch operation
 Alternatively, you can combine the calls to create the Coffee
 item with the Small
 and Large
 variations and the Drink Tax
 object into a single call to the BatchUpsertCatalogObjects endpoint, as shown:
 Batch upsert catalog objects
 cURL
 
 In the previous example, note that the catalog item item_data
 property includes the tax_ids
 sub-property:
 "tax_ids" : [ 
 "#sales_tax" 
 ] 
 This property connects the new CatalogTax
 to the CatalogItem
 created in the batch request. In an Orders API CreateOrder request, that tax is automatically applied to the coffee if the CreateOrder
 request includes the pricing_options
 property as shown in the following example:
 "pricing_options" : { 
 "auto_apply_discounts" : false , 
 "auto_apply_taxes" : true 
 } 
 Link to section 3. Create a modifier list to contain two modifiers
 To enable sellers to offer the choices of adding skim milk and whole milk to the coffee drink, you can create two catalog modifiers to apply to the Coffee
 item. One way to add the modifiers is to create a modifier list containing individual modifiers as its entries.
 Request
 Response
 The following example shows how to call the UpsertCatalogObject endpoint to create the CatalogModifierList object with two CatalogModifier objects for Skim Milk
 and Whole Milk
:
 Upsert catalog object
 cURL
 
 For the modifiers in the modifier list to be applied to the Coffee
 item, you must have the resultant modifier list applied to the Coffee
 item, as explained in step 4.
 Link to section 4. Apply the modifier list to the coffee item
 To apply the modifier list created in step 3, call the UpdateItemModifierLists
 endpoint as shown in the following example:
 Request
 Response
 Update item modifier lists
 cURL
 
 Alternatively, you can call the BatchUpsertCatalogObjects endpoint to create a modifier list with appropriate modifier entries and add the modifier list to the Coffee
 item, together with the required item variations, in a single call to create all related CatalogObject instances at once.
 Link to section 5. Verify the catalog you just built
 After building your catalog, you can view and verify it by calling the ListCatalog endpoint to inspect the catalog items. The following request shows an example:
 Request
 Response
 List catalog
 cURL
 
 Link to section Create items with other product types
 Food and beverage
 Donations
 You can set product_type
 to FOOD_AND_BEV
 to create a food and beverage item with product-specific details. This is useful if you want to include details such as the calorie count, ingredients, or dietary preferences.
 For example, the following request recreates the coffee item with an explicit product_type
 of FOOD_AND_BEV
 to contain information about the calorie count and dietary preference in the food_and_beverage_details
 property:
 Request
 Response
 Upsert catalog object
 cURL
 
 Link to section See also
 Video: Sandbox 101: Catalog API Explained 
 Design a Catalog 
 Catalog API 
 Work with Images 
 On this page Overview Requirements and limitations Item options and variations Example: Cup of coffee 1. Add a coffee item to a catalog 2. Create a CatalogTax object for the coffee drink 3. Create a modifier list to contain two modifiers 4. Apply the modifier list to the coffee item 5. Verify the catalog you just built Create items with other product types See also
