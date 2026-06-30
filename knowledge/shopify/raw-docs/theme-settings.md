# theme-settings

Source: https://shopify.dev/docs/storefronts/themes/architecture/settings
Downloaded: 2026-06-30T03:56:07.696Z

---

Settings Skip to main content Collapse sidebar 
 To make it easier for merchants to customize your theme, you can use JSON to create settings that merchants can access through the theme editor .
 You can provide settings at the theme, section, or block level. Settings can be fixed (such as informational elements) or interactive (such as a drop-down menu). Setting values can be static, or use dynamic sources to render contextually appropriate values.
 Exposing settings makes your theme more customizable so it can better express a merchant&#x27;s brand. It also can make your theme more flexible so that you can address various use cases for merchants.

 Anchor to Subtypes Subtypes 
 There are two categories of settings:
 Category Description 
 Input settings Settings that can hold a value, and are configurable by app users. 
 Sidebar settings Settings that can’t hold a value, and aren’t configurable by app users. They’re informational elements that can be used to provide detail and clarity for your input settings. 

 Anchor to Location Location 
 You can create settings in the following places:
 
 config
 > settings_schema.json

 Section files in the sections
 folder, using the the section&#x27;s {% schema %}
 tag 

 9 1 2 3 4 5 6 7 8 9 └── theme ├── config | ├── settings_schema.json | ... ├── sections | ├── main_product.liquid | ├── another_section_file.liquid | ... ... Anchor to settings_schema.json settings_ schema. json 
 The settings_schema.json file controls the content of the Theme settings area of the theme editor. Settings in this file translate to global theme settings, which can be accessed through the Liquid settings object .
 Anchor to Section schema Section schema 
 The section {% schema %}
 tag is where you can create section settings and block settings . Those settings can be accessed through the settings
 attribute of the section
 object and block
 object , respectively.

 Anchor to Schema Schema 
 Settings are defined as a JSON settings
 attribute that&#x27;s parented to the object that the settings apply to. This attribute accepts an array of settings.
Input settings and sidebar settings both use standard schema attributes. You can find detailed descriptions of these attributes in their respective sections:
 
 Input Settings 

 Sidebar settings 

 Most setting types may be conditionally set using the visible_if
 attribute.
 99 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 { ... "settings" : [ { "type" : "header" , "content" : "My settings" } , { "type" : "text" , "id" : "my_id" , "label" : "My setting label" , "default" : "Enter text here" } , { "type" : "select" , "id" : "layout_style" , "label" : "type" , "options" : [ { "value" : "flex" , "label" : "Stack" } , { "value" : "grid" , "label" : "Grid" } ] , "default" : "flex" } , { "type" : "select" , "id" : "content_direction" , "label" : "Direction" , "options" : [ { "value" : "row" , "label" : "Horizontal" } , { "value" : "column" , "label" : "Vertical" } ] , "default" : "column" , "visible_if" : "{{ block.settings.layout_style == 'flex' }}" } ] , ... } 
 
 Anchor to Usage Usage 
 When working with settings, you should familiarize yourself with the following:
 
 Accessing setting values 

 Checking the setting value format 

 Using dynamic sources for settings 

 Anchor to Access settings Access settings 
 Depending on where they were created, you can access settings through the following Liquid objects:
 
 The global settings
 object 

 The section
 object 

 The block
 object 

 Note Settings from the settings
 object can be accessed in Liquid theme assets .
 Note: Settings from the settings
 object can be accessed in Liquid theme assets .
 To access a specific setting, append the id
 attribute of the associated setting to the object that you want to access.
 For example, if you had the following setting implemented in each Liquid object:
 9 1 2 3 4 5 6 { "type" : "text" , "id" : "message" , "label" : "Message" , "default" : "Hello!" } Then the following Liquid would generate the following output:
 9 1 2 3 4 5 6 7 8 // Settings Message: {{ settings . message }} // Section Message: {{ section . settings . message }} // Block Message: {{ block . settings . message }} 9 1 2 3 4 5 6 7 8 // Settings Message: Hello! // Section Message: Hello! // Block Message: Hello! Anchor to Check the format of the setting value Check the format of the setting value 
 When referencing settings, you should always check that the value is in the format that you expect. Any setting without an automatic default value could end up with no value, which translates to an empty string .
 For example, if you have a setting with an id
 of message
, then the following Liquid would generate the following output depending on the value:
 9 1 2 3 4 5 // No value Setting: {{ settings . message }} // With value Setting: {{ settings . message }} 9 1 2 3 4 5 // No value Setting: // With value Setting: Message value You can check whether a value is an empty string with the blank
 operator. For example:
 9 1 2 3 {% unless settings . message == blank %} {{ settings . message }} {% endunless %} Anchor to Resource-based settings Resource-based settings 
 To avoid an empty string, check that the value is in the format that you expect. It&#x27;s possible that no resource was selected, selected resource no longer exists, or the selected resource has been hidden.
 For example, if you have the following page
 type setting:
 9 1 2 3 4 5 { "type" : "page" , "id" : "page" , "label" : "Page" } Then you can check for emptiness like the following:
 9 1 2 3 4 5 6 {% if settings . page != blank %} {{ settings . page . title }} {{ settings . page . content }} {% else %} No page, or invalid page, selected. {% endif %} Tip Resource-based settings didn&#x27;t always return the resource object. To learn more, refer to Legacy resource-based settings .
 Tip: Resource-based settings didn&#x27;t always return the resource object. To learn more, refer to Legacy resource-based settings .
 Anchor to Legacy resource-based settings Legacy resource-based settings 
 In the past, resource-based settings returned the handle of the associated resource, and you had to access the actual object through Liquid using that handle.
 For example, if you had the following product setting, then you would need to access the product object like the following:
 9 1 2 3 4 5 { "type" : "product" , "id" : "product" , "label" : "Product" } 9 1 2 3 4 5 6 7 8 9 {% unless settings . product == blank %} {% assign product = all_products [ settings . product ] %} {% if product %} {{ product . title }} - {{ product . price }} {% else %} No product, or invalid product, selected. {% endif %} {% endunless %} Anchor to Dynamic sources Dynamic sources 
 Settings for sections and blocks included in a JSON template have the option for merchants to connect one or more dynamic sources to the setting , depending on the setting type.
 Learn more about dynamic sources .

 Anchor to Conditional settings Conditional settings 
 Settings can be displayed conditionally by passing a boolean expression to the visible_if
 attribute:
 9 1 "visible_if" : "{{ block.settings.layout_style == 'flex' }}" Not all settings can be conditionally set. The following settings support conditional settings:
 
 All basic input settings 

 All sidebar settings 

 These specialized input settings : 
 
 color 

 color_background 

 color_scheme 

 font_picker 

 html 

 image_picker 

 inline_richtext 

 link_list 

 liquid 

 richtext 

 text_alignment 

 url 

 video 

 video_url 

 Note Conditional settings cannot access runtime context or resolved data source values. While you can check if a setting with a data source has a value , you cannot create conditions based on what that data source resolves to .
 Note: Conditional settings cannot access runtime context or resolved data source values. While you can check if a setting with a data source has a value , you cannot create conditions based on what that data source resolves to .

 Anchor to Platform-controlled settings Platform-controlled settings 
 In the theme editor, Shopify exposes a custom CSS setting at the theme and section level. You can&#x27;t add or hide this setting in your settings schema.
 Any custom CSS that merchants add using this setting is stored in a custom_css
 attribute, either in a JSON template&#x27;s section attribute , or in the settings_data.json platform_customizations
 object.
 This setting is intended to enable users to customize the look and feel of their storefront without editing theme code. As a theme developer, you shouldn&#x27;t add this setting, or edit the value of this setting after it&#x27;s set. Instead, you should use dedicated CSS assets and stylesheet
 Liquid tags , and introduce customization options for CSS in these areas using theme settings .

 Anchor to Translate settings Translate settings 
 You can translate various attributes of the settings schema depending on the online store&#x27;s active language . These translations are stored in schema locale files .

 Was this page helpful? Yes No
