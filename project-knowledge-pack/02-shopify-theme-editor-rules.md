# Shopify Theme Editor Rules

## Theme editor compatibility

- Build for Shopify Online Store 2.0 section architecture.
- Make sections configurable through schema settings and blocks.
- Avoid code that only works in one theme unless the theme has been inspected.
- Do not rely on global JavaScript initialization that runs only on full page load.
- Support Shopify editor section lifecycle events when JavaScript is needed.

## Template context

- Never assume the user is editing the homepage.
- Confirm whether the section belongs on `index`, `product`, `collection`, `page`, `blog`, `article`, `search`, `cart`, `404`, or a custom JSON template.
- If the theme editor appears stuck on the wrong page, check the template selector and preview URL.
- If a section is added to the wrong template, it may not appear where the merchant expects.

## Avoiding wrong-template problems

Common mistake: editing the `404` template or another preview template by accident.

Before debugging code, verify:

- The correct template is selected in the theme editor.
- The preview URL matches the resource being edited.
- The section exists in the intended JSON template or is available as a dynamic section.
- The store has the product, collection, page, or blog post required by the template preview.

## Presets

- Include `presets` for sections merchants should add through the theme editor.
- Preset names should be clear and merchant-friendly.
- Presets may include starter blocks when helpful.
- Do not include presets for sections that should only be statically included by a template or layout.

## Settings

- Use settings to expose merchant-editable content and design controls.
- Prefer clear labels, helpful defaults, and limited choices.
- Use `header` and `paragraph` settings to organize complex controls.
- Avoid overwhelming merchants with too many settings.
- Provide safe defaults so sections look acceptable immediately after being added.

## Blocks

- Use blocks for repeatable content such as slides, tabs, cards, icons, FAQs, testimonials, navigation items, and feature rows.
- Set sensible `limit` values when unlimited blocks could break the design.
- Render fallback content when no blocks exist.
- Use `block.shopify_attributes` on block wrapper elements so the theme editor can select blocks correctly.

## Fallback states

Provide graceful fallbacks for:

- No collection selected.
- Collection selected but no products available.
- No product selected.
- No image selected.
- Empty text or rich text.
- Empty block list.
- Missing links.

Fallback states should help merchants understand what to configure without breaking the storefront.

## Theme editor reload behavior

JavaScript should account for:

- Initial page load.
- Section load in the theme editor.
- Section unload or re-render.
- Block select and block deselect events when interactive UI is block-based.

Use section-scoped initialization and cleanup when possible.

## Merchant-friendly controls

- Use labels merchants understand.
- Group settings by content, layout, style, and behavior.
- Use ranges and selects rather than free text when possible.
- Make risky options explicit.
- Keep defaults aligned with common Shopify storefront patterns.
