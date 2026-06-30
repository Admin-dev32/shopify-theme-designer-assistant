# manage-fulfillments

Source: https://developer.squareup.com/docs/orders-api/fulfillments
Downloaded: 2026-06-30T20:41:09.514Z

---

Order Fulfillments 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Orders Manage Order Fulfillments 
 Applies to: Orders API 
 Learn how to create, update, cancel, and split an order fulfillment. 
 On this page Overview Requirements and limitations Multiple-fulfillment orders SHIPMENT type fulfillment PICKUP type fulfillment DELIVERY type fulfillment Create a fulfillment Update a fulfillment Cancel a fulfillment Split fulfillments Link to section Overview
 A seller might add fulfillment information to an order when it&#x27;s created or updated. They can use Square products or your Orders API-integrated application to manage their fulfillments.
 Did you know?
 If you want to track the progress of order fulfillments that are managed in a Square product, you should subscribe to Orders webhooks for notification of fulfillment events triggered outside of your application.
 The Orders API stores fulfillment information in the Order.fulfillments field (an array of Fulfillment objects). Each Fulfillment
 includes the following:
 uid
 - A Square-assigned unique identifier.
 type
 - The type of fulfillment.
 state
 - Initially, the fulfillment state is PROPOSED
.
 Fulfillment details - Depending on the type
, fulfillment details are stored in pickup_details , shipment_details , or delivery_details .
 The Orders API supports fulfillments of these types:
 DELIVERY
 (Beta)
 PICKUP

 SHIPMENT
 (Beta)
 Link to section Requirements and limitations
 One fulfillment limit - Developers can add only one fulfillment to an order using the Orders API, either during or after creation.
 No fulfillment splitting - All items for an order created with the Orders API must be fulfilled at the same location.
 Limited delivery fulfillment support - Any order you create with the DELIVERY fulfillment type is not available to a seller and not shown in the Square Point of Sale unless you have a formal partnership agreement with Square. Please reach out to your Square Partner Manager to request Beta access. To become an app partner, submit a partnership request .
 Only paid orders are visible - Orders with fulfillments appear on Square products (such as the Square Dashboard and Point of Sale application) only after they&#x27;re paid for. Sellers can then manage fulfillments for these orders using these Square products.
 Immutable fields - Most fulfillment fields are immutable based on the fulfillment state
. Editable fields include: state
 (if the order is being managed through a developer&#x27;s application).
 pickup_details
 fields, such as the pickup_at
 or note
 field.
 recipient
 field, such as address
 or phone_number
.
 shipment_details
 fields, such as tracking_number
 or tracking_url
.
 
 Link to section Multiple-fulfillment orders
 A seller can create orders using your application or through Square products like Square Online. Orders retrieved by your application may have multiple fulfillments, which track the fulfillment of order line items across different seller locations.
 For information about how a seller can create a multiple-fulfillment order using Square, see Manage cross location orders with Square for Retail .
 Note
 If your application retrieves a DELIVERY
 fulfillment order, it cannot access fulfillment delivery_details unless you are a Square partner developer and have signed up for the closed DELIVERY
 Beta. For more information, see DELIVERY type fulfillment .
 If your application lets sellers see the state of any order fulfillments in their Square account, then it should handle cases where the Order.fulfillments
 array contains multiple items. While your application can only create single-fulfillment orders, it has access to fulfillment orders created by Square applications.
 Link to section SHIPMENT type fulfillment
 The following Order
 fragment shows a SHIPMENT
 Fulfillment :
 { 
 "order" : { 
 "id" : "uuVIIBP9Nl8L7xq6MJQayNuo8LdZY" , 
 "location_id" : "S8GWD5R9QB376" , 
 "line_items" : [ 
 …
 ] , 
 "fulfillments" : [ 
 { 
 "type" : "SHIPMENT" , 
 "shipment_details" : { 
 "recipient" : { 
 "display_name" : "John Doe" 
 } 
 } 
 } 
 ] 
 } 
 } 
 The recipient.display_name
 is the only shipment_details field required when a fulfillment is created. Other shipment_details
 fields are optional: carrier
, shipping_note
, shipping_type
, tracking_number
, and tracking_url
.
 Link to section Fulfillment state changes
 As a SHIPMENT
 fulfillment order moves through stages, the fulfillment state is updated and corresponding timestamps are set:
 in_progress_at
 - state changes to RESERVED

 packaged_at
 - state changes to PREPARED

 shipped_at
 - state changes to COMPLETED

 canceled_at
 - state changes to CANCELED

 failed_at
 - state changes to FAILED

 Link to section PICKUP type fulfillment
 This Order
 fragment shows a PICKUP
 Fulfillment scheduled for delivery ASAP but with a 30 minute prep time. Note the pickup_at
 time is 30 minutes after the order is created:
 Request
 Response
 { 
 "order" : { 
 "id" : "sfADX2Xqb8F4uZaFuAp3xlShefbZY" , 
 "location_id" : "S8GWD5R9QB376" , 
 "line_items" : [ 
 … 
 ] , 
 "fulfillments" : [ 
 { 
 "type" : "PICKUP" , 
 "state" : "PROPOSED" , 
 "uid" : "pickup1" , 
 "pickup_details" : { 
 "schedule_type" : "ASAP" , 
 "prep_time_duration" : "PT30M15S" , 
 "recipient" : { 
 "customer_id" : "{{customer_id}}" 
 } 
 } 
 } 
 ] , 
 } 
 } 
 The pickup_at
 and recipient.display_name
 fields are the only pickup_details fields required when creating a fulfillment. The following apply for the other pickup_details
 fields:
 The schedule_type
 value determines the following: If set to SCHEDULED
, pickup_at
 is required.
 If set to ASAP
, prep_time_duration
 or pickup_at
 is required.
 
 These fields can only be set while the order fulfillment state
 is PROPOSED
: expires_at
, auto_complete_duration
, prep_time_duration
, and schedule_type
.
 Link to section Prep time duration
 A scheduled order does not move to the &#x27;Active&#x27; tab in Order Manager (and show up on a KDS or print from kitchen printers) until pickup time minus prep time . Although prep_time_duration
 is not required for the SCHEDULED
 type, Square recommends that your application sets the value. If a prep time is not provided, a SCHEDULED
 order becomes active immediately — behaving the same as an ASAP
 order — rather than waiting until the scheduled pickup time.
 If the schedule_type
 is ASAP
 and the prep_time_duration
 is set then Square sets the pickup_at
 time to now plus prep_time_duration
. If your application sets pickup_at
 for an ASAP
 pickup, prep_time_duration
 is ignored even if you&#x27;ve set that value too.
 Link to section Fulfillment state changes
 As a PICKUP
 fulfillment order moves through stages, the fulfillment state is updated and corresponding timestamps are set:
 accepted_at
 - The state changes to RESERVED

 ready_at
 - The state changes to PREPARED

 pick_up_at
 - The state changes to COMPLETED
.
 canceled_at
 - The state changes to CANCELED

 rejected_at
 - The state changes to FAILED

 Link to section DELIVERY type fulfillment
 This is a restricted (closed) Beta. You need to be a Square partner developer and have signed up for the closed DELIVERY
 Beta. Please reach out to your Square Partner Manager to request Beta access. To become an app partner, submit a partnership request .
 Important
 Requests to create a DELIVERY
 fulfillment order succeed with a 200 response even if you don&#x27;t have a partnership agreement and are enrolled in the delivery beta program. However, the delivery order you create cannot be accessed by a seller and does not appear in the Square Order Manager.
 This Order
 fragment shows a DELIVERY
 fulfillment:
 { 
 "order" : { 
 "id" : "MgVVrx8GhOy4K7LO7LtYwgM3RUaZY" , 
 "location_id" : "7WQ0KXC8ZSD90" , 
 "line_items" : [ 
 { 
 } 
 ] , 
 "fulfillments" : [ 
 { 
 "uid" : "uYJmomsp8OjA2iY8PZR2IC" , 
 "type" : "DELIVERY" , 
 "state" : "PROPOSED" , 
 "delivery_details" : { 
 "recipient" : { 
 "display_name" : "John Doe" , 
 "phone_number" : "2065129261" , 
 "address" : { 
 "address_line_1" : "111 Maple" , 
 "locality" : "Seattle" 
 } 
 } , 
 "deliver_at" : "2022-05-25T20:59:33.123Z" 
 } 
 } 
 ] 
 "state" : "OPEN" , 
 "version" : 1 , 
 } 
 } 
 Note the following about delivery_details :
 Link to section Required delivery fields
 The following information is required when creating a delivery fulfillment:
 recipient
 details - The display_name
, address
, and phone_number
 are required if there&#x27;s no third-party managing delivery ( managed_delivery
 is set to false
).
 schedule_type
 - It can be set to SCHEDULED
 (default) or ASAP
.
 deliver_at
 - If schedule_type
 is set to ASAP
, this field is automatically set to the time the order is created plus the prep_time_duration
. This field is required when schedule_type
 is set to SCHEDULED
.
 Link to section Optional delivery fields
 Applications can provide optional delivery_detail
 information, such as:
 prep_time_duration
. The time it takes to prepare and deliver the fulfillment.
 A combination of deliver_at
 and delivery_window_duration
 identifying the order delivery window.
 Courier information (such as courier_provider_name
, courier_support_phone_number
, and the combination of courier_pickup_at
 and courier_pickup_window_duration
 identifying the courier pickup window).
 Other information (such as optional drop-off notes and whether the delivery is a no-contact delivery).
 Link to section Third-party managed delivery
 For a delivery managed by a third party:
 Set the managed_delivery
 field to true
. This makes the recipient information optional, such as display_name
 and address
.
 The courier_provider_name
 and courier_support_phone_number
 fields are required.
 Link to section Fulfillment state changes
 As an order moves through stages of fulfillment, the state of the fulfillment is updated and corresponding timestamps are set:
 delivery_details.in_progress_at
 - The state changes to RESERVED

 delivery_details.ready_at
 - The state changes to PREPARED

 delivery_details.canceled_at
 - The state changes to CANCELED

 delivery_details.rejected_at
 - The state changes to FAILED

 delivery_details.completed_at
 - The state changes to COMPLETED
.
 Link to section Create a fulfillment
 Applications can create an order with fulfillment or first create an order and later update the order to include fulfillment.
 Link to section Example 1: Create an order with fulfillment
 This example is a CreateOrder request that creates an order for four sandwiches. The order includes fulfillment details. The order type is a PICKUP
 order and the customer, John Doe, has selected curbside pickup at a specific time.
 Create order
 cURL
 
 The following is an example response fragment:
 { 
 "order" : { 
 "id" : "sfADX2Xqb8F4uZaFuAp3xlShefbZY" , 
 "location_id" : "S8GWD5R9QB376" , 
 "line_items" : [ 
 { 
 "uid" : "U0PzEdJgoOPWE7AxvCRldC" , 
 "quantity" : "4" , 
 "name" : "Sandwich" , 
 "base_price_money" : { 
 "amount" : 1500 , 
 "currency" : "USD" 
 } , 
 "note" : "ad hoc item" , 
 "gross_sales_money" : { 
 "amount" : 6000 , 
 "currency" : "USD" 
 } , 
 …
 ] , 
 "fulfillments" : [ 
 { 
 "uid" : "VnDwb1Yu42mMjrPEWHLYW" , 
 "type" : "PICKUP" , 
 "state" : "PROPOSED" , 
 "pickup_details" : { 
 "pickup_at" : "2022-02-12T23:00:00.000Z" , 
 "recipient" : { 
 "display_name" : "John Doe" , 
 "phone_number" : "111-111-1111" 
 } , 
 "is_curbside_pickup" : true 
 } 
 } 
 ] , 
 …
 } 
 } 
 Link to section Example 2: Create an order and update the order to add fulfillment
 In this example, you create an order and then update the order to add fulfillment. Note that you cannot add a fulfillment if the order state
 is COMPLETED
.
 Call CreateOrder
 to create an order without a fulfillment.
 Create order
 cURL

 Call UpdateOrder
 to update the order and add fulfillment details. The example adds the PICKUP
 type fulfillment to the order.
 Update order
 cURL

 Note
 To view the fulfillments for an existing order, call RetrieveOrder . The fulfillments appear in the Order.fulfillments object of the RetrieveOrder
 response.
 Link to section Update a fulfillment
 In the current implementation, there are limitations to updating fulfillments using the Orders API. For more information, see Guidelines and limitations .
 Note
 If you&#x27;re attempting to update a fulfillment to set its state to COMPLETE
, all payments on the order must already be complete. For information about completing payments on a order, see Using the Orders API PayOrder endpoint .
 Suppose you created an order for an ad hoc item. The following UpdateOrder
 example updates the fulfillment state, recipient display name, pickup detail note, and recipient display name:
 Update order
 cURL
 
 The following is an example response fragment:
 { 
 "order" : { 
 "id" : "sfADX2Xqb8F4uZaFuAp3xlShefbZY" , 
 "location_id" : "S8GWD5R9QB376" , 
 "line_items" : [ 
 { 
 …
 } 
 ] , 
 "fulfillments" : [ 
 { 
 "uid" : "VnDwb1Yu42mMjrPEWHLYW" , 
 "type" : "PICKUP" , 
 "state" : "PREPARED" , 
 "pickup_details" : { 
 "pickup_at" : "2022-02-12T23:00:00.000Z" , 
 "note" : "updated note" , 
 "accepted_at" : "2022-02-26T00:24:07.316Z" , 
 "ready_at" : "2022-02-26T00:24:07.316Z" , 
 "recipient" : { 
 "display_name" : "Jane Doe" , 
 "phone_number" : "111-111-1111" 
 } , 
 "is_curbside_pickup" : true 
 } 
 } 
 ] , 
 …
 "version" : 2 , 
 } 
 } 
 Link to section Best practices for updating a DELIVERY type fulfillment
 A DELIVERY
 type fulfillment completes when the items are delivered to the buyer. However, there are times when a seller (or deliver service) cancels the fulfillment or the fulfillment fails to complete. The following are the suggested best practices for an application to update an order as the DELIVERY
 type fulfillment progresses:
 Fulfillment item is delivered 
 Before attempting to set a fulfillment.state
 to COMPLETED
, the order must be paid for.
 If the fulfillment.state
 isn&#x27;t COMPLETED
: Set FulfillmentDeliveryDetails.delivered_at
 to the timestamp when delivery occurred.
 Set fulfillment.state
 to COMPLETED
.
 Set order.state
 to COMPLETED
 if no other fulfillments are pending and all payments on the order have been completed.
 
 If the fulfillment.state
 is COMPLETED
 (this can happen if a seller marks it as COMPLETED
 after they hand off the goods to the delivery service but before the delivery is completed): The application can update delivered_at
 after a fulfillment is marked as COMPLETED
 but before the order state
 is COMPLETED
. If deliver_at
 cannot be updated, the application might save the delivered_at
 timestamp as a note in the order.fulfillments.delivery_details.note
 field.
 Set order.state
 to COMPLETED
 if no other fulfillments are pending and all payments on the order have been completed.
 
 Fulfillment is canceled by the seller or delivery service 
 Specify the cancellation reason in the FulfillmentDeliveryDetails.notes
 field.

 Set order.state
 to COMPLETED
 if no other fulfillments are pending.

 Set order.state
 to COMPLETED
 or CANCELED
. Note that you cannot set order.state
 to CANCELED
 if:
 A completed payment exists on the order.
 The order contains a completed fulfillment. The seller needs to perform a refund in Square Point of Sale if necessary after the order is COMPLETED
.
 Note that order.state
 cannot be set to CANCELED
 if the order contains a completed fulfillment. The seller needs to perform a refund in Square Point of Sale if necessary after the order is COMPLETED
.

 Fulfillment fails to complete 
 Specify a reason why the fulfillment failed in the FulfillmentDeliveryDetails.notes
 field.

 Set fulfillment.state
 to FAILED
.

 Set order.state
 to COMPLETED
 if all payments on the order have been completed.
 Note that order.state
 cannot be set to CANCELED
 if the order contains a completed fulfillment. The seller needs to perform a refund in Square Point of Sale if necessary after the order is COMPLETED
.

 Link to section Cancel a fulfillment
 You cannot delete a fulfillment from an order. You can only cancel a fulfillment using the UpdateOrder
 endpoint as shown:
 curl https://connect.squareupsandbox.com/v2/orders/ { ORDER_ID } \ 
 -X PUT \ 
 -H &#x27;Square-Version: 2022-09-21&#x27; \ 
 -H &#x27;Authorization: Bearer {ACCESS_TOKEN}&#x27; \ 
 -H &#x27;Content-Type: application/json&#x27; \ 
 -d &#x27;{
 "idempotency_key": "{UNIQUE_KEY}",
 "order": {
 "version": 2,
 "fulfillments": [
 {
 "uid": "{FULFILLMENT_UID}",
 "state": "CANCELED"
 }
 ]
 }
 }&#x27; 
 In the request, provide the Order
 object with the following information in the request body:
 The version
 of the order.
 The fulfillments
 array identifying the fulfillment to be canceled. Provide the fulfillment UID being updated and set the value of state
 to CANCELED
.
 Did you know?
 An order cannot be canceled if its fulfillments are not in a CANCELED
 state.
 Link to section Split fulfillments
 A seller might split a fulfillment using Square products. The Orders API can retrieve these split fulfillments. For example, the Order.fulfillments object includes two fields ( entries
 and line_item_application
) that applications can use to determine which line items belong to which fulfillment.
 On this page Overview Requirements and limitations Multiple-fulfillment orders SHIPMENT type fulfillment PICKUP type fulfillment DELIVERY type fulfillment Create a fulfillment Update a fulfillment Cancel a fulfillment Split fulfillments
