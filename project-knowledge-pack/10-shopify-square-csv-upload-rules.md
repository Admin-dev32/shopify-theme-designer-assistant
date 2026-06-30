# Shopify + Square CSV/XLSX Upload Rules

This Project Knowledge file is for the **Shopify Theme Designer Assistant** with a Square knowledge add-on. It explains how the assistant should safely reason about Shopify product CSVs and Square item-library import/export spreadsheets.

This is **planning and validation knowledge only**. Do not create production code, Shopify sections, a Square app, or final upload-ready CSV/XLSX files from this file alone.

## Template availability checked

The requested reference files were checked in this repository and were **not present** at the time this knowledge file was created:

| Requested file | Status | Notes |
|---|---:|---|
| `templates/shopify/shopify-sample-product-csv.csv` | Missing | No Shopify sample CSV headers could be inspected locally. |
| `templates/square/square-blank-import-library.xlsx` | Missing | No Square blank import workbook sheets/columns could be inspected locally. |
| `templates/square/square-current-item-library-export.xlsx` | Missing | No current Square export workbook sheets/columns, tokens, locations, taxes, modifiers, or system columns could be inspected locally. |

Because these files were missing, the assistant must **not invent exact upload columns** or claim any generated Shopify/Square file is upload-ready. If the user later provides real templates, use those exact files as the source of truth.

## Global safety rules

- Decide the target platform before creating any spreadsheet plan: **Shopify**, **Square**, or **demo-only content**.
- Never mix Shopify product CSV columns with Square item-library import/export columns.
- Preserve headers exactly when a real template exists.
- Do not invent upload columns when a real template is unavailable.
- Treat generated upload files as **drafts until imported and tested successfully**.
- Generate a small test file first before a full catalog/menu import.
- Keep a backup of any current live export before editing or importing.
- Do not change prices, SKUs, taxes, locations, availability, or modifiers without explicit client approval.
- Use spreadsheet-safe handling for SKUs and IDs so leading zeros are not lost.
- Use public image URLs for image-import workflows unless the platform explicitly supports another method.
- Exact Shopify Admin and Square Dashboard behavior must be manually verified because admin interfaces and import tools can change.

## Shopify CSV rules

When a Shopify product CSV template is available:

- Use the official Shopify sample product CSV as the safest base.
- Preserve headers exactly.
- Do not reorder, rename, or invent columns.
- Do not use Square import/export columns in a Shopify product CSV.
- Validate required product and variant fields before saying the file is upload-ready.
- Use public image URLs for product image imports; local file paths are not acceptable for Shopify CSV image import.
- Be careful with variant rows and option columns. A product with multiple sizes, colors, or other options usually needs multiple variant rows.
- Do not collapse distinct variants into one row if the product requires separate prices, SKUs, barcodes, weights, inventory behavior, or option values.
- Do not duplicate handles unintentionally across unrelated products.
- Treat SKU, barcode, price, compare-at price, inventory, taxable, gift-card, vendor, product type, tags, status/published fields, and SEO fields as sensitive business data.

When no Shopify template is available:

- Create only a draft planning table unless the user supplies a real Shopify CSV structure.
- Label the output clearly as **not upload-ready**.
- Ask the user to provide the official Shopify sample CSV or an export from the actual Shopify store before creating an import file.

### Shopify variants, options, categories, images, and prices

- Shopify product CSV structure is product/variant oriented, not Square menu/modifier oriented.
- Shopify uses product options and variants for sellable variants. It does not use Square-style modifier lists in the product CSV.
- Shopify categories/collections are not the same as Square categories. Collections may be automated or manual and may not be represented as a simple one-to-one import column.
- Images should use stable public URLs and should be reviewed for rights, alt text, cropping, and performance.
- Prices must be approved by the client before import. Do not silently adjust prices to fit a design concept.

## Square import/export rules

When a Square blank import library or current item-library export is available:

- Use the Square blank import library or current item-library export as the safest base.
- Preserve headers exactly.
- Do not reorder columns.
- Do not delete unknown columns.
- Do not change token, ID, system, or hidden/technical columns if present.
- Keep a backup of the current item-library export before editing.
- Be careful with locations, categories, taxes, SKUs, modifiers, item variations, prices, images, and availability.
- Verify exact import behavior in Square Dashboard before relying on the spreadsheet.
- Prefer a small test import over a full live catalog import.

When no Square template/export is available:

- Create only a draft planning table unless the user supplies the actual Square import/export workbook.
- Do not invent Square workbook sheets or column names.
- Do not claim that a CSV/XLSX is ready for Square import.
- Ask the user to export the current Square item library or download the current blank Square import template.

### Square variants, modifiers, categories, images, and prices

- Square item-library spreadsheets are not interchangeable with Shopify product CSVs.
- Square item variations are sellable versions of an item, such as size or portion.
- Square modifiers/modifier lists represent add-ons or sale-time choices, such as toppings, milk choice, spice level, sides, or preparation options.
- Decide whether a restaurant menu choice should be a variation or a modifier before creating import data.
- Categories should be planned before items so menu organization is consistent.
- Location-specific availability, item visibility, taxes, and pricing can affect the import result.
- Image handling must be verified against the actual Square template/export. Do not assume image columns, image tokens, or image URL behavior without the real workbook.
- SKU and token/system columns should be treated as sensitive import mechanics. Preserve formatting and values unless the client and template instructions clearly say otherwise.

## Restaurant/menu planning rules

Before producing any Shopify or Square spreadsheet draft, clarify:

1. Is the upload for Shopify, Square, or demo-only content?
2. Which system is the source of truth for menu/item data?
3. What categories should exist before item entry begins?
4. What are the official item names and customer-facing descriptions?
5. Which choices are true variations and which are modifiers/add-ons?
6. What is the image strategy: existing public URLs, new photography, placeholders, or no images?
7. What is the price strategy: fixed prices, variation prices, market price, “from” pricing, or no displayed price?
8. What is the location/availability strategy for Square-managed menus?
9. Which fields require client approval before import?
10. What small test import should be run before the full import?

Restaurant-specific guidance:

- Define categories first: Breakfast, Appetizers, Entrees, Drinks, Desserts, Catering, Specials, or the merchant's actual menu groups.
- Define item names consistently; avoid mixing internal prep names with public menu names.
- Keep descriptions concise and customer-facing.
- Separate item variations from modifiers:
  - Variation example: Small / Large latte.
  - Modifier example: Add oat milk / extra espresso shot.
- Do not simplify modifiers away if they are needed for real ordering.
- Do not assume Shopify display equals Square ordering behavior.
- Test with a small menu subset before importing a full restaurant catalog.

## Codex/ChatGPT generation rules

- If the user provides a real template, inspect and use that exact structure.
- If no real template is provided, only create a draft planning table, not an upload-ready file.
- Never mix Shopify and Square column formats.
- Always label generated upload files as **draft until tested**.
- Always include a validation checklist.
- Generate small test files first.
- Do not create production code, Shopify sections, Square apps, or payment/order integrations as part of CSV/XLSX planning.
- Do not fill unknown columns with guessed values.
- Do not remove unknown columns just because they are not understood.
- Do not modify system/token columns unless the user provides official instructions from the platform template/export.

## Validation checklist before any upload

Use this checklist before telling a user a spreadsheet is ready for testing:

- Target platform is clear: Shopify, Square, or demo-only.
- Real platform template/export was used.
- Headers are preserved exactly.
- No Shopify and Square formats are mixed.
- Required fields are present based on the actual template/export.
- Variant/option/modifier decisions are documented.
- Categories are defined and consistently applied.
- Prices are approved.
- SKUs, barcodes, IDs, and token/system fields preserve formatting.
- Public image URLs are valid if image import is expected.
- Locations, taxes, availability, and visibility are verified where relevant.
- A backup of the live/current export exists.
- A small test import plan exists.
- The user understands the file remains draft until tested in the target platform.

## Common mistakes to avoid

- Using a Shopify CSV for Square.
- Using a Square XLSX for Shopify.
- Reordering Square columns.
- Removing system/token columns.
- Breaking SKUs or IDs with leading zeros.
- Missing variants, options, modifiers, or modifier lists.
- Using local image file paths instead of public image URLs.
- Uploading into a live catalog without a backup.
- Changing prices without client approval.
- Treating a static Shopify menu display as Square order/payment processing.
- Claiming upload-readiness without a real template and validation pass.
