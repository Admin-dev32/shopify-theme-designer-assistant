# manage-catalog-images

Source: https://developer.squareup.com/docs/catalog-api/manage-images
Downloaded: 2026-06-30T20:41:06.316Z

---

Manage Images in a Square Catalog 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog /
 Work with Images Manage Images in a Square Catalog
 Applies to: Catalog API 
 Learn how to manage uploaded images using the Catalog API. 
 On this page Overview Replace the image file of a CatalogImage object Attach an uploaded image to an object Detach an image from an attached object Link to section Overview
 After uploading images and possibly attaching them to objects, you can perform the following image-management tasks:
 Call UpdateCatalogImage to replace the image file of an existing CatalogImage object.
 Call UpserCatalogObject to attach an uploaded image to an image-supporting object.
 Call UpsertCatalogObject to rearrange the order of the attached images by reshuffling the elements of the image_ids
 list of the target object.
 Call UpsertCatalogObject to detach an image from an image-supporting object by removing the image object ID from the object&#x27;s image_ids
 list.
 Call DeleteCatalogObject to remove the image object from the catalog and detach the image object from its attached object.
 In the following sections, you learn how to use the Catalog API to perform these tasks in detail.
 Link to section Replace the image file of a CatalogImage object
 To replace the image file of a CatalogImage object with a new image file, call the new UpdateCatalogImage endpoint, supplying the new image file in the input. The result retains the ID and other attributes of the CatalogItem
 object, but swaps the existing image file with the new one. Any attachment of this image object to an image-supporting catalog object remains intact.
 Note
 Updating the image file has no effect on other attributes of the CatalogImage
 object. To modify other mutable attributes of the CatalogImage
 object, call the UpsertCatalogObject endpoint.
 Link to section Request
 The following example shows how to call the UpdateCatalogImage endpoint to replace the existing image file (image_example.png) in the previously created CatalogImage object ( BQC5NCY7VIKL6WQN5MOBJL3V
) with a new image file (image_example_new.png):
 Update catalog image
 cURL
 
 Link to section Response
 The successful response returns the CatalogImage
 object as follows:
 { 
 "image" : { 
 "type" : "IMAGE" , 
 "id" : "BQC5NCY7VIKL6WQN5MOBJL3V" , 
 "updated_at" : "2021-12-15T20:03:45.142Z" , 
 "created_at" : "2021-12-15T05:36:15.441Z" , 
 "version" : 1632168225142 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "image_data" : { 
 "name" : "Image name" , 
 "url" : "https://items-images-staging.s3.us-west-2.amazonaws.com/files/{UNIQUE_IMAGE_ID}/original.png" , 
 "caption" : "Image caption" 
 } 
 } 
 } 
 The resulting image object has an updated version and updated timestamp. If the image file in the request is different from the existing image file, the UNQIQUE_IMAGE_ID
 assumes a new value. If the image file in the request is the same as the existing one, the UQNIUE_IMAGE_ID
 value remains the same.
 Link to section Attach an uploaded image to an object
 Suppose you&#x27;ve uploaded an image file to the catalog. The image file is encapsulated by a CatalogImage
 object. To use the Catalog API to attach the uploaded image to a catalog item, item variation, category or modifier list, call UpsertCatalogObject or BatchUpsertCatalogObjects , specifying a new or existing object and the ID of the catalog image object in the image_ids
 list of the object.
 UpsertCatalogObject
 can be used to create a new catalog object (other than CatalogImage
) or to update attributes of a catalog object (including CatalogImage
).
 Link to section Attach an uploaded image to a new item
 To create a new item and attach an uploaded image (the ID of which is XOMHAUUSKU2XWHRQMXU22LXP
) to it at the same time, call UpsertCatalogObject
 as follows:
 Link to section Request
 Upsert catalog object
 cURL
 
 The specified CatalogItem
 is a new instance because a temporary ID ( #item
) is used.
 Did you know?
 To attach an image to an object using a version prior to 2021-12-15, set the image object ID on the legacy image_id
 attribute, instead of in the image_ids
 list.
 Link to section Response
 The successful response returns the newly created item (of the Square-generated ID of BDWYGZO5QQWWEVFV6PAEP3BS
) with the image_ids
 list containing the specified image object ID ( 7WWYBOW5AYLEWFW62HQX7EP4
).
 { 
 "catalog_object" : { 
 "type" : "ITEM" , 
 "id" : "JOIBESOPRL42QUMKXR57SEQA" , 
 "updated_at" : "2021-12-15T04:14:22.829Z" , 
 "created_at" : "2021-12-15T04:14:22.829Z" , 
 "version" : 1638936862829 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "item_data" : { 
 "name" : "Item with images" , 
 "description" : "test item to attach images to" , 
 "variations" : [ 
 { 
 "type" : "ITEM_VARIATION" , 
 "id" : "7X7ZFRSJAPOIJOYQ2MVGZFXL" , 
 "updated_at" : "2021-12-15T04:14:22.829Z" , 
 "created_at" : "2021-12-15T04:14:22.829Z" , 
 "version" : 1638936862829 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "item_variation_data" : { 
 "item_id" : "JOIBESOPRL42QUMKXR57SEQA" , 
 "name" : "Item for sale" , 
 "ordinal" : 0 , 
 "pricing_type" : "FIXED_PRICING" , 
 "price_money" : { 
 "amount" : 1999 , 
 "currency" : "USD" 
 } , 
 "sellable" : true , 
 "stockable" : true 
 } 
 } 
 ] , 
 "product_type" : "REGULAR" , 
 "image_ids" : [ 
 "XOMHAUUSKU2XWHRQMXU22LXP" 
 ] 
 } 
 } , 
 "id_mappings" : [ 
 { 
 "client_object_id" : "#item" , 
 "object_id" : "JOIBESOPRL42QUMKXR57SEQA" 
 } , 
 { 
 "client_object_id" : "#variation" , 
 "object_id" : "7X7ZFRSJAPOIJOYQ2MVGZFXL" 
 } 
 ] 
 } 
 The specified image object ( XOMHAUUSKU2XWHRQMXU22LXP
) is now attached to the newly created item ( JOIBESOPRL42QUMKXR57SEQA
) as the sole element of the image_ids
 list.
 Link to section Attach an uploaded image to an existing item
 Now, try to attach another uploaded image object ( XOGYYRVXFY7YSUFQG2UOTGUA
) to the previously created item ( JOIBESOPRL42QUMKXR57SEQA
) by appending the new image ID to the item&#x27;s image_ids
 list.
 When calling the UpsertCatalogObject
 endpoint to update a catalog object, you must provide in the input all the required information about the object to be updated, even if some aren&#x27;t changed. One way to do this is to retrieve the catalog item first, make necessary changes to it, and then supply the modified item in the UpsertCatalogObject
 request to complete the update.
 Link to section Request
 In this example, you only need to change the image_ids
 list by appending the new image object ID to it.
 Upsert catalog object
 cURL
 
 Link to section Response
 If successful, the request returns a response similar to the following:
 { 
 "catalog_object" : { 
 "type" : "ITEM" , 
 "id" : "JOIBESOPRL42QUMKXR57SEQA" , 
 "updated_at" : "2021-12-15T04:47:58.833Z" , 
 "created_at" : "2021-12-15T04:14:22.829Z" , 
 "version" : 1638938878833 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "item_data" : { 
 "name" : "Item with images" , 
 "description" : "test item to attach images to" , 
 "variations" : [ 
 { 
 "type" : "ITEM_VARIATION" , 
 "id" : "7X7ZFRSJAPOIJOYQ2MVGZFXL" , 
 "updated_at" : "2021-12-15T04:47:58.833Z" , 
 "created_at" : "2021-12-15T04:14:22.829Z" , 
 "version" : 1638938878833 , 
 "is_deleted" : false , 
 "present_at_all_locations" : true , 
 "item_variation_data" : { 
 "item_id" : "JOIBESOPRL42QUMKXR57SEQA" , 
 "name" : "Item for sale" , 
 "ordinal" : 0 , 
 "pricing_type" : "FIXED_PRICING" , 
 "price_money" : { 
 "amount" : 1999 , 
 "currency" : "USD" 
 } , 
 "sellable" : true , 
 "stockable" : true 
 } 
 } 
 ] , 
 "product_type" : "REGULAR" , 
 "image_ids" : [ 
 "XOMHAUUSKU2XWHRQMXU22LXP" , 
 "XOGYYRVXFY7YSUFQG2UOTGUA" 
 ] 
 } 
 } 
 } 
 The response shows that the new image object ( XOGYYRVXFY7YSUFQG2UOTGUA
) is added to the end of the image_ids
 list. The update operation doesn&#x27;t change the primary image of the item. You could add the new image object to the head of the image_ids
 list, thereby updating the item&#x27;s primary image, as well.
 Link to section Reorder the image list on an item
 When the image_ids
 list already has more than one elements, you can reorder the image_ids
 list on an item or variation by calling the UpsertCatalogObject endpoint on the item while shuffling the elements of the image_ids
 list in the desired order.
 Using the previous example, you can rotate the image_ids
 list of:
 "image_ids" : [ "XOMHAUUSKU2XWHRQMXU22LXP" , "XOGYYRVXFY7YSUFQG2UOTGUA" ] 
 by calling UpsertCatalogObject
 again, while specifying the image_ids
 list of:
 "image_ids" : [ "XOGYYRVXFY7YSUFQG2UOTGUA" , "XOMHAUUSKU2XWHRQMXU22LXP" ] 
 in the input. The reordering makes the image ( XOGYYRVXFY7YSUFQG2UOTGUA
) the primary image of the item.
 Link to section Detach an image from an attached object
 To detach an image from an attached object, you remove the image object ID from the image_ids
 list of the attached catalog object, when calling the UpsertCatalogObject endpoint.
 Setting the image_ids
 list to an empty list or null in the call removes all the images attached to the object. Detached image objects aren&#x27;t deleted from the catalog.
 If you delete an image object attached to a catalog object by calling the DeleteCatalogObject endpoint on the image object ID, the deleted image object ID is also removed from the image_ids
 list of the catalog object. The deleted image is detached from the catalog object.
 On this page Overview Replace the image file of a CatalogImage object Attach an uploaded image to an object Detach an image from an attached object
