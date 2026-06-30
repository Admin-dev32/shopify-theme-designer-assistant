# Liquid, Schema, and Online Store 2.0 Rules

## Liquid basics

- Use Shopify Liquid syntax, not generic templating syntax.
- Keep logic readable and close to the markup it affects.
- Use `assign`, `capture`, `for`, `if`, `unless`, `case`, and `render` appropriately.
- Prefer `render` over deprecated `include`.
- Use `blank`, `empty`, and `nil` checks carefully.
- Escape merchant-provided plain text with `escape` unless HTML is intended.

## Valid schema JSON

- Section schema must be valid JSON inside `{% schema %}` and `{% endschema %}`.
- Do not use Liquid inside schema JSON.
- Do not leave trailing commas.
- Use unique setting IDs within each settings array.
- Use supported Shopify setting types.
- Keep labels and defaults merchant-friendly.

## Shopify Online Store 2.0 compatibility

- Add presets for dynamic sections that merchants can add in the theme editor.
- Use JSON templates where appropriate in real themes.
- Avoid relying on old static-only template assumptions.
- Build sections so multiple instances can exist on the same page.
- Scope CSS and JavaScript by `section.id`.

## Section presets

- A section with a preset appears in the theme editor’s “Add section” list for compatible templates.
- Presets should include a clear `name`.
- Presets may include starter blocks.
- Avoid presets for snippets or sections that should not be merchant-addable.

## Setting types

Use Shopify setting types based on the need:

- `text` for short plain text.
- `textarea` for longer plain text.
- `richtext` for formatted content.
- `image_picker` for images.
- `collection` for merchant-selected collections.
- `product` for merchant-selected products.
- `url` for links.
- `link_list` for menus.
- `range` for numeric controls.
- `select` for constrained choices.
- `checkbox` for true/false options.
- `color` for color controls.

## Blocks

- Define block types for repeatable content.
- Use block settings for block-specific content.
- Use `block.shopify_attributes` in block markup.
- Set block limits when needed.
- Render clear empty states when no blocks exist.

## Avoid hardcoded IDs

- Do not hardcode product IDs, collection IDs, variant IDs, media IDs, or section IDs unless explicitly required.
- Use picker settings, handles, metafields, or dynamic sources instead.
- If IDs are unavoidable, explain why and where to change them.

## Avoid invalid filters and tags

- Use only Shopify-supported Liquid filters and tags.
- Do not invent filters.
- Verify uncertain filters against Shopify documentation before relying on them.
- Keep filter chains simple when possible.

## Use Shopify objects correctly

- Use `section.settings` for section settings.
- Use `block.settings` for block settings.
- Use `collection.products` only when a collection object is present.
- Use product objects from product picker settings directly.
- Use `routes`, `request`, `template`, `shop`, `cart`, `customer`, and other global objects only where appropriate.
- Do not assume a product object exists outside product templates unless it is supplied by a setting, loop, or section context.
