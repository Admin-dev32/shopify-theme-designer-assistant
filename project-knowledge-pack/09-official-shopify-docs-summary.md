# Official Shopify Docs Summary for Theme Assistant

This file is the upload-friendly summary of the local raw Shopify documentation files in `knowledge/shopify/raw-docs/`. Treat the local raw docs as reference files and Shopify’s official documentation as the source of truth. Use this summary for practical planning, generation, and debugging of Shopify theme code. Do not treat it as a replacement for the full docs when exact syntax is uncertain.

## Scope

Focus only on Shopify theme development for Online Store 2.0 themes: theme architecture, sections, schema, settings, blocks, presets, Liquid, products, collections, images, theme editor behavior, and GitHub/theme workflow. Ignore unrelated Shopify platform topics.

## Online Store 2.0 rules

- Online Store 2.0 themes use JSON templates and sections to let merchants add, remove, and reorder sections on more page types.
- JSON templates should act as wrappers that define which sections appear on a page. The section files contain the reusable markup, Liquid, schema, and settings.
- Use sections and section groups for merchant-editable page areas. Do not assume a section is only for the home page.
- Dynamic sources let compatible settings pull contextual data such as product or collection metafields. Prefer dynamic-source-compatible settings when content should change with the page context.
- App blocks can be supported when a section has a clear extension point, such as product information or cart content. Avoid app blocks where arbitrary injected content would break layout or make the section purpose unclear.

## Theme architecture

- Shopify themes use a standard directory structure: `assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, and `templates`.
- `layout` files provide the repeated page shell, such as the document structure, header area, and footer area.
- `templates` decide what content appears for a resource type. OS 2.0 JSON templates reference sections rather than containing most page markup directly.
- `sections` are reusable, customizable modules that can be included by templates or section groups.
- `blocks` are smaller reusable modules inside sections. They are best for content that merchants should add, remove, reorder, or configure within a section.
- `snippets` are reusable Liquid fragments that can be rendered from layouts, templates, sections, or other snippets.
- `assets` store CSS, JavaScript, and theme assets. Reference theme assets with Liquid URL filters rather than hard-coded paths.
- `config/settings_schema.json` defines global theme settings. `config/settings_data.json` stores merchant-selected values and should not be hand-authored casually.
- Locale files store translations for text strings used by the theme.

## Sections

- Sections are the main OS 2.0 building blocks for merchant-editable content.
- A section file can contain Liquid, HTML, CSS/JS references, and a `{% schema %}` JSON object.
- Design sections so they remain useful when merchants add, remove, or reorder them.
- For default template content, prefer a main template section such as a main product, main collection, or main page section.
- Use section-level settings for controls that affect the whole section layout or content.
- Keep section responsibilities clear. A section should have a focused purpose rather than becoming a catch-all component.
- To work well in the theme editor, sections need valid schema, stable setting IDs, and settings that map clearly to visible output.

## Section schema

- Section schema is JSON inside the section’s `{% schema %}` tag.
- Use `name` to label the section in the theme editor.
- Use `settings` for section-level controls.
- Use `blocks` for merchant-configurable child content.
- Use `max_blocks` when the layout has a practical limit.
- Use `presets` when the section should be available for merchants to add from the theme editor.
- Use `enabled_on` or `disabled_on` when a section should only be available for certain templates or section groups.
- Use `tag` and `class` when the wrapper element or class needs to be controlled by schema, but do not rely on schema wrapper settings as a substitute for good markup.
- Use `locales` or translation keys when labels need to support localization.
- JSON in schemas can support comments and trailing commas in some theme files, but generated schema should still be clean, valid, and easy to maintain.

## Settings

- Settings can exist globally, at section level, or at block level.
- Access global settings with `settings.setting_id`.
- Access section settings with `section.settings.setting_id`.
- Access block settings with `block.settings.setting_id`.
- Input settings hold merchant values. Sidebar settings provide labels, headers, paragraphs, or other editor guidance and do not hold merchant values.
- Use clear, stable, descriptive setting IDs. Changing IDs can disconnect existing merchant content.
- Check for blank values before rendering optional content.
- Use dynamic-source-compatible setting types for contextual merchant data when appropriate.
- Use `visible_if` for conditional settings when one setting should only appear after another setting enables it.
- Keep settings practical. Too many controls make the theme editor harder to use and increase code complexity.

## Blocks

- Use blocks for content that merchants need to add, remove, reorder, or configure inside a section.
- Keep block settings scoped to the block. Do not use a block to control unrelated section-wide behavior.
- Avoid overly granular blocks. Group related fields into one block when that creates a clearer editor experience.
- Design block layouts so they work regardless of block order, quantity, or type.
- Do not assume a specific block sequence unless the section enforces it and the editor experience makes that clear.
- Render blocks by looping through `section.blocks` and handling each block type intentionally.
- Include block attributes needed by the theme editor when generating real theme code, so selected blocks can be identified and edited properly.
- Support app blocks only where unexpected third-party block output will not break the layout.

## Presets

- A section needs a schema `presets` entry to appear as an addable section in the theme editor.
- Presets should provide sensible default content and settings so merchants see a useful starting point after adding the section.
- Presets can include default blocks. Use these to demonstrate the intended structure without overloading the merchant.
- Do not use presets to hard-code store-specific content into a general-purpose theme component.

## Theme editor compatibility

- Merchant-editable code should expose meaningful settings instead of requiring code edits for common changes.
- Keep labels clear and merchant-friendly.
- Preserve setting IDs and block types when modifying existing sections to avoid breaking saved merchant configuration.
- Avoid layouts that only work with one exact block count or order.
- Ensure optional settings fail gracefully when blank.
- Use dynamic sources for page-context content such as product-specific or collection-specific values.
- Remember that theme editor changes are stored in setting files and can be committed back to GitHub if the theme is connected.

## Liquid basics

- Liquid templates combine objects, tags, and filters to output storefront HTML.
- Use `{{ ... }}` for output and `{% ... %}` for logic tags.
- Use filters with pipes to transform output, for example formatting money, escaping text, resizing images, or creating URLs.
- Filters can be chained, but keep chains readable.
- Use assignments for intermediate values when that improves readability.
- Use `for`, `if`, `unless`, and related Liquid tags for basic control flow.
- Avoid complex business logic in theme code when a simpler Shopify object, setting, or metafield pattern is available.
- Escape or filter output appropriately for the context.

## Liquid objects

- Shopify Liquid objects expose storefront data such as products, collections, images, variants, settings, sections, and blocks.
- Object properties should be read from the documented object for the current template context.
- Do not assume every object exists on every template. Check context and blank values before rendering.
- Use `section`, `block`, and `settings` objects for theme editor configuration.
- Use product and collection objects for commerce content rather than hard-coded product or collection data.

## Liquid filters

- Filters modify output and are essential for safe, maintainable theme code.
- Use URL and media filters for Shopify-hosted assets and images rather than building CDN URLs manually.
- Use formatting filters for prices, dates, strings, arrays, and HTML output as appropriate.
- Keep filter use explicit and readable. If a filter requires parameters, include required parameters.
- When generating image markup, prefer the documented `image_url` and `image_tag` flow.

## Collections

- The `collection` object represents a collection in the current context.
- Common useful properties include `title`, `description`, `handle`, `url`, `image`, `featured_image`, `products`, `products_count`, `all_products_count`, `tags`, `filters`, `sort_by`, and `sort_options`.
- Use `products_count` for the count in the current filtered view. Use `all_products_count` only when the total collection count is needed.
- Use collection filters and sort options from Shopify data instead of inventing unsupported filter UI behavior.
- Collection templates should handle empty collections, missing images, and filtered views gracefully.

## Products

- The `product` object represents a product in the current context.
- Common useful properties include `title`, `description`, `handle`, `url`, `available`, `price`, `price_min`, `price_max`, `price_varies`, `compare_at_price`, `featured_image`, `featured_media`, `images`, `media`, `variants`, `selected_or_first_available_variant`, `options_with_values`, `vendor`, `type`, `tags`, and `metafields`.
- Use `selected_or_first_available_variant` when rendering default purchasable variant information.
- Product pages should handle unavailable products, products with only a default variant, missing media, price ranges, and compare-at prices.
- Use product forms and variant data according to Shopify theme rules when creating real product purchase UI.

## Image handling with `image_url`

- `image_url` returns a Shopify CDN URL for supported image-bearing objects or image `src` properties.
- Always provide at least `width` or `height`; Shopify returns an error if neither is supplied.
- Shopify will not upscale an image beyond its original dimensions.
- Use width and/or height parameters to request appropriately sized images.
- Use crop, format, or padding parameters only when they match the intended design and are supported by the docs.
- Do not manually concatenate Shopify CDN image URLs.

## Image handling with `image_tag`

- `image_tag` generates an HTML `img` tag from an image URL, commonly after `image_url`.
- The usual pattern is `image | image_url: width: 800 | image_tag` with appropriate parameters.
- `image_tag` can add width, height, srcset, alt, loading, sizes, preload, and other HTML attributes depending on parameters and defaults.
- It can automatically apply focal point positioning when focal point data exists.
- Do not lazy-load important above-the-fold images. Use explicit loading or preload logic for hero/LCP images when needed.
- Provide meaningful alt text for content images. Use empty alt text only for decorative images.
- Use `widths` and `sizes` thoughtfully so responsive images match the rendered layout.

## GitHub and theme workflow

- Shopify’s GitHub integration can sync a theme with a connected repository branch.
- Changes pushed to a connected branch update the theme in Shopify admin.
- Changes saved in Shopify admin, including theme editor and code editor changes, can be committed back to the connected branch by Shopify.
- Connected branches must match Shopify’s theme folder structure. Unsupported folders are ignored.
- The code editor can overwrite GitHub changes without conflict alerts, so teams should coordinate carefully.
- If sync issues occur, Shopify provides recent version control logs and an option to reset to the last commit from the theme card.
- For assistant-generated code, prefer a Git workflow with reviewable commits and avoid editing a live published theme directly.

## Assistant behavior rules

- Plan theme code around OS 2.0 JSON templates, sections, blocks, settings, and dynamic sources.
- Do not hard-code merchant content when a section setting, block setting, product object, collection object, or metafield is the right source.
- Prefer small, focused sections and blocks with clear schema.
- Preserve existing setting IDs, block types, and schema structure when debugging existing theme code.
- Validate required image filter parameters, especially `image_url` width or height.
- Check for blank optional objects and settings before rendering.
- Keep generated Liquid readable and editor-compatible.
- When exact syntax matters, consult the local raw docs in `knowledge/shopify/raw-docs/` or the latest official Shopify docs.
