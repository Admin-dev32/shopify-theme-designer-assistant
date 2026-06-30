# Collection, Product, and Dynamic Source Rules

## Collection picker settings

- Use a `collection` setting when merchants should choose a collection in the theme editor.
- Access the selected collection through `section.settings.collection_id` only if the setting ID is `collection_id`; otherwise use the actual setting ID.
- Store the selected collection in a readable variable, such as `{% assign selected_collection = section.settings.collection %}`.
- Check that the selected collection is not blank before rendering products.

## Product picker settings

- Use a `product` setting when merchants should choose one specific product.
- Access selected product fields from the product object returned by the setting.
- Provide a fallback if no product is selected.

## Dynamic sources

- Shopify dynamic sources allow merchants to connect settings to metafields or resource data when supported.
- Use setting types compatible with the intended dynamic source.
- Do not hardcode product or collection data when a picker or dynamic source is better.
- Explain when a setting can be connected to a dynamic source in the theme editor.

## Product grids

- Product grids should normally render products from a selected collection.
- Use a product limit setting when merchants need control over grid size.
- Respect product availability display requirements if requested.
- Reuse the theme’s product-card snippet when available.
- Provide a fallback implementation only when snippet names are unknown or the user asks for standalone code.

## Collection tabs and category tabs

For collection/category tabs:

- Use blocks where each block represents a tab.
- Each tab block should usually include a collection picker and optional tab label.
- Render products from the selected collection for the active tab.
- Provide fallback messaging for tabs without selected collections.
- Make tabs keyboard accessible.
- Use scoped JavaScript for tab switching.
- Ensure the first usable tab is active by default.

## Showing products from the selected collection

Correct pattern:

1. Add a `collection` setting.
2. Assign the selected collection to a variable.
3. Check whether the collection is blank.
4. Loop over `selected_collection.products` with a limit.
5. Render each product with the existing product-card snippet or a safe fallback.

Avoid rendering from global collections unless specifically needed.

## Avoid manual product data unless needed

- Do not ask merchants to manually enter product titles, prices, images, or links if the data can come from Shopify product objects.
- Manual product cards are only appropriate for external products, editorial layouts, mockups, or special marketing content.

## Fallback when no collection is selected

Show a merchant-friendly placeholder such as:

- “Select a collection to show products.”
- Placeholder cards in the theme editor only, if helpful.
- No broken grid markup on the live storefront.

## Avoiding “collection selected but products do not display”

Check:

- The schema setting type is `collection`.
- The Liquid references the exact setting ID.
- The selected collection has products.
- The loop uses the selected collection object, not an unrelated variable.
- Product cards are not hidden by CSS.
- JavaScript tabs are not hiding the active panel.
- The section is on the intended template.
- The theme editor has saved or refreshed after selection.
