# Debugging Shopify Editor Issues

## Editor stuck on 404

Check:

- The theme editor template selector.
- The preview URL.
- Whether the selected resource exists.
- Whether the store has a valid product, collection, page, blog, or article for the chosen template.
- Whether a bad link or preview route forced the editor into the 404 template.

Fix by navigating to a valid resource and selecting the intended template before editing.

## Wrong template being edited

Symptoms:

- Changes do not appear on the expected page.
- A section appears in the editor but not on the storefront page being checked.
- The editor title shows a different template than expected.

Debug steps:

- Confirm the template name in the editor.
- Confirm the preview URL.
- Confirm the JSON template assigned to the resource.
- Check whether the page/product/collection is using a custom template.

## Section not showing

Check:

- The section has a preset if it should be addable.
- The section is included in the correct JSON template.
- The schema JSON is valid.
- Required settings are not blank without fallback.
- CSS is not hiding the section.
- Liquid conditions are not preventing output.
- The theme preview is on the intended template.

## Settings not updating

Check:

- The Liquid references the exact setting ID from schema.
- The setting type matches the intended data.
- The section has been saved or refreshed if the editor state is stale.
- JavaScript is not replacing or caching old content.
- CSS variables or inline styles use current setting values.

## Collection selected but products not displaying

Check:

- The schema setting type is `collection`.
- The selected collection variable points to the correct setting ID.
- The collection contains products.
- The product loop uses `selected_collection.products`.
- The product limit is not zero.
- Product card snippet names are correct.
- CSS or JavaScript is not hiding the grid.
- If tabs are used, the selected tab panel is active.

## Product grid empty

Check:

- No collection was selected.
- Selected collection has no products.
- Products are unavailable or filtered out by custom logic.
- Pagination or limit logic starts at the wrong point.
- Product card render call has missing required parameters.

## Schema errors

Common causes:

- Invalid JSON.
- Trailing commas.
- Duplicate setting IDs.
- Unsupported setting type.
- Liquid inside `{% schema %}`.
- Missing `{% endschema %}`.
- Invalid block or preset structure.

Debug by validating the schema JSON and simplifying until the editor accepts it.

## JavaScript breaking section reload

Symptoms:

- Works on first page load but not after changing settings.
- Duplicate sliders, duplicated event listeners, or broken tabs.
- Console errors after selecting a section or block.

Fixes:

- Scope initialization to the section container.
- Listen for `shopify:section:load` when needed.
- Clean up event listeners or instances before reinitializing.
- Avoid global one-time initialization for section-specific behavior.

## CSS leaking globally

Symptoms:

- Other sections change unexpectedly.
- Buttons, cards, headings, or grids elsewhere are affected.

Fixes:

- Prefix selectors with the section wrapper or `#shopify-section-{{ section.id }}`.
- Avoid broad selectors.
- Rename generic classes.
- Keep CSS variables section-scoped.

## Theme preview issues

Check:

- The correct theme is being previewed.
- The correct template and resource are selected.
- Browser cache is not showing stale assets.
- Theme editor unsaved changes have been saved if needed.
- Apps or custom scripts are not causing console errors.
- The issue reproduces outside the editor preview.
