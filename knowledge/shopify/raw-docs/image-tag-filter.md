# image-tag-filter

Source: https://shopify.dev/docs/api/liquid/filters/image_tag
Downloaded: 2026-06-30T03:56:14.177Z

---

Liquid filters: image_tag Skip to main content Collapse sidebar 9 1 string | image_tag returns string Generates an HTML <img>
 tag for a given image _url 
 .

 By default, width
 and height
 attributes are added to the <img>
 tag based on the dimensions and aspect ratio from
the image URL. However, you can override these attributes with the width and height 
parameters. If only one parameter is provided, then only that attribute is added.

 9 1 {{ product | image_url : width : 200 | image_tag }} Code {{ product | image_url: width: 200 | image_tag }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width = "200" height = "133" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width="200" height="133">

 Anchor to Lazy loading Lazy loading 
 If you don&#x27;t apply the preload
 attribute to image _tag 
, then loading
 is automatically set to lazy
 for images in sections further down the page.
You shouldn&#x27;t lazy load images above the fold. If the default value doesn&#x27;t work for your theme, then consider writing your own logic using the section.index
 and section.location
 properties. For more information, refer to the section
 object .

 Anchor to `image_tag` and focal points image_tag
 and focal points 
 This filter automatically applies a focal point to the image using the object-position
 CSS style, if focal point coordinates are available. You can also access an image&#x27;s focal point coordinates directly through the focal _point 
 object. Learn how to set a focal point .

 9 1 {{ images [ 'potions-header.png' ] | image_url : width : 300 | image_tag }} Code {{ images[&#x27;potions-header.png&#x27;] | image_url: width: 300 | image_tag }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/potions-header.png?v=1650325393&amp;width=300" alt = "" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/potions-header.png?v=1650325393&amp;width=300 300w" width = "300" height = "173" style = "object-position:1.9231% 9.7917%;" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/potions-header.png?v=1650325393&amp;width=300" alt="" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/potions-header.png?v=1650325393&amp;width=300 300w" width="300" height="173" style="object-position:1.9231% 9.7917%;">

 Anchor to width width 
 9 1 image_url | image_tag : width : number Specify the width
 attribute of the <img>
 tag. You can set the parameter to nil
 to prevent the attribute from being added.

 9 1 2 3 4 5 <!-- With a width --> {{ product | image_url : width : 400 | image_tag : width : 300 }} <!-- With the width set to nil --> {{ product | image_url : width : 400 | image_tag : width : nil }} Code <!-- With a width -->
{{ product | image_url: width: 400 | image_tag: width: 300 }}

<!-- With the width set to nil -->
{{ product | image_url: width: 400 | image_tag: width: nil }}

 Output
 9 1 2 3 4 5 <!-- With a width --> < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=300 300w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" width = "300" > <!-- With the width set to nil --> < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" > Output <!-- With a width -->
<img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=300 300w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" width="300">

<!-- With the width set to nil -->
<img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w">

 Anchor to height height 
 9 1 image_url | image_tag : height : number Specify the height
 attribute of the <img>
 tag. You can set the parameter to nil
 to prevent the attribute from being added.

 9 1 2 3 4 5 <!-- With a height --> {{ product | image_url : width : 400 | image_tag : height : 300 }} <!-- With the height set to nil --> {{ product | image_url : width : 400 | image_tag : height : nil }} Code <!-- With a height -->
{{ product | image_url: width: 400 | image_tag: height: 300 }}

<!-- With the height set to nil -->
{{ product | image_url: width: 400 | image_tag: height: nil }}

 Output
 9 1 2 3 4 5 <!-- With a height --> < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" height = "300" > <!-- With the height set to nil --> < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" > Output <!-- With a height -->
<img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w" height="300">

<!-- With the height set to nil -->
<img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=352 352w">

 Anchor to sizes sizes 
 9 1 image_url | image_tag : sizes : string Specify source sizes with the HTML sizes
 attribute .

 9 1 {{ product | image_url : width : 200 | image_tag : sizes : '(min-width:1600px) 960px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)' }} Code {{ product | image_url: width: 200 | image_tag: sizes: &#x27;(min-width:1600px) 960px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)&#x27; }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width = "200" height = "133" sizes = "(min-width:1600px) 960px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width="200" height="133" sizes="(min-width:1600px) 960px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)">

 Anchor to widths widths 
 9 1 image_url | image_tag : widths : string By default, Shopify generates a srcset
 with a smart set of default widths up to the maximum defined in the image URL. However, you can create your own set of widths.

 9 1 {{ product | image_url : width : 600 | image_tag : widths : '200, 300, 400' }} Code {{ product | image_url: width: 600 | image_tag: widths: &#x27;200, 300, 400&#x27; }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=600" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=300 300w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400 400w" width = "600" height = "400" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=600" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=300 300w, //polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=400 400w" width="600" height="400">

 Anchor to srcset srcset 
 9 1 image_url | image_tag : srcset : string By default, Shopify generates a srcset
. However, you can create your own srcset
.
The srcset
 parameter takes precedence over the width
 parameter .
You shouldn&#x27;t to use the srcset
 parameter unless you want to remove the attribute by setting the parameter to nil
.

 9 1 {{ product | image_url : width : 200 | image_tag : srcset : nil }} Code {{ product | image_url: width: 200 | image_tag: srcset: nil }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt = "Health potion" width = "200" height = "133" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt="Health potion" width="200" height="133">

 Anchor to preload preload 
 9 1 image_url | image_tag : preload : boolean Specify whether the image should be preloaded.

 When preload
 is set to true
, a resource hint is sent as a Link HTTP header 
with a rel
 value of preload
 .
The Link header also includes imagesrcset
 and imagesizes
 that match the srcset
 and sizes
 attribute of the tag,
where present:

 9 1 2 Link: < IMAGE_URL > ; rel=preload; as=image Link: < IMAGE_URL > ; rel=preload; as=image; imagesrcset=ADDITIONAL_IMAGE_URL 352w; imagesizes=40vw Link: <IMAGE_URL>; rel=preload; as=image
Link: <IMAGE_URL>; rel=preload; as=image; imagesrcset=ADDITIONAL_IMAGE_URL 352w; imagesizes=40vw

 This option doesn&#x27;t affect the HTML img tag directly.

 You should use the preload parameter sparingly. For example, consider preloading only above-the-fold images.
To learn more about resource hints in Shopify themes, refer to Performance best practices for Shopify themes .

 Anchor to alt alt 
 9 1 image_url | image_tag : alt : string By default, the alt
 attribute of the <img>
 tag is set to the media alt text , or the resource title for article, collection, line item, product, and variant images. However, you can override this default, or set the value if there&#x27;s no default.

 9 1 {{ product | image_url : width : 200 | image_tag : alt : "My image's alt text" }} Code {{ product | image_url: width: 200 | image_tag: alt: "My image&#x27;s alt text" }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt = "My image's alt text" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width = "200" height = "133" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt="My image's alt text" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width="200" height="133">

 Anchor to HTML attributes HTML attributes 
 9 1 image_url | image_tag : attribute : string You can specify HTML attributes by adding a parameter that matches the attribute name, and the desired value.

 9 1 {{ product | image_url : width : 200 | image_tag : class : 'custom-class' , loading : 'lazy' }} Code {{ product | image_url: width: 200 | image_tag: class: &#x27;custom-class&#x27;, loading: &#x27;lazy&#x27; }}

 Output
 9 1 < img src = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt = "Health potion" srcset = "//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width = "200" height = "133" loading = "lazy" class = "custom-class" > Output <img src="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200" alt="Health potion" srcset="//polinas-potent-potions.myshopify.com/cdn/shop/files/science-beakers-blue-light-new.jpg?v=1683744744&amp;width=200 200w" width="200" height="133" loading="lazy" class="custom-class">

 Was this page helpful? Yes No
