# Shopify + Square CSV/XLSX Upload Rules

## Purpose

This knowledge file teaches the ChatGPT Project assistant how to safely help with Shopify CSV and Square XLSX/CSV import/export planning for the Shopify Theme Designer Assistant with a Square add-on.

Use this file for planning, review, validation checklists, and safe draft guidance. Do not treat it as permission to create production code, Shopify sections, a Square app, or upload-ready import files without the user's real template and explicit approval.

## Real templates inspected

The following real template files were found in the repository and inspected:

- `templates/square/square-current-item-library-export.xlsx`
- `templates/shopify/shopify-sample-product-csv.csv`

## Missing templates still needed

The following expected/possible template file was not present in the latest local repository state inspected for this knowledge pack:

- `templates/square/square-blank-import-library.xlsx`

## Detected Square export structure

### Workbook inspected

- File name: `square-current-item-library-export.xlsx`
- Path: `templates/square/square-current-item-library-export.xlsx`
- Workbook sheets detected:
  - `Items`
  - `Component Inventory`

### `Items` sheet

- Detected header row: row 2
- Detected columns, in order:
  1. `Reference Handle`
  2. `Token`
  3. `Item Name`
  4. `Customer-facing Name`
  5. `Variation Name`
  6. `SKU`
  7. `Description`
  8. `Categories`
  9. `Reporting Category`
  10. `SEO Title`
  11. `SEO Description`
  12. `Permalink`
  13. `GTIN`
  14. `Square Online Item Visibility`
  15. `Item Type`
  16. `Weight (lb)`
  17. `Social Media Link Title`
  18. `Social Media Link Description`
  19. `Shipping Enabled`
  20. `Self-serve Ordering Enabled`
  21. `Delivery Enabled`
  22. `Pickup Enabled`
  23. `Price`
  24. `Online Sale Price`
  25. `Archived`
  26. `Sellable`
  27. `Contains Alcohol`
  28. `Stockable`
  29. `Auto Add Item to Check`
  30. `Option Name 1`
  31. `Option Value 1`
  32. `Default Unit Cost`
  33. `Default Vendor Name`
  34. `Default Vendor Code`
  35. `Current Quantity ACAI DELIGHT&JUICE BAR`
  36. `New Quantity ACAI DELIGHT&JUICE BAR`
  37. `Stock Alert Enabled ACAI DELIGHT&JUICE BAR`
  38. `Stock Alert Count ACAI DELIGHT&JUICE BAR`
  39. `Modifier Set - Add a 16oz smoothie for +$4.99`
  40. `Modifier Set - Add a small Acai for +4.99`
  41. `Modifier Set - Add a soup`
  42. `Modifier Set - add your toppings`
  43. `Modifier Set - additional fruit toppings`
  44. `Modifier Set - avocado salad size`
  45. `Modifier Set - BOOST IT`
  46. `Modifier Set - Bread Choice`
  47. `Modifier Set - choose protien`
  48. `Modifier Set - CHOOSE YOUR BASE`
  49. `Modifier Set - choose your butter`
  50. `Modifier Set - CHOOSE YOUR FLAVOR`
  51. `Modifier Set - CHOOSE YOUR FRUITE`
  52. `Modifier Set - CHOOSE YOUR JUICE BAE`
  53. `Modifier Set - CHOOSE YOUR VEGGIES`
  54. `Modifier Set - Copy of Juice pricing option`
  55. `Modifier Set - deli topping p`
  56. `Modifier Set - deli toppings`
  57. `Modifier Set - extras`
  58. `Modifier Set - Flavor`
  59. `Modifier Set - fruit subbing free`
  60. `Modifier Set - Hot or Cold Options`
  61. `Modifier Set - ICE CREAM SIZE`
  62. `Modifier Set - juice pricing option - O5YV6FYGMQFSBYT4LT727PZH`
  63. `Modifier Set - Juice pricing option - REBO6QOQQKC6K3H75WMX7HEV`
  64. `Modifier Set - Juice pricing option - U7T4L44JA7QMFLY6DHSNDYMF`
  65. `Modifier Set - Juice pricing option - AEY7ON7WRW4DJ6WMM5F3R3DO`
  66. `Modifier Set - Juice pricing option - I4D2AA7ASCUWZ7U35ZUF2YL5`
  67. `Modifier Set - make it a combo?`
  68. `Modifier Set - NOTICE`
  69. `Modifier Set - Nut butters & Protein`
  70. `Modifier Set - Premium Toppings`
  71. `Modifier Set - Salads Add-ons`
  72. `Modifier Set - Sandwich Choice - Lunch Special`
  73. `Modifier Set - SANDWICH TYPE?`
  74. `Modifier Set - Sandwiches Add-ons`
  75. `Modifier Set - SIZE`
  76. `Modifier Set - smoothie`
  77. `Modifier Set - Smoothies Add-ons`
  78. `Modifier Set - TYPE OF BOWL?`
  79. `Modifier Set - type of honey`
  80. `Modifier Set - TYPE OF SMOOTHIE`

### `Component Inventory` sheet

- Detected header row: row 2
- Detected columns, in order:
  1. `Token\n(locked)`
  2. `Item Name\n(locked)`
  3. `Variation Name\n(locked)`
  4. `Unit and Precision\n(locked)`
  5. `SKU\n(locked)`
  6. `Reference Handle`
  7. `Stock-by Reference Handle`
  8. `Sell-by Equivalent`
  9. `Stock-by Equivalent`

### Square column meaning and risk areas

- Item fields appear as `Item Name`, `Customer-facing Name`, `Description`, `Item Type`, `Archived`, `Sellable`, `Stockable`, `Contains Alcohol`, and `Auto Add Item to Check`.
- Variation fields appear as `Variation Name`, `Option Name 1`, and `Option Value 1`.
- Price fields appear as `Price` and `Online Sale Price`; cost/vendor planning fields appear as `Default Unit Cost`, `Default Vendor Name`, and `Default Vendor Code`.
- SKU fields appear as `SKU` on the `Items` sheet and `SKU\n(locked)` on the `Component Inventory` sheet.
- Category fields appear as `Categories` and `Reporting Category`.
- Modifier fields appear as many `Modifier Set - ...` columns. These represent Square modifier set associations and should not be converted into Shopify-style options or standalone products unless the user explicitly requests a planning-only redesign.
- Tax-related fields are not clearly present as dedicated tax columns in the inspected Square export. Do not invent Square tax columns from this export.
- Image fields are not clearly present as dedicated image URL columns in the inspected Square export. Do not invent image columns from this export.
- Location/inventory fields appear in location-specific quantity and stock alert columns such as `Current Quantity ACAI DELIGHT&JUICE BAR`, `New Quantity ACAI DELIGHT&JUICE BAR`, `Stock Alert Enabled ACAI DELIGHT&JUICE BAR`, and `Stock Alert Count ACAI DELIGHT&JUICE BAR`.
- Enabled/available fields appear as `Shipping Enabled`, `Self-serve Ordering Enabled`, `Delivery Enabled`, `Pickup Enabled`, `Square Online Item Visibility`, `Archived`, `Sellable`, and `Stockable`.
- Token/system/ID fields appear as `Reference Handle`, `Token`, `Permalink`, `GTIN`, and the locked columns on the `Component Inventory` sheet.

### Square columns that should not be changed lightly

Do not change these fields lightly because they may identify existing Square objects, control online availability, affect ordering/payment behavior, or affect catalog integrity:

- `Reference Handle`
- `Token`
- `Permalink`
- `GTIN`
- `SKU`
- `Item Name`
- `Variation Name`
- `Price`
- `Online Sale Price`
- `Categories`
- `Reporting Category`
- `Square Online Item Visibility`
- `Shipping Enabled`
- `Self-serve Ordering Enabled`
- `Delivery Enabled`
- `Pickup Enabled`
- `Archived`
- `Sellable`
- `Stockable`
- Any `Current Quantity ...`, `New Quantity ...`, `Stock Alert Enabled ...`, or `Stock Alert Count ...` column
- Any `Modifier Set - ...` column
- Any locked `Component Inventory` column, especially `Token\n(locked)`, `Item Name\n(locked)`, `Variation Name\n(locked)`, `Unit and Precision\n(locked)`, and `SKU\n(locked)`

### Practical Square warnings

- Preserve sheet names, header rows, header spelling, punctuation, capitalization, and column order unless Square's current import instructions or the user's exact template say otherwise.
- Treat `Token`, `Reference Handle`, locked fields, SKUs, variation names, modifier set columns, inventory/location columns, and enabled/visibility fields as sensitive.
- Do not remove token/system/ID columns from a Square export.
- Do not assume that Square accepts Shopify CSV headers.
- Do not assume that Square export columns are safe to repurpose for Shopify.
- Do not claim a Square file is upload-ready unless it has been validated against the user's current Square import flow and tested with a small import first.

## Detected Square blank template structure

`templates/square/square-blank-import-library.xlsx` was not found in the inspected repository state, so no blank Square import template sheets or headers were detected.

If the user later provides the Square blank import workbook, inspect that exact workbook before giving upload-ready guidance. The blank import template may differ from the current item library export, and its headers should become the source of truth for new import drafts.

## Detected Shopify CSV structure

### CSV inspected

- File name: `shopify-sample-product-csv.csv`
- Path: `templates/shopify/shopify-sample-product-csv.csv`
- Detected header row: row 1

### Header columns detected

Detected columns, in order:

1. `Title`
2. `URL handle`
3. `Description`
4. `Vendor`
5. `Product category`
6. `Type`
7. `Tags`
8. `Published on online store`
9. `Status`
10. `SKU`
11. `Barcode`
12. `Option1 name`
13. `Option1 value`
14. `Option1 Linked To`
15. `Option2 name`
16. `Option2 value`
17. `Option2 Linked To`
18. `Option3 name`
19. `Option3 value`
20. `Option3 Linked To`
21. `Price`
22. `Compare-at price`
23. `Cost per item`
24. `Charge tax`
25. `Tax code`
26. `Unit price total measure`
27. `Unit price total measure unit`
28. `Unit price base measure`
29. `Unit price base measure unit`
30. `Inventory tracker`
31. `Inventory quantity`
32. `Continue selling when out of stock`
33. `Weight value (grams)`
34. `Weight unit for display`
35. `Requires shipping`
36. `Fulfillment service`
37. `Product image URL`
38. `Image position`
39. `Image alt text`
40. `Variant image URL`
41. `Gift card`
42. `SEO title`
43. `SEO description`
44. `Color (product.metafields.shopify.color-pattern)`
45. `Google Shopping / Google product category`
46. `Google Shopping / Gender`
47. `Google Shopping / Age group`
48. `Google Shopping / Manufacturer part number (MPN)`
49. `Google Shopping / Ad group name`
50. `Google Shopping / Ads labels`
51. `Google Shopping / Condition`
52. `Google Shopping / Custom product`
53. `Google Shopping / Custom label 0`
54. `Google Shopping / Custom label 1`
55. `Google Shopping / Custom label 2`
56. `Google Shopping / Custom label 3`
57. `Google Shopping / Custom label 4`

### Shopify field groups

- Product fields: `Title`, `URL handle`, `Description`, `Vendor`, `Product category`, `Type`, `Tags`, `Published on online store`, `Status`, `Gift card`, and `Color (product.metafields.shopify.color-pattern)`.
- Variant/option fields: `SKU`, `Barcode`, `Option1 name`, `Option1 value`, `Option1 Linked To`, `Option2 name`, `Option2 value`, `Option2 Linked To`, `Option3 name`, `Option3 value`, `Option3 Linked To`, and `Variant image URL`.
- Image fields: `Product image URL`, `Image position`, `Image alt text`, and `Variant image URL`.
- Price fields: `Price`, `Compare-at price`, `Cost per item`, and unit price measure fields.
- Inventory fields: `Inventory tracker`, `Inventory quantity`, `Continue selling when out of stock`, `Weight value (grams)`, `Weight unit for display`, `Requires shipping`, and `Fulfillment service`.
- Tax fields: `Charge tax` and `Tax code`.
- SEO fields: `SEO title` and `SEO description`.
- Status/publication fields: `Published on online store` and `Status`.
- Shopping channel/feed fields: the `Google Shopping / ...` columns.

### Shopify sensitive or required fields

Treat these Shopify fields as sensitive or potentially required depending on the import goal and Shopify's current CSV requirements:

- `Title`
- `URL handle`
- `Status`
- `SKU`
- `Barcode`
- `Option1 name`
- `Option1 value`
- `Price`
- `Charge tax`
- `Inventory tracker`
- `Inventory quantity`
- `Continue selling when out of stock`
- `Requires shipping`
- `Fulfillment service`
- `Product image URL`
- `Variant image URL`
- `Product category`
- `Google Shopping / ...` fields if products feed ads, sales channels, or merchant listings

Public image URL caution: Shopify image import columns should use publicly reachable image URLs when importing images. Local file paths, private URLs, temporary URLs, and inaccessible drive links are not safe for upload planning.

## Safe generation rules

- Use real templates as the source of truth.
- Preserve headers exactly.
- Do not reorder columns unless explicitly instructed and safe.
- Do not delete unknown columns.
- Do not invent platform-specific columns.
- Never mix Shopify CSV structure with Square XLSX/CSV structure.
- Treat generated import files as drafts until tested.
- Generate a small test import first.
- Keep backups before touching a live Square or Shopify catalog.
- Do not change prices, categories, taxes, SKUs, or modifiers without client approval.
- Preserve leading zeros in SKUs, barcodes, GTINs, handles, and IDs by treating them as text where possible.
- If a spreadsheet application may auto-format values, warn the user before editing SKUs, barcodes, prices, GTINs, or IDs.

## Restaurant/menu planning rules

Before planning a restaurant or menu import, define:

- Platform first: Shopify, Square, or demo-only.
- Category structure.
- Item names.
- Descriptions.
- Price strategy.
- Variation strategy.
- Modifier/add-on strategy.
- Image strategy.
- Availability/location strategy.
- What is display-only versus what affects ordering/payment.

For Square restaurant/menu planning, distinguish core menu items from variations, modifiers, add-ons, location inventory/availability, and online ordering visibility.

For Shopify restaurant/menu-style planning, distinguish storefront display content from actual product variants, prices, inventory, shipping/tax behavior, and checkout behavior.

## Common mistakes

- Using Shopify CSV format for Square.
- Using Square export format for Shopify.
- Removing Square token/system/ID columns.
- Reordering Square columns.
- Breaking SKUs with leading zeros.
- Uploading local image paths instead of public image URLs.
- Treating modifiers/add-ons as separate products when they should be modifiers.
- Importing into a live catalog without a backup.
- Claiming a file is upload-ready without validating required fields.
- Changing prices, categories, taxes, SKUs, or modifier assignments without client approval.
- Confusing demo-only menu tables with live ordering/payment import files.

## Assistant behavior

- If the user provides a template, use that exact template.
- If the user does not provide a template, create only a planning table, not an upload-ready file.
- Always ask which platform the upload is for.
- Always ask whether the file is for live import, testing, demo, or review.
- Always provide a validation checklist.
- Clearly state when a template is missing instead of inventing its columns.
- Clearly separate Shopify guidance from Square guidance.
- Do not claim an import file is ready for production unless the user supplied the exact current template, required fields were validated, and a small test import has been recommended.
