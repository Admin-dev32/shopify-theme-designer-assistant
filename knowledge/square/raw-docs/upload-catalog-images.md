# upload-catalog-images

Source: https://developer.squareup.com/docs/catalog-api/upload-and-attach-images
Downloaded: 2026-06-30T20:41:05.279Z

---

Upload and Attach Images 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog /
 Work with Images Upload and Attach Images
 Applies to: Catalog API 
 Learn how to upload images to a Square catalog and attach them to supporting objects in the catalog. 
 On this page Overview Catalog API image management behaviors Upload and attach an image Upload without attaching Attach an image Attach an image as the primary image Link to section Overview
 Uploading an image file to the catalog involves creating a CatalogImage object, specifying the local path to the image file and, optionally, the name or caption of the image. When creating a CatalogImage
 object, you can also specify the ID of the catalog object you are attaching the image to. This way you can manage to upload an image and attach the uploaded image object to an image-attachable catalog object in a single operation.
 To create a catalog image, call the CreateCatalogImage endpoint. This is different from creating any other types of CatalogObject where you call the UpsertCatalogObject or BatchUpsertCatalogObjects endpoint.
 You can attach an image object to any of the following catalog objects:
 CatalogItem 
 CatalogItemVariation 
 CatalogCategory 
 CatalogModifierList 
 Link to section Catalog API image management behaviors
 Your application business logic should let a seller upload and attach images with these considerations:
 Attach during upload - In the CreateCatalogImage
 request, set the object_id
 parameter to the ID of the catalog object you&#x27;re attaching the image to. If the parameter isn&#x27;t set, the image is unattached when created.
 Attach after upload - To attach the image after it&#x27;s created, use UpsertCatalogObject
 or BatchUpsertCatalogObjects
 to update the image_ids
 list property of the catalog object you&#x27;re attaching the image to.
 Attach to multiple objects - An image that&#x27;s already attached to one object can also be attached to others. Also, multiple images can be attached to the same catalog object using the image_ids
 list.
 Set a primary image - To make an image the primary one, set its ID as the first element in the image_ids
 list and set is_primary
 to true
. For API versions 2021-12-15
 and later, the default for is_primary
 is false
; for earlier versions, it&#x27;s true
. The primary image is displayed in Square first-party products, such as Square Point of Sale and Square Online.
 Duplicate an image check - If you upload an already existing image, no new image is created. The response includes the existing image object.
 Link to section Upload and attach an image
 The following example shows how to call the CreateCatalogImage
 endpoint to upload a local image file (image_example_1.png) as a CatalogImage
 object and attach the resulting image object to an existing CatalogItem
 ( GQKOOBBI4PE3B7MLXDQ7YUSM
) that has one variation and no attached images yet:
 Request
 Response
 Create catalog image
 cURL
 
 Link to section Upload without attaching
 The following example shows how to call the CreateCatalogImage
 endpoint to upload a local image file named image_example.png
 as an unattached CatalogImage
 object:
 Request
 Response
 Create catalog image
 cURL
 
 The filename
 parameter can be an absolute path to the image file, such as "/myapp/data/image_example.png"
. If the folder path (such as "/myapp/data/"
) isn&#x27;t given, the default folder is the working directory where you invoke the command.
 The image
 object is an instance of CatalogImage , also known as an IMAGE
 type of CatalogObject . For the image object, you must set only the image-specific data on the image_data attribute of the CatalogObject
.
 The resulting image object is unattached because the request body doesn&#x27;t specify the object_id
 attribute.
 Link to section Attach an image
 To attach an image to a CatalogItem
, CatalogItemVariation
, CatalogCategory
, or CatalogModifierList
, add the ID of the image to the image_ids
 list property of the catalog object.
 Did you know?
 A single image can be attached to many catalog objects.
 Link to section Get the image and item to update
 The following example retrieves the image to be attached and the catalog item to attach it to. The BatchRetrieveObjects endpoint is used. The catalog item is then modified with the updated image_ids
 property.
 Request
 Response
 The following example retrieves an image ( BQC5NCY7VIKL6WQN5MOBJL3V
) and a catalog item ( GQKOOBBI4PE3B7MLXDQ7YUSM
):
 Batch retrieve catalog objects
 cURL
 
 Link to section Update the catalog item
 To attach the image to the catalog item, the CatalogItem
 is updated to add an image_ids
 property with the ID of the image to attach.
 Request
 Response
 Upsert catalog object
 cURL
 
 Link to section Attach an image as the primary image
 When multiple images are attached to a catalog object, the first element of the image_ids
 list is the primary image of the object. A primary image is displayed when the image-supporting object is processed in Square Point of Sale and the Square Online Store.
 When another image is attached to the catalog object using Square API version 2021-12-15 or later, the new image object ID is appended to the image_ids
 list by default. To attach the new image as a primary image, set the is_primary
 input parameter to true
 when calling CreateCatalogImage
, as shown in the following example:
 Request
 Response
 Create catalog image
 cURL
 
 On this page Overview Catalog API image management behaviors Upload and attach an image Upload without attaching Attach an image Attach an image as the primary image
