# collection-object

Source: https://shopify.dev/docs/api/liquid/objects/collection
Downloaded: 2026-06-30T03:56:15.329Z

---

Liquid objects: collection Skip to main content Collapse sidebar A collection in a store.

 Properties
 Anchor to all_ products_ count all_ products_ count number The total number of products in a collection.

 This includes products that have been filtered out of the current view.

 Tip To display the number of products in a filtered collection, use collection.products _count 
 .
 Tip: To display the number of products in a filtered collection, use collection.products _count 
 .
 Tip: To display the number of products in a filtered collection, use <a href="/docs/api/liquid/objects/collection#collection-products_count"><code><span class="PreventFireFoxApplyingGapToWBR">collection.products<wbr/>_count</span></code></a>.
 Anchor to all_ tags all_ tags array of string All of the tags applied to the products in the collection.

 This includes tags for products that have been filtered out of the current view.
A maximum of 1,000 tags can be returned.

 Tip To display the tags that are currently applied, use collection.tags
 .
 Tip: To display the tags that are currently applied, use collection.tags
 .
 Tip: To display the tags that are currently applied, use <a href="/docs/api/liquid/objects/collection#collection-tags"><code>collection.tags</code></a>.
 Anchor to all_ types all_ types array of string All of the product types in a collection.

 Example Create links to product types Use the link _to _type 
 filter to create links to the product types in a collection.

 9 1 2 3 {% for product_type in collection . all_types -%} {{- product_type | link_to_type }} {%- endfor %} Code {% for product_type in collection.all_types -%}
 {{- product_type | link_to_type }}
{%- endfor %}

 Data {
 "collection": {
 "all_types": [
 "Animals & Pet Supplies",
 "Baking Flavors & Extracts",
 "Cooking & Baking Ingredients",
 "Dried Flowers",
 "Fruits & Vegetables",
 "Seasonings & Spices",
 "Water"
 ]
 }
}

 Output
 9 1 2 3 4 5 6 7 < a href = "/collections/types?q=Animals%20%26%20Pet%20Supplies" title = "Animals &amp; Pet Supplies" > Animals & Pet Supplies </ a > < a href = "/collections/types?q=Baking%20Flavors%20%26%20Extracts" title = "Baking Flavors &amp; Extracts" > Baking Flavors & Extracts </ a > < a href = "/collections/types?q=Cooking%20%26%20Baking%20Ingredients" title = "Cooking &amp; Baking Ingredients" > Cooking & Baking Ingredients </ a > < a href = "/collections/types?q=Dried%20Flowers" title = "Dried Flowers" > Dried Flowers </ a > < a href = "/collections/types?q=Fruits%20%26%20Vegetables" title = "Fruits &amp; Vegetables" > Fruits & Vegetables </ a > < a href = "/collections/types?q=Seasonings%20%26%20Spices" title = "Seasonings &amp; Spices" > Seasonings & Spices </ a > < a href = "/collections/types?q=Water" title = "Water" > Water </ a > Output <a href="/collections/types?q=Animals%20%26%20Pet%20Supplies" title="Animals &amp; Pet Supplies">Animals & Pet Supplies</a>
<a href="/collections/types?q=Baking%20Flavors%20%26%20Extracts" title="Baking Flavors &amp; Extracts">Baking Flavors & Extracts</a>
<a href="/collections/types?q=Cooking%20%26%20Baking%20Ingredients" title="Cooking &amp; Baking Ingredients">Cooking & Baking Ingredients</a>
<a href="/collections/types?q=Dried%20Flowers" title="Dried Flowers">Dried Flowers</a>
<a href="/collections/types?q=Fruits%20%26%20Vegetables" title="Fruits &amp; Vegetables">Fruits & Vegetables</a>
<a href="/collections/types?q=Seasonings%20%26%20Spices" title="Seasonings &amp; Spices">Seasonings & Spices</a>
<a href="/collections/types?q=Water" title="Water">Water</a>

 Anchor to all_ vendors all_ vendors array of string All of the product vendors in a collection.

 Example Create links to vendors Use the link _to _vendor 
 filter to create links to the vendors in a collection.

 9 1 2 3 {% for product_vendor in collection . all_vendors %} {{- product_vendor | link_to_vendor }} {% endfor %} Code {% for product_vendor in collection.all_vendors %}
 {{- product_vendor | link_to_vendor }}
{% endfor %}

 Data {
 "collection": {
 "all_vendors": [
 "Clover&#x27;s Apothecary",
 "Polina&#x27;s Potent Potions",
 "Ted&#x27;s Apothecary Supply"
 ]
 }
}

 Output
 9 1 2 3 4 5 < a href = "/collections/vendors?q=Clover%27s%20Apothecary" title = "Clover's Apothecary" > Clover's Apothecary </ a > < a href = "/collections/vendors?q=Polina%27s%20Potent%20Potions" title = "Polina's Potent Potions" > Polina's Potent Potions </ a > < a href = "/collections/vendors?q=Ted%27s%20Apothecary%20Supply" title = "Ted's Apothecary Supply" > Ted's Apothecary Supply </ a > Output <a href="/collections/vendors?q=Clover%27s%20Apothecary" title="Clover's Apothecary">Clover&#x27;s Apothecary</a>

<a href="/collections/vendors?q=Polina%27s%20Potent%20Potions" title="Polina's Potent Potions">Polina&#x27;s Potent Potions</a>

<a href="/collections/vendors?q=Ted%27s%20Apothecary%20Supply" title="Ted's Apothecary Supply">Ted&#x27;s Apothecary Supply</a>

 Anchor to current_ type current_ type string The product type on a product type collection page.

 You can query for products of a certain type at the /collections /types 
 URL
with a query parameter in the format of ?q=[type]
, where [type]
 is your desired product type.

 Tip The query value is case-insensitive, so shirts
 is equivalent to Shirts
 or SHIRTS
.
 Tip: The query value is case-insensitive, so shirts
 is equivalent to Shirts
 or SHIRTS
.
 Tip: The query value is case-insensitive, so <code>shirts</code> is equivalent to <code>Shirts</code> or <code>SHIRTS</code>.
 Anchor to current_ vendor current_ vendor string The vendor name on a vendor collection page.

 You can query for products from a certain vendor at the /collections /vendors 
 URL
with a query parameter in the format of ?q=[vendor]
, where [vendor]
 is your desired product vendor.

 Tip The query value is case-insensitive, so apparelco
 is equivalent to Apparel Co 
 or APPARELCO
.
 Tip: The query value is case-insensitive, so apparelco
 is equivalent to Apparel Co 
 or APPARELCO
.
 Tip: The query value is case-insensitive, so <code>apparelco</code> is equivalent to <code><span class="PreventFireFoxApplyingGapToWBR">Apparel<wbr/>Co</span></code> or <code>APPARELCO</code>.
 Anchor to default_ sort_ by default_ sort_ by string from a set of values The default sort order of the collection.

 This is set on the collection&#x27;s page in the Shopify admin.

 Possible values 
 manual 
 best-selling 
 title-ascending 
 price-ascending 
 price-descending 
 created-ascending 
 created-descending 
 Anchor to description description string The description of the collection.

 Anchor to featured_ image featured_ image image The featured image for the collection.

 The default is the collection image . If this image isn&#x27;t available, then
Shopify falls back to the featured image of the first product in the collection. If the first product in the collection
doesn&#x27;t have a featured image, then nil
 is returned.

 Anchor to filters filters array of filter The storefront filters that
have been set up on the collection.

 Only filters relevant to the current collection are returned. Filters will be empty for collections that contain over 5000 products.

 To learn about supporting filters in your theme, refer to Support storefront filtering .

 Anchor to handle handle string The handle of the collection.

 Anchor to id id number The ID of the collection.

 Anchor to image image image The image for the collection.

 This image is added on the collection&#x27;s page in the Shopify admin.

 Anchor to metafields metafields array of metafield The metafields applied to the collection.

 Tip To learn about how to create metafields, refer to Create and manage metafields or visit
the Shopify Help Center .
 Tip: To learn about how to create metafields, refer to Create and manage metafields or visit
the Shopify Help Center .
 Tip: To learn about how to create metafields, refer to <a href="/apps/metafields/manage">Create and manage metafields</a> or visit
the <a href="https://help.shopify.com/manual/metafields">Shopify Help Center</a>.
 Anchor to next_ product next_ product product The next product in the collection. Returns nil
 if there&#x27;s no next product.

 This property can be used on the product page to output next
 links.

 Anchor to previous_ product previous_ product product The previous product in the collection. Returns nil
 if there&#x27;s no previous product.

 This property can be used on the product page to output previous
 links.

 Anchor to products products array of product All of the products in the collection.

 Tip Use the paginate tag to choose how many products to show per page, up to a limit of 50.
 Tip: Use the paginate tag to choose how many products to show per page, up to a limit of 50.
 Tip: Use the <a href="/docs/api/liquid/tags/paginate">paginate</a> tag to choose how many products to show per page, up to a limit of 50.
 Anchor to products_ count products_ count number The total number of products in the current view of the collection.

 Anchor to published_ at published_ at string A timestamp for when the collection was published.

 Tip Use the date
 filter to format the timestamp.
 Tip: Use the date
 filter to format the timestamp.
 Tip: Use the <a href="/docs/api/liquid/filters/date"><code>date</code> filter</a> to format the timestamp.
 Anchor to sort_ by sort_ by string The sort order applied to the collection by the sort _by 
 URL parameter.

 If there&#x27;s no sort _by 
 URL parameter, then the value is nil
.

 Anchor to sort_ options sort_ options array of sort_option The available sorting options for the collection.

 Example Output the sort options 99 1 2 3 4 5 6 7 8 9 10 11 12 13 14 {%- assign sort_by = collection . sort_by | default : collection . default_sort_by -%} < select > {%- for option in collection . sort_options %} < option value = " {{ option . value }} " {%- if option . value == sort_by %} selected = "selected" {%- endif %} > {{ option . name }} </ option > {% endfor -%} </ select > Code {%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}

<select>
{%- for option in collection.sort_options %}
 <option
 value="{{ option.value }}"
 {%- if option.value == sort_by %}
 selected="selected"
 {%- endif %}
 >
 {{ option.name }}
 </option>
{% endfor -%}
</select>

 Data {
 "collection": {
 "default_sort_by": "title-ascending",
 "sort_by": "",
 "sort_options": [
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop",
 "CollectionDrop::SortOptionDrop"
 ]
 }
}

 Output
 99 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 < select > < option value = "manual" > Featured </ option > < option value = "most-relevant" > Most relevant </ option > < option value = "best-selling" > Best selling </ option > < option value = "title-ascending" selected = "selected" > Alphabetically, A-Z </ option > < option value = "title-descending" > Alphabetically, Z-A </ option > < option value = "price-ascending" > Price, low to high </ option > < option value = "price-descending" > Price, high to low </ option > < option value = "created-ascending" > Date, old to new </ option > < option value = "created-descending" > Date, new to old </ option > </ select > Output <select>
 <option
 value="manual"
 >
 Featured
 </option>

 <option
 value="most-relevant"
 >
 Most relevant
 </option>

 <option
 value="best-selling"
 >
 Best selling
 </option>

 <option
 value="title-ascending"
 selected="selected"
 >
 Alphabetically, A-Z
 </option>

 <option
 value="title-descending"
 >
 Alphabetically, Z-A
 </option>

 <option
 value="price-ascending"
 >
 Price, low to high
 </option>

 <option
 value="price-descending"
 >
 Price, high to low
 </option>

 <option
 value="created-ascending"
 >
 Date, old to new
 </option>

 <option
 value="created-descending"
 >
 Date, new to old
 </option>
</select>

 Anchor to tags tags array of string The tags that are currently applied to the collection.

 This doesn&#x27;t include tags for products that have been filtered out of the current view.
Returns nil
 if no tags have been applied, or all products with tags have been filtered out of the current view.

 Anchor to template_ suffix template_ suffix string The name of the custom template assigned to the collection.

 The name doesn&#x27;t include the collection.
 prefix, or the file extension ( .json
 or .liquid
).

 If a custom template isn&#x27;t assigned to the collection, then nil
 is returned.

 Anchor to title title string The title of the collection.

 Anchor to url url string The relative URL of the collection.

 99 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 { "all_products_count" : 10 , "all_tags" : [ "Burning" , "dried" , "extracts" , "fresh" , "ingredients" , "plant" , "supplies" ] , "all_types" : [ "Animals & Pet Supplies" , "Baking Flavors & Extracts" , "Cooking & Baking Ingredients" , "Dried Flowers" , "Fruits & Vegetables" , "Seasonings & Spices" , "Water" ] , "all_vendors" : [ "Clover's Apothecary" , "Polina's Potent Potions" , "Ted's Apothecary Supply" ] , "current_type" : null , "current_vendor" : null , "default_sort_by" : "created-ascending" , "description" : "Brew your own potions at home using our fresh, ethically-sourced ingredients." , "featured_image" : { } , "filters" : { } , "handle" : "ingredients" , "id" : 266168401985 , "image" : { } , "metafields" : { } , "next_product" : null , "previous_product" : null , "products" : { } , "products_count" : 1 , "published_at" : "2022-04-19 09:52:18 -0400" , "sort_by" : "" , "sort_options" : [ ] , "tags" : [ "Burning" ] , "template_suffix" : "eight-products-per-page" , "title" : "Ingredients" , "url" : { } } Example {
 "all_products_count": 10,
 "all_tags": [
 "Burning",
 "dried",
 "extracts",
 "fresh",
 "ingredients",
 "plant",
 "supplies"
 ],
 "all_types": [
 "Animals & Pet Supplies",
 "Baking Flavors & Extracts",
 "Cooking & Baking Ingredients",
 "Dried Flowers",
 "Fruits & Vegetables",
 "Seasonings & Spices",
 "Water"
 ],
 "all_vendors": [
 "Clover&#x27;s Apothecary",
 "Polina&#x27;s Potent Potions",
 "Ted&#x27;s Apothecary Supply"
 ],
 "current_type": null,
 "current_vendor": null,
 "default_sort_by": "created-ascending",
 "description": "Brew your own potions at home using our fresh, ethically-sourced ingredients.",
 "featured_image": {},
 "filters": {},
 "handle": "ingredients",
 "id": 266168401985,
 "image": {},
 "metafields": {},
 "next_product": null,
 "previous_product": null,
 "products": {},
 "products_count": 1,
 "published_at": "2022-04-19 09:52:18 -0400",
 "sort_by": "",
 "sort_options": [],
 "tags": [
 "Burning"
 ],
 "template_suffix": "eight-products-per-page",
 "title": "Ingredients",
 "url": {}
}

 Anchor to Templates using collection 
 Theme architecture collection template Theme architecture collection template Was this section helpful? Yes No
