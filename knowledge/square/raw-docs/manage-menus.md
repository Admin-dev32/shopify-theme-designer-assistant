# manage-menus

Source: https://developer.squareup.com/docs/catalog-api/manage-menus
Downloaded: 2026-06-30T20:41:00.772Z

---

Manage Menus 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Manage Menus
 Applies to: Catalog API 
 Learn how to manage menus with the Catalog API and catalog categories. 
 On this page Overview Requirements Syncing menus with your application Get menu updates Understanding menu categories vs. regular categories Kitchen display names Create a menu Common issues and solutions Implementation tips Link to section Overview
 This guide walks you through syncing menus using the Square Catalog API, for example, to display a seller&#x27;s offerings in your kiosk, mobile application, or online ordering site. You&#x27;ll also learn how to create root menu categories and organize menus for different services, such as breakfast and lunch.
 When a seller creates a menu through the Square Dashboard, the system automatically creates catalog categories with a CategoryType
 of MENU_CATEGORY
. These categories are used to organize items in the seller&#x27;s menu and are distinct from regular catalog categories.
 Key points about menu categories:
 Automatically created when sellers build menus in the Square Dashboard.
 Have a category_type
 of MENU_CATEGORY
.
 Used specifically for menu organization.
 Like regular categories, can have parent-child relationships.
 Can be used across different sales channels .
 Note
 When working with catalog categories, your application needs to handle two distinct types: REGULAR_CATEGORY
 and MENU_CATEGORY
. If your application already has logic that processes REGULAR_CATEGORY
 objects, maintain this logic separately from any new code that handles MENU_CATEGORY
 objects.
 REGULAR_CATEGORY
 objects continue to be essential for critical business operations, including:
 Generating sales reports for menu items.
 Routing orders to kitchen printers.
 Even if you implement support for MENU_CATEGORY
, don&#x27;t remove or modify your existing REGULAR_CATEGORY
 handling. Both category types serve different purposes and should coexist in your application.
 Link to section Requirements
 A Square account with Square Free, Plus, and Premium subscribers with advanced restaurant capabilities added.
 A Square account with full service, quick service, or bar mode enabled in the Square Point of Sale application.
 Your Square application credentials.
 Authorization to use the Square Catalog API .
 Link to section Syncing menus with your application
 When integrating with your application or other external systems, you need an efficient way to sync menu data. This section covers both the initial sync and incremental updates.
 Link to section Get menu channels
 CatalogCategory
 objects handle location visibility differently than other Catalog
 objects. Instead of direct location assignment, they use channels as an abstraction layer:
 Channel objects act as the bridge between menu categories and locations.
 Each Location has a corresponding channel (identified by reference.type = "LOCATION"
).
 Menu categories declare visibility by listing channel IDs in their channels
 array.
 To synchronize menus for a specific location: 
 Get the channel ID for your target location.
 Filter menu categories to include only those referencing that channel.
 Sync only these filtered categories to ensure location-specific accuracy.
 for more information about mapping channels to locations, see Channels API - Menu visibility .
 Link to section Initial sync
 In the following examples, a restaurant creates a breakfast menu and lunch menu. Each menu has a root category and child categories. The breakfast beverages menu has a submenu for coffee drinks.
 To perform a complete menu sync with an external service (such as a delivery platform), you need three specific API calls to get all menu-related catalog objects in the correct hierarchy.
 Link to section Get the root menu categories
 Request
 Response
 First, use SearchCatalogObjects to get all top-level menu categories for the channel you want to sync. The query uses three filters:
 exact_query
 is set to the category type of menu.
 set_query
 is set to the channels you want to return.
 range_query
 limits the returned menu to root menus.
 Search catalog objects
 cURL
 
 This returns CatalogCategory
 objects that are both top-level categories and menu categories. These objects form your root menu structure.
 Note
 The present_at_all_locations
 property might be set to true
 or false
 but because menu visibility is controlled by the channels
 property, this property has no effect.
 Link to section Get the child menu categories
 Get all of the descendants of the root categories.
 Request
 Response
 Next, use SearchCatalogObjects to get all child categories under these root categories:
 Search catalog objects
 cURL
 
 This returns all categories that are both menu categories ( category_type = "MENU_CATEGORY"
) and have their root_category_id
 set to one of the IDs from the first call.
 Link to section Understanding menu category relationships
 When working with menu categories, it&#x27;s important to understand the distinction between parent_category_id
 and root_category_id
:
 Direct parent vs. root category 
 parent_category_id
 indicates the immediate parent of a category.
 root_category_id
 indicates the top-level ancestor of a category.
 These IDs are different if a category is nested multiple levels deep.
 When you make this API call, it shows all categories under a main menu item. For example, in a coffee shop menu:
 Root category: "Breakfast Menu" (ID: 3H3ADZMYJU6U27JYO2PZFANQ
) Parent category: "Beverages" (ID: H5P6BRQKWKL6BDZKIS4FGPSM
) Category: "Coffee-drinks" (ID: ZTVXYFS633S6GSLMHVP5O5IG
)

 { 
 "object" : { 
 "type" : "CATEGORY" , 
 "id" : "ZTVXYFS633S6GSLMHVP5O5IG" , 
 "updated_at" : "2025-06-02T22:04:56.684Z" , 
 "created_at" : "2025-06-02T22:04:56.898Z" , 
 "version" : 1748901896684 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "category_data" : { 
 "name" : "Coffee-drinks" , 
 "image_ids" : [ 
 "BAXRGSINXCHS7RW4ZMQSHGGL" 
 ] , 
 "category_type" : "MENU_CATEGORY" , 
 "parent_category" : { 
 "id" : "H5P6BRQKWKL6BDZKIS4FGPSM" , 
 "ordinal" : -2251731094208512 
 } , 
 "is_top_level" : false , 
 "channels" : [ 
 "CH_IT55vdjtd81xkZvF68NXQqPO54qnOXkyQRkiBQlQuYC" , 
 "CH_leic5ZC8kuuyAVAIQUlxuEG72EYFNBoxFCz5574e9945o" 
 ] , 
 "online_visibility" : false , 
 "root_category" : "3H3ADZMYJU6U27JYO2PZFANQ" 
 } 
 } 
 } 
 To properly reconstruct the menu hierarchy, always check the parent_category_id
 to determine where each category belongs in the structure.
 Link to section Get menu items
 To complete the menu, your application needs to get the items , variations , any modifier lists , images , and other resources related to the items shown on the menus. You can get all this information with a single API call. Note that you need to include the "include_related_objects": true
 query parameter.
 Request
 Response
 Finally, use SearchCatalogObjects to get all items in the categories returned by the previous API call.
 Search catalog objects
 cURL
 
 Link to section Processing the initial sync
 When processing these results, follow this specific order:
 Root categories (from the first call):
 Store the root category IDs.
 Note which are top-level menu categories.
 These form the base of your menu structure.
 
 Child categories (from the second call):
 Link each child category to its parent and root categories.
 Maintain the MENU_CATEGORY
 hierarchy.
 Store these category IDs for the next step.
 
 Items and variations (from the third call):
 Link items to their appropriate categories.
 Process all variations for each item.
 Include any related objects (such as modifiers and images).
 
 Link to section Get menu updates
 To keep your application&#x27;s menu data current with the seller&#x27;s Square catalog, implement a periodic sync strategy to capture various types of menu changes.
 Link to section Types of menu updates
 Item modifications (price, description, or images)
 Menu structure changes (new categories or item reorganization)
 Item availability updates
 New item additions or removals
 To learn about tracking availability updates, see Monitor Sold-out Item Variations or Modifiers .
 You can efficiently track these changes using the updated_at
 timestamp in the SearchCatalogObjects endpoint:
 Link to section Return menu category changes
 Request
 Response
 This example returns all menu categories modified after June 11, 2025, at 7:00 AM:
 Search catalog objects
 cURL
 
 Link to section Return item changes
 After retrieving any changes to the menu structure, you want to get any changes to menu items and related types.
 Request
 Response
 This example retrieves items, variations, images, taxes, discounts, modifiers, and modifier lists. These types are usually defined for menu items and might change frequently. The list of types that you sync might be different.
 This example asks for all changes (including deletions) in these types made after June 10, 2025, at 7:00 PM:
 Search catalog objects
 cURL
 
 Note
 If you include related objects, your result set might include other related objects even if they haven&#x27;t changed.
 Link to section Best practices for menu syncing
 Initial load 
 Perform the initial sync during off-peak hours.
 Process objects in the correct order (categories → items → modifiers).
 Validate relationships as you build the menu structure.
 
 Incremental updates 
 Store the last sync timestamp.
 Include related objects in update queries.
 Handle deleted objects appropriately.
 
 Error handling 
 Implement retry logic for failed requests.
 Log sync errors for troubleshooting.
 Maintain a sync status dashboard.
 
 Data validation 
 Verify category relationships.
 Validate price points.
 Check for required attributes.
 
 Link to section Understanding menu categories vs. regular categories
 When working with the Catalog API, it&#x27;s important to understand the distinction between menu categories and regular categories:
 Menu categories 
 Created through the Square Dashboard&#x27;s menu builder.
 Have category_type = "MENU_CATEGORY"
.
 Used specifically for menu organization.
 Like regular categories, support parent-child relationships.
 Can be synchronized across channels.
 
 Regular categories 
 Created through the Catalog API.
 Have category_type = "REGULAR_CATEGORY"
.
 Used for general item organization.
 Might appear as duplicates of menu categories.
 
 Important
 When retrieving categories through the Catalog API, you might see what appears to be duplicate categories. This happens because the menu builder creates separate menu categories ( MENU_CATEGORY
) from regular categories ( REGULAR_CATEGORY
). To work specifically with menu structures, always filter for categories where category_type = "2" (
MENU_CATEGORY`).
 Link to section Kitchen display names
 For Food & Beverage operations, Square supports separate kitchen display names to streamline back-of-house operations. These properties allow restaurants to use different names for kitchen staff versus customer-facing displays, improving order accuracy and kitchen efficiency.
 Available properties: 
 CatalogItem.kitchen_name - A kitchen-friendly name for the menu item.
 CatalogItem.buyer_facing_name - The customer-facing name displayed to buyers.
 CatalogItemVariation.kitchen_name - Kitchen name for specific item variations (sizes and options).
 CatalogModifier.kitchen_name - Kitchen name for modifiers (such as add-ons and customizations).
 Benefits for restaurant operations: 
 These properties help restaurants:
 Use abbreviated or coded names on kitchen display systems (KDSs).
 Maintain appetizing, descriptive names for customer receipts and online ordering.
 Reduce confusion during food preparation with standardized kitchen terminology.
 Speed up order fulfillment by using familiar kitchen shorthand.
 Support multi-language operations (kitchen names in one language, buyer names in another).
 Example: Creating items with kitchen names 
 Catalog UpsertCatalogObject
 cURL
 
 Example: Adding kitchen names to modifiers 
 Catalog UpsertCatalogObject
 cURL
 
 Best practices for kitchen names: 
 Keep it concise - Kitchen names should be short and easy to read on kitchen display screens.
 Use standard abbreviations - Develop consistent abbreviations your kitchen staff understands.
 Consider screen space - Kitchen display systems often have limited character width.
 Test with staff - Ensure kitchen names are clear and unambiguous to your team.
 Update consistently - When adding new items, maintain your naming conventions.
 Common kitchen name patterns: 
 Customer Name Kitchen Name Purpose 
 Grilled Chicken Caesar Salad GRL CKN CAESAR Abbreviated ingredients 
 Mediterranean Veggie Wrap MED VEG WRAP Shortened descriptors 
 Extra Virgin Olive Oil EVOO Industry standard abbreviations 
 Add Avocado (+$2.00) +AVO Modifier shorthand 
 No Onions NO ONION / -ONION Exclusion indicators 
 Gluten-Free Bun GF BUN Dietary abbreviations 
 Link to section Create a menu
 Link to section 1. Retrieving menu categories
 Use the Catalog API to retrieve existing menu categories.
 Search catalog objects
 cURL
 
 Link to section 2. Creating location-specific menu categories
 When creating categories for different locations, ensure that you:
 Set the correct category_type
.
 Establish proper parent-child relationships.
 Use consistent naming across locations.
 The following shows an example for a delivery service menu category:
 Request
 Response
 Upsert catalog object
 cURL
 
 Note
 Menu objects are automatically enabled across all locations by default. When creating or updating menu objects using the API:
 Set present_at_all_locations
 to true
 or omit it entirely.
 Don&#x27;t set present_at_location_ids
 or absent_at_location_ids
 (leave these fields empty).
 Location-specific menu configuration can only be managed through the Square Dashboard. This includes:
 Enabling or disabling menus for specific locations.
 Setting location-specific menu availability.
 Managing location-based menu variations.
 Link to section 3. Creating subcategories
 When creating subcategories, always reference the parent menu category.
 Request
 Response
 Upsert catalog object
 cURL
 
 Link to section 4. Menu structures
 When working with menu categories, it&#x27;s important to understand that the structure you see in the Square Dashboard is represented by MENU_CATEGORY
 types in the Catalog API. The following example shows how different menu structures might look:
 Link to section Dashboard menu structure
 Restaurant Menu ( MENU_CATEGORY ) 
 ├── Beverages
 │ ├── Non-Alcoholic
 │ │ ├── Iced Tea ( Small/Large ) 
 │ │ ├── Soft Drinks ( Regular/Large ) 
 │ │ └── Coffee ( Small/Large ) 
 │ ├── Beer
 │ │ ├── Draft ( Domestic/Craft ) 
 │ │ └── Bottled ( Domestic/Imported ) 
 │ └── Wine
 │ ├── Red ( Glass/Bottle ) 
 │ └── White ( Glass/Bottle ) 
 ├── Appetizers
 │ ├── Mozzarella Sticks
 │ ├── Wings ( 6pc/12pc ) 
 │ └── Nachos
 └── Entrees
 ├── Sandwiches
 │ ├── Club
 │ └── BLT
 └── Salads
 ├── Caesar
 └── Garden 
 Link to section Delivery service menu structure
 Delivery Menu ( MENU_CATEGORY ) 
 ├── Beverages
 │ ├── Iced Tea ( Small/Large ) 
 │ ├── Soft Drinks ( Regular/Large ) 
 │ └── Coffee ( Small/Large ) 
 ├── Appetizers
 │ ├── Mozzarella Sticks
 │ ├── Wings ( 6pc/12pc ) 
 │ └── Nachos
 └── Entrees
 ├── Sandwiches
 │ ├── Club
 │ └── BLT
 └── Salads
 ├── Caesar
 └── Garden 
 Link to section Common issues and solutions
 Link to section Issue: Duplicate categories
 Cause : Items appearing in both menu and regular categories.
 Solution : Filter specifically for MENU_CATEGORY
 types.
 Prevention : Use proper category type filtering in API calls.
 Link to section Issue: Missing menu items
 Cause : Looking at the wrong category type.
 Solution : Check both menu and regular category associations.
 Prevention : Implement proper category type checking.
 Link to section Issue: Incorrect menu structure
 Cause : Mixing menu and regular categories.
 Solution : Maintain proper parent-child relationships.
 Prevention : Validate category types and relationships.
 Link to section Implementation tips
 Category filtering 
 Search catalog objects
 cURL

 Relationship maintenance 
 Track both menu and regular category IDs.
 Update all relevant category associations.
 Maintain a proper hierarchy.
 
 Data validation 
 Verify category types before updates.
 Check parent-child relationships.
 Validate item associations.
 
 Link to section Next steps after syncing
 Verify data 
 Compare item counts.
 Validate category structures.
 Check modifier associations.
 
 Monitor performance 
 Track sync times.
 Monitor API usage.
 Optimize query patterns.
 
 Setup alerts 
 Configure sync failure notifications.
 Monitor for pricing discrepancies.
 Alert when structure changes occur.
 
 On this page Overview Requirements Syncing menus with your application Get menu updates Understanding menu categories vs. regular categories Kitchen display names Create a menu Common issues and solutions Implementation tips
