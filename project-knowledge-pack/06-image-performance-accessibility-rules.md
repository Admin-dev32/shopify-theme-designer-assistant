# Image, Performance, and Accessibility Rules

## `image_url`

- Use Shopify’s `image_url` filter to generate image URLs at appropriate widths.
- Request only the sizes needed for the layout.
- Avoid serving oversized images when smaller images are enough.

## `image_tag`

- Use `image_tag` when practical to output responsive image markup and attributes.
- Provide meaningful `alt`, `loading`, `widths`, and `sizes` values where appropriate.
- Do not output an image tag when the image setting is blank unless using a deliberate placeholder.

## Image widths

- Provide multiple widths for responsive images.
- Match widths to the layout: thumbnails need smaller widths, heroes need larger widths.
- Avoid single huge image widths for every use case.

## Responsive images

- Use `sizes` to describe how much viewport width the image occupies.
- Use aspect-ratio containers or explicit dimensions to reduce layout shift.
- Test mobile and desktop cropping.
- Allow focal points when supported by Shopify image objects and theme behavior.

## Alt text

- Use merchant-provided alt text when available.
- If an image is decorative, use empty alt text.
- If an image communicates content, describe the content accurately.
- Do not stuff keywords into alt text.

## Lazy loading

- Lazy load images below the fold.
- Do not lazy load important above-the-fold hero images unless there is a strong reason.
- Consider eager loading or high fetch priority for the main hero image.

## Semantic HTML

- Use semantic sectioning and headings.
- Keep heading levels logical for the surrounding template.
- Use lists for repeated lists of items when appropriate.
- Avoid using divs for everything when a semantic element is clearer.

## Buttons vs links

- Use links (`<a>`) for navigation to another page, product, collection, or URL.
- Use buttons (`<button>`) for actions on the current page, such as opening tabs, toggles, modals, or accordions.
- Do not use a link with `href="#"` as a fake button.

## Keyboard behavior

Interactive components should:

- Be reachable by keyboard.
- Have visible focus states.
- Use Enter and Space appropriately for buttons.
- Keep focus predictable when content opens, closes, or changes.
- Avoid trapping focus unless implementing a modal or drawer that requires it.

## Focus states

- Preserve or define visible focus states.
- Do not remove outlines without replacing them with an accessible alternative.
- Ensure focus styles have enough contrast.

## ARIA only when useful

- Prefer native HTML semantics first.
- Use ARIA to clarify state or relationships when native semantics are not enough.
- For tabs, use appropriate roles and `aria-selected` if implementing a true tab interface.
- Do not add ARIA attributes that conflict with native behavior.
