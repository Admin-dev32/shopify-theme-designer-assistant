# Shopify Section Building Rules

## Define the section purpose first

Every section should have a clear job, such as:

- Hero banner.
- Featured collection.
- Product recommendations.
- Category tabs.
- Image-with-text.
- Testimonials.
- FAQ.
- Promotional banner.
- Header or navigation enhancement.

Before coding, identify the target template, section purpose, merchant controls, and data sources.

## Schema settings

- Use schema settings for merchant-editable content and layout options.
- Provide sensible defaults.
- Use the most specific setting type available.
- Keep setting names readable and consistent.
- Include a preset when the section should be addable in the theme editor.

## Blocks

- Use blocks for repeatable content.
- Include block limits where useful.
- Use `block.shopify_attributes` on editable block wrappers.
- Make block labels clear.
- Provide default blocks in presets when helpful.

## Responsive layout

- Design desktop, tablet, and mobile behavior intentionally.
- Avoid fixed widths that break small screens.
- Use CSS grid or flexbox for adaptive layouts.
- Provide settings for columns when appropriate.
- Ensure touch targets are large enough on mobile.

## Scoped CSS

- Scope CSS to the current section using `#shopify-section-{{ section.id }}` or a section-specific wrapper.
- Avoid global selectors like `h2`, `.button`, `.card`, or `img` unless scoped.
- Avoid CSS that unintentionally changes other theme sections.
- Keep section styles close to the section unless the theme has an established asset pipeline.

## Scoped JavaScript

- Avoid JavaScript unless needed.
- Scope selectors to the section instance.
- Initialize by section ID.
- Avoid duplicate event listeners after theme editor reloads.
- Support Shopify editor events for dynamic reloads.
- Clean up timers, observers, and event listeners when appropriate.

## No unnecessary libraries

- Do not add jQuery, sliders, animation libraries, or utility frameworks unless the existing theme already uses them and the user approves.
- Prefer native browser APIs and CSS.

## Use native theme snippets where possible

- Reuse existing snippets for product cards, prices, media, icons, buttons, swatches, and badges when available.
- Product cards should reuse existing theme snippets when possible to preserve theme styling, badges, sale logic, and app integrations.
- If snippet names are unknown, ask for the theme files or provide a placeholder with instructions to replace it.

## Empty states

Every section should render a useful state when content is missing. Examples:

- “Select a collection to show products.”
- “This collection has no products yet.”
- Placeholder SVGs for missing images.
- Default demo text for newly added blocks.

## Desktop and mobile behavior

Document and test:

- Column counts.
- Stacking order.
- Slider behavior, if any.
- Image aspect ratios.
- Text alignment.
- Header/menu interaction.
- Sticky or fixed positioning.

## Testing checklist

For each section, test:

- Add section through theme editor.
- Remove and re-add section.
- Change all settings.
- Add, remove, reorder, select, and deselect blocks.
- Preview desktop and mobile.
- Test the correct template and at least one incorrect-template scenario.
- Confirm no console errors.
- Confirm CSS does not affect other sections.
- Confirm missing-content fallbacks display correctly.
