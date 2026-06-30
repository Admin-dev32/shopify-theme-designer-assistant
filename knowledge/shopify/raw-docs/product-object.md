# product-object

Source: https://shopify.dev/docs/api/liquid/objects/product
Downloaded: 2026-06-30T03:56:16.487Z

---

Liquid objects: product Skip to main content Collapse sidebar A product in the store.

 Properties
 Anchor to available available boolean Returns true
 if at least one of the variants of the product is available. Returns false
 if not.

 For a variant to be available, it needs to meet one of the following criteria:

 The variant.inventory _quantity 
 is greater than 0.

 The variant.inventory _policy 
 is set to continue
.

 The variant.inventory _management 
 is nil
.

 The variant has an associated delivery profile with a valid shipping rate.

 Anchor to category category taxonomy_category The taxonomy category for the product

 Anchor to collections collections array of collection The collections that the product belongs to.

 Note Collections that aren&#x27;t available on
the Online Store sales channel aren&#x27;t included.
 Note: Collections that aren&#x27;t available on
the Online Store sales channel aren&#x27;t included.
 Note: Collections that aren't <a href="https://help.shopify.com/manual/products/collections/make-collections-available">available</a> on
the Online Store sales channel aren't included.
 Anchor to compare_ at_ price compare_ at_ price number The lowest compare at price of any variants of the product in the currency&#x27;s subunit.

 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to compare_ at_ price_ max compare_ at_ price_ max number The highest compare at price of any variants of the product in the currency&#x27;s subunit.

 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to compare_ at_ price_ min compare_ at_ price_ min number The lowest compare at price of any variants of the product in the currency&#x27;s subunit. This is the same as
 product.compare _at _price 
.

 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to compare_ at_ price_ varies compare_ at_ price_ varies boolean Returns true
 if the variant compare at prices of the product vary. Returns false
 if not.

 Anchor to content content string The description of the product.

 Note This is the same value as product.description
 .
 Note: This is the same value as product.description
 .
 Note: This is the same value as <a href="/docs/api/liquid/objects/product#product-description"><code>product.description</code></a>.
 Anchor to created_ at created_ at string A timestamp for when the product was created.

 Tip Use the date
 filter to format the timestamp.
 Tip: Use the date
 filter to format the timestamp.
 Tip: Use the <a href="/docs/api/liquid/filters/date"><code>date</code> filter</a> to format the timestamp.
 Anchor to description description string The description of the product.

 Note This is the same value as product.content
 .
 Note: This is the same value as product.content
 .
 Note: This is the same value as <a href="/docs/api/liquid/objects/product#product-content"><code>product.content</code></a>.
 Anchor to featured_ image featured_ image image The first (featured) image attached to the product.

 Anchor to featured_ media featured_ media media The first (featured) media attached to the product.

 Note In search results or a filtered collection, the media of the most relevant variant is returned. Relevancy is based on search terms and applied filters.
 Note: In search results or a filtered collection, the media of the most relevant variant is returned. Relevancy is based on search terms and applied filters.
 Note: In search results or a filtered collection, the <a href="/docs/api/liquid/objects/media">media</a> of the most relevant variant is returned. Relevancy is based on search terms and applied filters.
 Tip You can use media filters to output media URLs and displays. To learn about how
to include media in your theme, refer to Support product media .
 Tip: You can use media filters to output media URLs and displays. To learn about how
to include media in your theme, refer to Support product media .
 Tip: You can use <a href="/docs/api/liquid/filters/media-filters">media filters</a> to output media URLs and displays. To learn about how
to include media in your theme, refer to <a href="/themes/product-merchandising/media/support-media">Support product media</a>.
 Anchor to first_ available_ variant first_ available_ variant variant The first available variant of the product.

 For a variant to be available, it needs to meet one of the following criteria:

 The variant.inventory _quantity 
 is greater than 0.

 The variant.inventory _policy 
 is set to continue
.

 The variant.inventory _management 
 is nil
.

 Anchor to gift_ card? gift_ card? boolean Returns true
 if the product is a gift card. Returns false
 if not.

 Anchor to handle handle string The handle of the product.

 Anchor to has_ only_ default_ variant has_ only_ default_ variant boolean Returns true
 if the product doesn&#x27;t have any options. Returns false
 if not.

 Anchor to id id number The ID of the product.

 Anchor to images images array of image The images attached to the product.

 Anchor to media media array of media The media attached to the product, sorted by the date it was added to the product.

 Tip You can use media filters to output media URLs and displays. To learn about how
to include media in your theme, refer to Support product media .
 Tip: You can use media filters to output media URLs and displays. To learn about how
to include media in your theme, refer to Support product media .
 Tip: You can use <a href="/docs/api/liquid/filters/media-filters">media filters</a> to output media URLs and displays. To learn about how
to include media in your theme, refer to <a href="/themes/product-merchandising/media/support-media">Support product media</a>.
 Anchor to metafields metafields The metafields applied to the product.

 Tip To learn about how to create metafields, refer to Create and manage metafields or visit
the Shopify Help Center .
 Tip: To learn about how to create metafields, refer to Create and manage metafields or visit
the Shopify Help Center .
 Tip: To learn about how to create metafields, refer to <a href="/apps/metafields/manage">Create and manage metafields</a> or visit
the <a href="https://help.shopify.com/manual/metafields">Shopify Help Center</a>.
 Anchor to options options array of string The option names of the product.

 Example Output the options You can use the size
 filter with dot notation to determine how many options a product has.

 9 1 2 3 4 5 {% if product . options . size > 0 -%} {% for option in product . options -%} - {{ option }} {%- endfor %} {%- endif %} Code {% if product.options.size > 0 -%}
 {% for option in product.options -%}
 - {{ option }}
 {%- endfor %}
{%- endif %}

 Data {
 "product": {
 "options": [
 "Size",
 "Strength"
 ]
 }
}

 Output
 9 1 2 - Size - Strength Output - Size
- Strength

 Anchor to options_ by_ name options_ by_ name Allows you to access a specific product option by its name.

 Example Output the values for a specific option When accessing a specific option, the name is case-insensitive.

 9 1 2 3 4 5 6 7 8 < label > Strength < select > {%- for value in product . options_by_name [ 'strength' ]. values %} < option > {{ value }} </ option > {%- endfor %} </ select > </ label > Code <label>
 Strength
 <select>
 {%- for value in product.options_by_name[&#x27;strength&#x27;].values %}
 <option>{{ value }}</option>
 {%- endfor %}
 </select>
</label>

 Data {
 "product": {
 "options_by_name": {}
 }
}

 Output
 9 1 2 3 4 5 6 7 8 < label > Strength < select > < option > Low </ option > < option > Medium </ option > < option > High </ option > </ select > </ label > Output <label>
 Strength
 <select>
 <option>Low</option>
 <option>Medium</option>
 <option>High</option>
 </select>
</label>

 Anchor to options_ with_ values options_ with_ values array of product_option The options on the product.

 Anchor to price price number The lowest price of any variants of the product in the currency&#x27;s subunit.

 Note This is the same value as product.price _min 
 .
 Note: This is the same value as product.price _min 
 .
 Note: This is the same value as <a href="/docs/api/liquid/objects/product#product-price_min"><code><span class="PreventFireFoxApplyingGapToWBR">product.price<wbr/>_min</span></code></a>.
 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to price_ max price_ max number The highest price of any variants of the product in the currency&#x27;s subunit.

 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to price_ min price_ min number The lowest price of any variants of the product in the currency&#x27;s subunit.

 Note This is the same value as product.price
 .
 Note: This is the same value as product.price
 .
 Note: This is the same value as <a href="/docs/api/liquid/objects/product#product-price"><code>product.price</code></a>.
 The value is output in the customer&#x27;s local (presentment) currency.

 For currencies without subunits, such as JPY and KRW, tenths and hundredths of a unit are appended. For example, 1000 Japanese yen is output as 100000.

 Tip Use money filters to output a formatted price.
 Tip: Use money filters to output a formatted price.
 Tip: Use <a href="/docs/api/liquid/filters/money-filters">money filters</a> to output a formatted price.
 Anchor to price_ varies price_ varies boolean Returns true
 if the product&#x27;s variant prices vary. Returns false
 if not.

 Anchor to published_ at published_ at string A timestamp for when the product was published.

 Tip Use the date
 filter to format the timestamp.
 Tip: Use the date
 filter to format the timestamp.
 Tip: Use the <a href="/docs/api/liquid/filters/date"><code>date</code> filter</a> to format the timestamp.
 Anchor to quantity_ price_ breaks_ configured? quantity_ price_ breaks_ configured? boolean Returns true
 if the product has at least one variant with quantity price breaks in the current customer context.
Returns false
 if not.

 Anchor to requires_ selling_ plan requires_ selling_ plan boolean Returns true
 if all of the variants of the product require a selling plan. Returns false
 if not.

 Note A variant requires a selling plan if variant.requires _selling _plan 
 
is true
.
 Note: A variant requires a selling plan if variant.requires _selling _plan 
 
is true
.
 Note: A variant requires a selling plan if <a href="/docs/api/liquid/objects/variant#variant-requires_selling_plan"><code><span class="PreventFireFoxApplyingGapToWBR">variant.requires<wbr/>_selling<wbr/>_plan</span></code></a>
is <code>true</code>.
 Anchor to selected_ or_ first_ available_ selling_ plan_ allocation selected_ or_ first_ available_ selling_ plan_ allocation selling_plan_allocation The currently selected, or first available, selling plan allocation.

 The following logic is used to determine which selling plan allocation is returned:

 Selling plan allocation Return criteria 
 The currently selected allocation Returned if a variant and selling plan are selected. The selected variant is determined by the variant
 URL parameter, and the selected selling plan is determined by the selling _plan 
 URL parameter. 
 The first allocation on the first available variant Returned if no allocation is currently selected. 
 The first allocation on the first variant Returned if no allocation is currently selected, and there are no available variants. 
 If the product doesn&#x27;t have any selling plans, then nil
 is returned.

 Anchor to selected_ or_ first_ available_ variant selected_ or_ first_ available_ variant variant The currently selected or first available variant of the product.

 If a variant is selected, it will be returned, regardless of its availability. Otherwise, the first available variant is returned. If no available variant exists, the first variant is returned.

 A selected variant is determined by the following criteria:

 On product pages, it is based on the variant ID set in the variant
 URL parameter.

 In search results and filtered collections, it is the most relevant variant based on search terms and applied filters.

 For a variant to be available, it needs to meet one of the following criteria:

 The variant.inventory _quantity 
 is greater than 0.

 The variant.inventory _policy 
 is set to continue
.

 The variant.inventory _management 
 is nil
.

 Anchor to selected_ selling_ plan selected_ selling_ plan selling_plan The currently selected selling plan.

 If no selling plan is selected, then nil
 is returned.

 Note The selected selling plan is determined by the selling _plan 
 URL parameter.
 Note: The selected selling plan is determined by the selling _plan 
 URL parameter.
 Note: The selected selling plan is determined by the <code><span class="PreventFireFoxApplyingGapToWBR">selling<wbr/>_plan</span></code> URL parameter.
 Anchor to selected_ selling_ plan_ allocation selected_ selling_ plan_ allocation selling_plan_allocation The currently selected selling plan allocation for the currently selected variant.

 If no variant and selling plan are selected, then nil
 is returned.

 Note The selected variant is determined by the variant
 URL parameter, and the selected selling plan is determined by the
 selling _plan 
 URL parameter.
 Note: The selected variant is determined by the variant
 URL parameter, and the selected selling plan is determined by the
 selling _plan 
 URL parameter.
 Note: The selected variant is determined by the <code>variant</code> URL parameter, and the selected selling plan is determined by the
<code><span class="PreventFireFoxApplyingGapToWBR">selling<wbr/>_plan</span></code> URL parameter.
 Anchor to selected_ variant selected_ variant variant The currently selected variant of the product.

 If no variant is currently selected, then nil
 is returned.

 Note On product pages, it is based on the variant ID set in the variant
 URL parameter.
In search results and filtered collections, it is the most relevant variant based on search terms and applied filters.
 Note: On product pages, it is based on the variant ID set in the variant
 URL parameter.
In search results and filtered collections, it is the most relevant variant based on search terms and applied filters.
 Note: On product pages, it is based on the variant ID set in the <code>variant</code> URL parameter.
In search results and filtered collections, it is the most relevant variant based on search terms and applied filters.
 Anchor to selling_ plan_ groups selling_ plan_ groups array of selling_plan_group The selling plan groups that the variants of the product are included in.

 Anchor to tags tags array of string The tags of the product.

 Note The tags are returned in alphabetical order.
 Note: The tags are returned in alphabetical order.
 Note: The tags are returned in alphabetical order.
 Anchor to template_ suffix template_ suffix string The name of the custom template of the product.

 The name doesn&#x27;t include the product.
 prefix, or the file extension ( .json
 or .liquid
).

 If a custom template isn&#x27;t assigned to the product, then nil
 is returned.

 Anchor to title title string The title of the product.

 Anchor to type type string The type of the product.

 Anchor to url url string The relative URL of the product.

 If a product is rendered in search results or a filtered collection, then the URL contains the variant
 parameter of the most relevant variant.

 9 1 /products/gorgeous-wooden-computer?variant=1234567890 /products/gorgeous-wooden-computer?variant=1234567890

 If a product is rendered as a product recommendation , then the URL contains tracking parameters:

 9 1 /products/gorgeous-wooden-computer?pr_choice=default&pr_prod_strat=description&pr_rec_pid=13&pr_ref_pid=17&pr_seq=alternating /products/gorgeous-wooden-computer?pr_choice=default&pr_prod_strat=description&pr_rec_pid=13&pr_ref_pid=17&pr_seq=alternating

 Anchor to variants variants array of variant The variants of the product.

 Note Returns a maximum of 250 variants when unpaginated.
Tip:
Use the paginate tag to choose how many variants to show per page, up to a limit of 50.
 Note: Returns a maximum of 250 variants when unpaginated.
Tip:
Use the paginate tag to choose how many variants to show per page, up to a limit of 50.
 Note: Returns a maximum of 250 variants when unpaginated.
Tip:
Use the <a href="/docs/api/liquid/tags/paginate">paginate</a> tag to choose how many variants to show per page, up to a limit of 50.
 Anchor to variants_ count variants_ count number The total number of variants for the product.

 Anchor to vendor vendor string The vendor of the product.

 99 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 { "available" : true , "category" : { } , "collections" : [ ] , "compare_at_price" : "25.00" , "compare_at_price_max" : "25.00" , "compare_at_price_min" : "25.00" , "compare_at_price_varies" : false , "content" : "<h3>Are you low on health? Well we've got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>" , "created_at" : "2022-04-13 14:46:16 -0400" , "description" : "<h3>Are you low on health? Well we've got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>" , "featured_image" : { } , "featured_media" : { } , "first_available_variant" : { } , "gift_card?" : false , "handle" : "health-potion" , "has_only_default_variant" : false , "id" : 6786188247105 , "images" : [ ] , "media" : [ ] , "metafields" : { } , "options" : [ "Size" , "Strength" ] , "options_by_name" : { } , "options_with_values" : [ ] , "price" : "10.00" , "price_max" : "22.00" , "price_min" : "10.00" , "price_varies" : true , "published_at" : "2022-04-13 14:53:34 -0400" , "quantity_price_breaks_configured?" : false , "requires_selling_plan" : false , "selected_or_first_available_selling_plan_allocation" : { } , "selected_or_first_available_variant" : { } , "selected_selling_plan" : null , "selected_selling_plan_allocation" : null , "selected_variant" : null , "selling_plan_groups" : [ ] , "tags" : [ "healing" ] , "template_suffix" : "" , "title" : "Health potion" , "type" : { } , "url" : { } , "variants" : [ ] , "variants_count" : 9 , "vendor" : "Polina's Potent Potions" } Example {
 "available": true,
 "category": {},
 "collections": [],
 "compare_at_price": "25.00",
 "compare_at_price_max": "25.00",
 "compare_at_price_min": "25.00",
 "compare_at_price_varies": false,
 "content": "<h3>Are you low on health? Well we&#x27;ve got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>",
 "created_at": "2022-04-13 14:46:16 -0400",
 "description": "<h3>Are you low on health? Well we&#x27;ve got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>",
 "featured_image": {},
 "featured_media": {},
 "first_available_variant": {},
 "gift_card?": false,
 "handle": "health-potion",
 "has_only_default_variant": false,
 "id": 6786188247105,
 "images": [],
 "media": [],
 "metafields": {},
 "options": [
 "Size",
 "Strength"
 ],
 "options_by_name": {},
 "options_with_values": [],
 "price": "10.00",
 "price_max": "22.00",
 "price_min": "10.00",
 "price_varies": true,
 "published_at": "2022-04-13 14:53:34 -0400",
 "quantity_price_breaks_configured?": false,
 "requires_selling_plan": false,
 "selected_or_first_available_selling_plan_allocation": {},
 "selected_or_first_available_variant": {},
 "selected_selling_plan": null,
 "selected_selling_plan_allocation": null,
 "selected_variant": null,
 "selling_plan_groups": [],
 "tags": [
 "healing"
 ],
 "template_suffix": "",
 "title": "Health potion",
 "type": {},
 "url": {},
 "variants": [],
 "variants_count": 9,
 "vendor": "Polina&#x27;s Potent Potions"
}

 Anchor to Templates using product 
 Theme architecture product template Theme architecture product template Was this section helpful? Yes No
