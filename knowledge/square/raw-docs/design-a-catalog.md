# design-a-catalog

Source: https://developer.squareup.com/docs/catalog-api/design-a-catalog
Downloaded: 2026-06-30T20:40:55.205Z

---

Design a Catalog 
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Docs
 Docs Home Dev Essentials Payments Commerce Customers Staff Merchants Release notes Overview Orders Create Orders Update Orders Search Orders Retrieve Orders Apply Catalog Taxes and Discounts Apply Square-Defined Discounts Apply Catalog Taxes to Orders Order Price Adjustments Order Discounts Order Taxes Order Service Charges Pay for Orders Refunds and Exchanges Manage Fulfillments How It Works Order-Ahead Use Case Order-Ahead Sample App Get Developer Credentials Configure the Sample Application Generate Test Catalog Items Take a Pickup Order Verify a Pickup Order Metadata Order Custom Attributes Define Custom Attributes Use Custom Attributes Catalog Design a Catalog Add a Catalog Item Update Catalog Objects Retrieve Catalog Objects Search a Catalog Call SearchCatalogItems Call SearchCatalogObjects Synchronize Catalog with External Platform Archive Catalog Items Delete Catalog Objects Categorize Catalog Items Manage Menus Enable Modifiers on Items Use Item Options Work with Images Upload and Attach Images Manage Images Add Custom Attributes Configure Discounts Create Volume Discounts Create Bundled Discounts Create Time-Based Discounts Create Customer Group Discounts Configure Quick Payments Sync Your External Catalog Inventory Process Flow Build an Inventory Enable Stock Conversion Reconcile Inventory Counts Retrieve Inventory Counts Inspect Inventory Changes Monitor Sold-out Item Variations Handle Inventory Events Migrate to Updated API Entities Transfer Orders Manage Transfer Orders Inventory Management Reporting Transfer Order Webhooks Bookings Basic Concepts Onboard to Square Appointments Create and Manage Bookings Handle Event Notifications Booking Custom Attributes Manage Custom Attribute Definitions for Bookings Manage Custom Attributes for Bookings Vendors Create Vendors Update Vendors Retrieve Vendors Search for Vendors Receive Vendors Events Square Online Sites API Use the Sites API Snippets API Use the Snippets API Add a Snippet to a Site Cash Drawer Shifts Channels /
 Commerce /
 Catalog Design a Catalog
 Applies to: Catalog API 
 Learn about items, item variations, and item modifiers and how to use them when designing a product catalog. 
 On this page Catalog object types Designing a product catalog See also Link to section Catalog object types
 The Catalog API exposes Square catalog data entries as objects of the CatalogObject type. CatalogObject
 is a generic wrapper for all the classes across the catalog object model. A specific CatalogObject
 instance is of a specific type with a matching set of data. It&#x27;s an error to set unmatched data on a given type of catalog objects.
 For examples of catalog objects of specific types, see Catalog API types . You can follow this pattern to determine which data property on the CatalogObject
 instance to use for defining data of a given type.
 Object types include:
 Items 
 Variations 
 Modifiers 
 Categories 
 Discounts 
 Pricing Rules 
 Taxes 
 Quick amount settings 
 Custom attributes 
 Link to section Items
 A catalog item ( CatalogItem
) represents a product for sale (such as a latte) or a service for hire (such as dog walking). Generally speaking, catalog items can represent:
 Digital items (such as a PDF printable item).
 Event items (such as a concert or show).
 Food and beverage items (such as coffee and donuts).
 Physical items (such as shirts and pants).
 Services (such as personal training and dog walking).
 Donations and dues (such as artistic patronage and club memberships).
 A CatalogItem
 doesn&#x27;t have a price or SKU. Instead, it contains one or more variations that have prices and SKUs. Catalog items represent products you can sell, while item variations represent those product items but with specifics such as physical attributes, price, and SKU. Item examples are shown in the following table.
 Seller offering Catalog item 
 Hot caffeinated drinks Coffee
 Mocha
 Espresso
 
 Pet care Dog walking
 Grooming
 Training
 
 Link to section Variations
 A CatalogItemVariation represents the specific details of the product being sold (e.g., a medium coffee for $2). Item variations often have an SKU and a price. Examples of variations for "Coffee" and "Dog Walking" items are shown in the following table.
 Catalog item Variation 
 Coffee Large
 Medium
 Small
 
 Dog walking 60-minute session
 90-minute session
 
 A CatalogItem must have at least one variation ( CatalogItemVariation
) before it can be added to a purchase or used in a transaction. The item can have no more than 250 variations. Item variations are added to a catalog item as nested objects assigned to the variations
 property of the CatalogItem
 instance.
 In the Point of Sale app and Square Dashboard, items with only one variation show the variation&#x27;s price and SKU as properties of the item. When a second variation is added, the variations appear as a list of prices and SKUs within the item.
 Different versions of a given product might:
 Have different SKUs.
 Have different prices.
 Only be offered in specific store locations.
 Be offered in specific quantities based on location.
 Link to section Modifiers
 Modifiers allow customization of an order line item at purchase. They enable flexible product configuration without requiring separate catalog items for every possible combination. There are two types: text-based and list-based modifiers.
 Link to section Text-based modifiers
 Text-based modifiers allow buyers to provide custom text input. For example, custom text printed or embroidered onto a piece of clothing, personalized gift messages, or custom engraving. These modifiers are represented by a CatalogModifierList object with its modifier_type
 set to TEXT
.
 Link to section List-based modifiers
 List-based modifiers present buyers with predefined customization options. They&#x27;re represented by CatalogModifier objects grouped into a CatalogModifierList object with its modifier_type
 set to LIST
. These modifiers can have an associated price but no SKU.
 Use modifier lists to group modifiers, control the quantities of modifiers that can be added to an item, and set selection limits or requirements. For more information, see Enable Product Customization with Modifiers .
 Catalog item Modifier list Example 
 Latte Milk type: Whole
 2%
 Almond
 Coconut
 Soy
 Single selection required
 No quantities allowed
 Upcharge for non-dairy milk
 
 Large pizza Toppings: Pepperoni
 Mushrooms
 Bell pepper
 Jalapeño pepper
 Pineapple
 Extra cheese
 Any number of toppings allowed
 Can request double portions of a topping
 Each topping has a set price
 
 Link to section Categories
 Catalog categories ( CatalogCategory ) provide a basic structure for organizing catalog items. They assist sellers in organizing their inventory, enhancing operational efficiency, and providing a user-friendly shopping experience. Categories appear on the Categories page in the Square Dashboard and the Categories tab in the Point of Sale app.
 To assign an item to a category, add the category ID and its position among items in the category to the categories list of the CatalogItem . Your application should let a seller set the item position. If an item belongs to multiple categories, the seller might prioritize its position differently in each category.
 Did you know?
 Only CatalogItem
 objects can be assigned to categories. Other types such as taxes, discounts, pricing rules, and product sets cannot be categorized because they are not for-sale items and do not appear in the item list of the Square Dashboard or Point of Sale.
 Link to section Discounts
 The CatalogDiscount object provides information for reducing the total price of an order. Discounts can be a fixed value, a percentage, or a dynamic value entered at the time of sale.
 Discounts are listed on the Discounts page of the Square Dashboard and on the Discounts tab of the items library in the Square Point of Sale application.
 Link to section Pricing rules
 The CatalogPricingRule defines how discounts are automatically applied to orders or purchases:
 During a specified time with a CatalogTimePeriod to define the discount period
 On bundled products or services with a CatalogProductSet 
 For multiple sale items with a CatalogProductSet
.
 For more information, see Automatically Apply Discounts .
 Link to section Taxes
 The CatalogTax object is used for calculating taxes on item variations, which are percentage-based and apply to all items in a sale associated with that tax. Each CatalogItem
 comes with default taxes that can be modified by sellers at the time of sale. A new CatalogItem
 does not have any taxes unless a CatalogTax
 object is linked to it. These taxes are displayed on the Taxes page of the Square Dashboard.
 A CatalogTax
 can be either additive or inclusive. An additive tax is added on top of the item price. For instance, a 10% additive tax on a $100 item results in a total of $110. An inclusive tax is already included in the item price. For example, a $100 item with a 10% inclusive tax keeps the total at $100, where the base cost is $90.91 and the tax is $9.09.
 Taxes can be applied during the "subtotal" or "total" phase of payment. Subtotal phase taxes are calculated on the item&#x27;s base cost alone, and this is where most taxes are applied. Total phase taxes are calculated on the base cost plus any taxes from the subtotal phase.
 If a CatalogItem is subject to both additive and inclusive taxes, the additive tax is calculated on the base cost after subtracting the inclusive tax. For example, for a $100 item with a 10% inclusive tax and a 5% additive tax, the 5% additive tax is calculated on the $90.91 base cost.
 For a more detailed look at how taxes and discounts are calculated, see Discounts, service charges, and taxes .
 Link to section Quick amount settings
 To allow custom payments without choosing a catalog item, the Square register lets users enter a custom amount on the checkout screen. The Catalog API allows a seller to define up to three custom payment amounts for this option.
 The CatalogQuickAmountsSettings object defines quick payment amounts for use in a Square Point of Sale (POS) device. When enabled, it shows up to three quick amounts in the specified order. These quick amounts let a seller collect any of three possible payments without selecting an item from the catalog. Sales using quick amounts are reported as custom amounts in the Square Dashboard.
 The three quick amount choices can be set by the seller using the API or calculated by the Catalog API based on the seller&#x27;s order history at that location.
 Link to section Custom attributes
 You can add custom attributes to a Catalog object to store additional information for the catalog.
 Link to section Designing a product catalog
 Designing a product catalog is both an art and a science. Deciding to model a product as an item, an item variation, or an item modifier can be nuanced and depends on the products offered.
 Different business types and sizes use various patterns for creating a product catalog. For example:
 Smaller retail accounts often use basic variations for better tracking and reporting, but few modifiers.
 Food and beverage accounts frequently use item variations and modifiers due to high levels of purchase customization.
 Service businesses extensively use item variations but may not use modifiers, as service customization is usually captured as an item variation.
 Link to section Practical example
 Consider the case where a seller provides personal training and offers the following catalog of services:
 On-site training
 In-home training
 Fitness evaluation
 Nutritional evaluation
 At first glance, it might seem like only the first two products (on-site training and in-home training) need variations.
 Product Variation 
 On-site training Variations include: 30-minute session
 60-minute session
 
 In-home training Variations include: 60-minute session
 90-minute session
 
 Fitness evaluation n/a 
 Nutritional evaluation n/a 
 However, every catalog item must have at least one variation, so this approach doesn&#x27;t work. One solution is to group "Fitness evaluation" and "Nutritional evaluation" under a common offering (Health evaluation) with two variations: one for fitness level and one for nutrition. In this case, we created a generalized evaluation "Health evaluation" item and made the specific kinds of health evaluations into variations. This allows us to define unique values for variation descriptions, prices, booking options, and more.
 Examples are shown in the following table.
 Product Variation 
 On-site training Variations include: 30-minute session
 60-minute session
 
 In-home training Variations include: 60-minute session
 90-minute session
 
 Health evaluation Possible variations include: Fitness evaluation
 Nutritional evaluation
 
 Now consider a situation where some of the evaluations don&#x27;t need to be in person. In this case, it might make more sense to keep the original product listing and add variations based on how the evaluation takes place. Examples are shown in the following table.
 Product Variation 
 On-site training Possible variations include: 30-minute session
 60-minute session
 
 In-home training Possible variations include: 60-minute session
 90-minute session
 
 Fitness evaluation Variation includes: In-person consult
 
 Nutritional evaluation Possible variations include: In-person consult
 Online/VC consult
 
 By default, Square products like the Point of Sale application and the Square Dashboard assign the item variation name "Regular" to items with only one variation. These items are displayed in a simplified view. The following table shows the differences in how Square products display items with one variation versus multiple variations.
 Item One item variation Multiple item variations 
 Item editing The variation name is hidden The variation price, SKU, and inventory counts are inlined into the item. Variations are listed in a table containing the name, SKU, price, and inventory count. 
 Adding to cart The employee isn&#x27;t prompted to select a variation. The employee is prompted to select a variation. 
 Receipts and Square Online pickup tickets Only the item name is printed. The item name and variation name are printed. 
 In general, consider these two questions when deciding if something should be an item variation or an item modifier:
 Does it represent something with a SKU and assigned price? If so, it should probably be an item variation.
 Does it represent a customization that might add a cost to something with a SKU and base price, or a property that could apply to many item variations? If so, it should probably be a modifier.
 Link to section See also
 Build a Simple Catalog 
 Update Catalog Objects 
 Retrieve Catalog Objects 
 Search for Items and Objects 
 On this page Catalog object types Designing a product catalog See also
