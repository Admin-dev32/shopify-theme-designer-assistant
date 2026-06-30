# categorize-catalog-items

Source: https://developer.squareup.com/docs/catalog-api/categorize-catalog-items
Downloaded: 2026-06-30T20:40:59.591Z

---

Categorize Catalog Items 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Categorize Catalog Items
 Applies to: Catalog API 
 Learn how to categorize items in a Square seller&#x27;s catalog. 
 On this page Overview Item categories Create root categories Create nested categories Assign categories to items Retrieve categories Search for categories See also Link to section Overview
 Square allows sellers to list their business products and services as CatalogItem objects, also known as items. For example, if a seller offers t-shirts, dress shirts, and coats, they create a T‑Shirt item, a Dress Shirt item, and a Coat item in their catalog. Similarly, if the seller offers career coaching and professional training, they create a Career Coaching item and a Professional Training item.
 To help manage and display products and services, sellers can categorize items. For example, T‑Shirt, Dress Shirt, and Coat items can be grouped under Clothing. When a customer browses the online store, they can see all items in the Clothing category. T-Shirt and Dress Shirt items can also be grouped under Shirts, allowing customers to browse only t-shirts or dress shirts in that category.
 Important
 When a seller creates their menu through the Square Dashboard, the system automatically creates catalog categories with a CategoryType
 of MENU_CATEGORY
. However, if you&#x27;re also using the Catalog API to manage the seller&#x27;s menu, you might notice what appears to be duplicate categories in their catalog.
 To avoid processing these duplicates in your application:
 When searching for catalog categories using the Catalog API
 Filter for categories where CategoryType = REGULAR_CATEGORY

 This ensures you&#x27;re only working with the standard catalog structure
 Link to section Item categories
 With the Square API, categories are represented by CatalogCategory objects. The CatalogCategory.name field provides a user-friendly name for the category. This name can be used in query filters to search for categories. Each category is identified by its CatalogCategory
 object ID. Categories are global. They cannot be limited to a set of locations.
 An item can be in multiple categories. For example, T-Shirt and Dress Shirt items can be in both Clothing and Shirts categories. A category can also be nested within another category, called its parent category. For example, the Shirts category is nested within the Clothing category. This nesting can continue all the way up to the top-level (or root) category.
 Link to section Work with categories
 Categorizing an item using the Square API involves the following tasks:
 Call BatchUpsertCatalogObjects to create one or more CatalogCategory
 instances and, for a nested category, set its parent category in the parent_category
 field.
 Call UpsertCatalogObject
 to categorize an item by assigning one or more categories to the item&#x27;s categories list. You can do this when you&#x27;re creating or updating the item.
 To work with categories, your application performs some or all of these tasks after you create a category:
 Categorize an item by including a category in the categories
 list.
 Retrieve a category by its ID. The result can show the chain of relationships from the immediate parent category up to the root category.
 Search for categories using query filters.
 The following sections detail how to use the Square API to perform these programming tasks.
 Link to section Create root categories
 Create a root (top-level) category for all clothing-related categories. The following code example creates a root category named Clothing:
 Request
 Response
 Upsert catalog object
 cURL
 
 Note
 A CATEGORY
 is automatically enabled globally. You need to set present_at_all_locations
 to true or leave the property blank. present_at_location_ids
, and absent_at_location_ids
 properties also need to be blank.
 Link to section Create nested categories
 Now that you&#x27;ve created a root category for clothing, create a Shirt category, setting the name
 attribute of the CatalogCategory
 object to Shirts. To nest this category under the Clothing category, set the parent_category
 attribute to reference the ID of the parent category.
 Request
 Response
 Upsert catalog object
 cURL
 
 Link to section Assign categories to items
 Using the Square API, categorizing an item consists of calling UpsertCatalogObject
 to assign an existing category to the item. The item can be a new or existing one.
 Request
 Response
 The following example creates a T-Shirt item of the Clothing and Shirts categories in three variations. Before making the following request, make sure you have the IDs of the Clothing and Shirts categories.
 Upsert catalog object
 cURL
 
 To create the Dress Shirt item (with Small, Medium, and Large variations) and categorize the item as Shirts and Clothing, follow the previous example, changing the name
 and ID
 attributes to align with the dress shirt.
 To create Coat items (also with Small, Medium, and Large variations) and categorize the item as Clothing, follow the previous example, changing the name
 and ID
 attributes to those of the coat and removing the Shirts category from the categories
 list.
 Link to section Retrieve categories
 To get a catalog object, call RetrieveCatalogObject or BatchRetrieveCatalogObjects to retrieve the CatalogCategory
 object of a specific category ID.
 If the category is nested within other categories, you can ask for the category nesting path to be returned as part of the results. To do so, set include_category_path_to_root to true
 in the request.
 When calling RetrieveCatalogObject
, specify the category ID as a path parameter and specify include_category_path_to_root
 as a query parameter.
 When calling BatchRetrieveCatalogObjects
, set the category ID and include_category_path_to_root
 in the payload.
 Request
 Response
 The following example shows how to retrieve a CatalogCategory
 object by calling RetrievingCatalogObject
:
 Retrieve catalog object
 cURL
 
 Link to section Search for categories
 If you don&#x27;t know the IDs of categories, you can find them by calling the SearchCatalogObjects endpoint using supported query filters.
 Link to section Search for nested categories
 To search for categories nested under a parent category, you can use the exact_query
 filter on the nested categories&#x27; parent_category
 attribute to return the categories that match the specified parent category ID.
 The following example finds the categories nested within the Clothing category with the ID of AINQ7RLOYWXL5QLIMLIXT5XF
:
 Request
 Response
 Search catalog objects
 cURL
 
 Link to section Find top-level categories
 Notice that the is_top_level
 attribute is of the Boolean type. However, the Boolean type of filters isn&#x27;t currently supported. As a workaround, you can use a range_query
 filter against the is_top_level
 attribute with the minimum and maximum values both set to 1
 (the integer representation of the logical true
).
 You can further limit the result set with additional query filters.
 Request
 Response
 The following example finds top-level CatalogCategory
 instances named Clothing, using a range_query
 filter to match results by the is_top_level
 attribute of the Boolean type and an exact_query
 filter to further match results by the name
 attribute of the string type.
 Search catalog objects
 cURL
 
 To return nested categories when is_top_level
 is false
, set both attribute_max_value
 and attribute_min_value
 to 0
 (the integer equivalent to the logical false
).
 Link to section Find items of a category
 To find items of a category, call SearchCatalogObjects
 for the ITEM
 type of objects while using the set_query
 filter to match the categories
 attribute against the specified category ID.
 Request
 Response
 Search catalog objects
 cURL
 
 Notice that you cannot use additional query filters with the set_query
 filter.
 Link to section See also
 Update Catalog Objects 
 Retrieve Catalog Objects 
 Search Catalog Objects 
 On this page Overview Item categories Create root categories Create nested categories Assign categories to items Retrieve categories Search for categories See also
