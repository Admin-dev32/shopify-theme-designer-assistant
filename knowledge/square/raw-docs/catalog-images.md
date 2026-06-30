# catalog-images

Source: https://developer.squareup.com/docs/catalog-api/cookbook/create-catalog-image
Downloaded: 2026-06-30T20:41:04.203Z

---

Work with Images 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Work with Images
 Applies to: Catalog API 
 Learn about uploading and attaching images to your product catalog with the Catalog API. 
 On this page Overview Requirements and limitations Manage catalog images See also Link to section Overview
 Images are compelling and enable rich online store experiences. You can attach one or more images to Item , Item Variation , Catalog Category , and Modifier List objects. The images provide visual representations of products for sale and services for hire by a seller.
 When you upload an image and attach it to an item such as a Catalog Category, it appears in the Square Dashboard as shown in the following image:
 
 The Catalog API performs the same operation as a seller dragging an image onto the dialog.
 Link to section Requirements and limitations
 An image can use the JPEG, PJPEG, PNG, or GIF format.
 An image file cannot be larger than 15 MB.
 There can be no more than 250 images attached to a catalog object.
 There can be no more than 10,000 unattached images per Square account.
 There can be no more than 5 million images per Square account.
 Link to section Manage catalog images
 The following tasks manage the lifecycle of a catalog image:
 Upload an image - Use the CreateCatalogImage
 endpoint to upload an image file. It&#x27;s stored as a CatalogImage object. An image is attached if its ID is in the image_ids
 list of a catalog object. Otherwise, it&#x27;s unattached.
 Attach an image - Add the image&#x27;s ID to the image_ids
 list of a catalog object using the UpsertCatalogObject endpoint.
 Detach an image - Remove the image&#x27;s ID from the image_ids
 list using the UpsertCatalogObject
 endpoint.
 Update an image file - Use the UpdateCatalogImage
 endpoint with the image object ID and new image file path.
 Update image metadata - Update metadata like name and caption using the UpsertCatalogObject
 endpoint.
 Retrieve attached images - Use the SearchCatalogObjects , RetrieveCatalogObject , or BatchRetrieveCatalogObjects endpoints with the include_related_objects
 property enabled.
 Remove an image - Call the DeleteCatalogObject endpoint with the image object ID to delete it.
 Link to section See also
 Upload and Attach Images 
 Manage Images in a Square Catalog 
 On this page Overview Requirements and limitations Manage catalog images See also
