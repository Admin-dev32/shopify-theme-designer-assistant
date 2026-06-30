# Official Square Docs Summary for Shopify Theme Designer Assistant

This file is an upload-friendly Square knowledge add-on for the **Shopify Theme Designer Assistant**. It summarizes the downloaded official Square documentation listed in `knowledge/square/index.md` and focuses on practical rules for restaurant/menu website planning.

Use this as **project knowledge**, not as production implementation code. Do not treat this file as instructions to build a Square app, payment integration, or Shopify sections automatically.

## Core positioning

- This is an **add-on** to the Shopify Theme Designer Assistant.
- When a client manages menu/items in Square, **Square is the source of truth for menu and item data**.
- Shopify can still be used for presentation: landing pages, brand design, navigation, SEO pages, menu display concepts, and links/buttons to online ordering.
- Do **not** confuse menu display with payment/order processing:
  - Displaying Square-managed menu data on a Shopify site is a content/presentation workflow.
  - Taking payments, creating orders, managing fulfillment, and syncing inventory are commerce workflows that require Square APIs, permissions, credentials, and careful implementation.
- Exact Square Dashboard UI paths must be verified manually because Square can change the Dashboard interface.

## Docs summarized

Downloaded docs summarized from `knowledge/square/raw-docs/` and indexed by `knowledge/square/index.md`:

- `catalog-api-overview.md`
- `design-a-catalog.md`
- `build-with-catalog.md`
- `update-catalog-objects.md`
- `search-catalog-objects.md`
- `categorize-catalog-items.md`
- `manage-menus.md`
- `enable-modifiers-on-items.md`
- `item-options.md`
- `catalog-images.md`
- `upload-catalog-images.md`
- `manage-catalog-images.md`
- `orders-api-overview.md`
- `create-orders.md`
- `manage-fulfillments.md`
- `web-payments-overview.md`
- `web-payments-quickstart.md`
- `sites-api-overview.md`
- `snippets-api-overview.md`
- `oauth-api-overview.md`
- `square-permissions.md`
- `inventory-api-overview.md`

## Square item library / catalog

- Square's item library is the seller's catalog of products, services, variations, categories, taxes, discounts, modifiers, options, and related business data.
- The Catalog API can read and manage that item library programmatically.
- New or updated catalog objects can become visible in Square Dashboard and Square POS, so catalog changes should be treated as real operational changes, not just website content changes.
- For a restaurant website workflow, assume the business owner may already maintain their real menu in Square. Avoid asking them to duplicate menu data in Shopify unless there is a clear reason.
- Use Square catalog data as structured source data for menu planning: item names, descriptions, prices, categories, variations, modifiers, images, availability, and location-related information.

## Catalog objects

- Square represents catalog entries as `CatalogObject` wrappers with a `type` and matching type-specific data.
- Examples include `ITEM`, `ITEM_VARIATION`, `CATEGORY`, `MODIFIER`, `MODIFIER_LIST`, `IMAGE`, `TAX`, and `DISCOUNT`.
- Practical rule: when discussing Square data, separate the object wrapper from the business concept. A menu item may involve multiple Square objects: item, variations, categories, modifiers, images, taxes, and inventory records.
- Catalog objects reference one another by IDs. Any import/sync/display plan must preserve relationships, not just item names.
- Square APIs commonly use idempotency keys for create/update operations. This matters for production implementations but should not be turned into code in this knowledge file.

## Catalog items

- A `CatalogItem` is the general product/menu entry, such as “Burger,” “Latte,” or “Caesar Salad.”
- Items can include descriptions, category associations, modifier-list associations, image references, tax references, and product-type details.
- In restaurant contexts, Square supports food-and-beverage-oriented item details that can represent data such as dietary preferences, ingredients, and calories where available.
- Do not assume every Square item is ready for public website display. Some items may be internal, hidden, location-specific, unavailable, or incomplete.
- For Shopify presentation planning, item fields can inform menu cards, product/menu grids, landing page sections, and SEO content, but the final display rules must be confirmed with the merchant.

## Item variations

- Square item variations represent the sellable versions of an item, such as small/large coffee, single/double entree, regular/family size, or different price points.
- Square requires catalog items created through the API to have at least one variation.
- Variations are often where price, SKU-like identifiers, location pricing, and inventory-relevant details live.
- For menu display, do not show a single item price blindly if the item has multiple variations. Use labels like “From $X,” display size rows, or ask the merchant how variations should appear.
- For restaurants, variations are usually best represented as sizes, portions, configurations, or preparation choices that materially change the base price.

## Categories

- Categories organize catalog items and are important for menu navigation.
- Categories may not perfectly match the public website menu structure. A merchant might use operational categories in Square that differ from marketing categories on a Shopify site.
- For menu websites, categories can map to sections such as Breakfast, Appetizers, Entrees, Desserts, Drinks, Catering, or Specials.
- Verify category order, visibility, and naming manually with the merchant. Do not assume Square category order is the desired website order.

## Menus

- Square menu support helps organize restaurant menu structures beyond a flat item list.
- Menu-related data can matter for restaurant workflows where the seller has multiple menus, menus by time/day, or online-ordering-specific organization.
- For website planning, treat Square menus as a possible source for public menu grouping, but confirm whether the merchant uses Square menus, categories, or both.
- If Square Online is active, menu presentation and ordering behavior may be influenced by Square Online settings, not only Catalog API objects.

## Modifiers and modifier lists

- Modifiers are add-ons or choices applied at sale time, such as extra cheese, milk choice, toppings, spice level, dressing, side choice, or special preparation.
- A modifier list groups related modifiers and can be applied to one or more items.
- Modifier lists can include selection rules and operational constraints. These are important for ordering but may be simplified for static menu display.
- For Shopify menu presentation, modifiers can be shown as “customization available,” “add-ons,” or detailed option lists, but do not imply Shopify can process those choices unless an actual ordering integration exists.
- In restaurant contexts, modifiers are critical because they often define the real ordering experience even when the base menu item seems simple.

## Item options

- Item options define standardized attributes that generate or describe variations, such as size, color, style, or other reusable dimensions.
- For restaurants, item options may overlap conceptually with modifiers, but they are not the same:
  - Item options usually describe variation identity, such as size.
  - Modifiers usually describe add-ons or sale-time choices, such as toppings.
- For display planning, item options can help produce clean variation labels and avoid duplicating inconsistent text.

## Images

- Square catalog images are catalog objects that can be uploaded, attached, updated, and managed through Square image workflows.
- Images may attach to items, variations, categories, or other catalog contexts depending on Square support and object relationships.
- For Shopify design planning, Square images can be used as menu/product imagery only if usage rights, quality, aspect ratio, and public visibility are acceptable.
- Do not assume every Square item has an image. Design fallback states for missing images.
- Do not assume Square images are optimized for Shopify theme performance. If images will be rendered on Shopify, plan for resizing, alt text, cropping, lazy loading, and visual consistency.

## Inventory basics

- Catalog and inventory are related but separate. Catalog describes what can be sold; Inventory API tracks quantities, counts, and changes for stocked variations.
- Inventory is usually tracked at the variation/location level, not just the parent item level.
- In restaurant menus, inventory may be used inconsistently. Some restaurants track packaged goods but not prepared dishes.
- For static menu display, inventory may not matter. For live ordering or “sold out” behavior, inventory and availability must be verified directly in Square.
- Do not promise real-time availability on Shopify unless a production integration is intentionally built and tested.

## Orders

- Square Orders API creates and manages orders that can include catalog-based line items, custom line items, taxes, discounts, service charges, tenders/payments, and fulfillment data.
- Orders are distinct from catalog display. Showing a menu on Shopify does not create a Square order.
- If the client wants ordering, decide whether the website should:
  - Link to Square Online ordering.
  - Embed or point users to Square-hosted order pages where appropriate.
  - Build a custom Square ordering flow, which is a separate app/API project and not part of simple Shopify theme design.
- For ChatGPT Project behavior, recommend linking to existing Square ordering for most restaurant-site planning unless the user explicitly scopes a custom integration.

## Fulfillments

- Fulfillments describe how an order is completed, such as pickup, shipment, delivery, or managed fulfillment states.
- Restaurant workflows commonly care about pickup timing, delivery availability, order status, prep windows, and location selection.
- Fulfillment is operational and should not be faked in Shopify theme content. If the site only links to Square ordering, Square handles the fulfillment flow.
- If the merchant asks for custom ordering from Shopify, fulfillment design must be handled as a dedicated Square Orders implementation with merchant verification.

## Square Online / Sites API context

- The Sites API provides context for Square Online sites associated with a seller.
- For Shopify planning, Square Online may already host ordering pages, menu pages, or checkout experiences.
- Practical rule: if the client uses Square Online for ordering, Shopify can function as a marketing/front-of-house site that links to Square Online ordering rather than replacing it.
- Verify the merchant's current Square Online setup manually: site status, ordering links, fulfillment settings, item visibility, locations, and menus.

## Snippets API context

- The Snippets API is related to adding code snippets to Square Online sites.
- It is not a general-purpose way to inject Square menus into Shopify.
- For this project, understand Snippets API as Square Online customization context only. Do not use it as a Shopify theme-building mechanism.
- Any snippet/code injection into a live Square Online site should be treated as a production change requiring care, permissions, and testing.

## OAuth and permissions context

- OAuth is needed when an app acts on behalf of Square sellers, especially for production multi-merchant access.
- Reading catalog data requires appropriate item/catalog read permissions. Writing catalog data requires write permissions.
- Orders, payments, inventory, sites, snippets, and customer workflows require their own relevant scopes/permissions.
- Access tokens are sensitive secrets and must not be embedded in Shopify theme code, public JavaScript, project knowledge, or generated documentation.
- For the assistant, do not invent credentials, scopes, or dashboard paths. Ask the user to verify in Square Developer Dashboard when implementation becomes relevant.

## Web Payments SDK context

- Square Web Payments SDK is for collecting payment details in a web client and producing payment tokens that are processed server-side with Square Payments API.
- It is not needed for a simple menu display or a Shopify landing page that links to Square Online ordering.
- Payment tokenization requires correct application ID, location ID, environment, buyer verification where required, and a secure backend payment flow.
- Do not recommend putting Square payment processing directly into a Shopify theme without a proper backend and clear project scope.
- For most restaurant website projects, linking to Square Online ordering is safer and simpler than building custom Square payments.

## What matters for restaurant/menu website workflow

- Start by identifying the source of truth:
  - If the restaurant manages menu data in Square, Square should remain the source of truth.
  - Shopify should not become a second manual menu database unless the merchant accepts duplicate maintenance.
- Clarify the desired user journey:
  - Browse menu only.
  - Browse menu and click “Order Online.”
  - Browse menu with live prices/availability.
  - Full custom ordering and payment flow.
- Separate content layers:
  - Marketing content: hero, story, location, hours, catering, events, SEO pages.
  - Menu content: items, categories, descriptions, prices, images, modifiers.
  - Commerce flow: cart, checkout, payment, order creation, fulfillment.
- Build design recommendations around flexible states:
  - Items with one price.
  - Items with multiple variations.
  - Items with modifiers.
  - Items without images.
  - Categories with many/few items.
  - Temporarily unavailable or sold-out items.
- Always ask the merchant to verify actual ordering behavior inside Square Dashboard/Square Online before launch.

## What matters when connecting Shopify planning with Square-managed menu data

- Shopify can be used as the public brand and content layer while Square manages menu/ordering data.
- Recommended low-risk pattern:
  - Shopify page presents restaurant brand, location, hours, story, featured menu sections, and calls to action.
  - “Order Online” buttons link to Square Online ordering or another Square-hosted order experience.
  - Menu display can be static, periodically updated, or powered by a future integration depending on scope.
- Avoid claiming Shopify checkout will process Square menu orders unless a custom integration is explicitly planned.
- If Shopify displays Square menu data, document whether it is:
  - Manually copied from Square.
  - Exported/imported periodically.
  - Fetched dynamically from Square APIs.
  - Merely represented as design mock content.
- Keep merchant operations in mind: restaurant owners usually need fewer duplicate data-entry tasks, not more.

## Limitations and manual verification checklist

Important limitations the assistant should remember:

- Square Dashboard UI paths can change. Exact click paths must be manually verified.
- API docs describe capabilities, but the merchant's actual Square account, country, location settings, enabled products, permissions, and subscription/features can affect availability.
- Catalog data does not automatically mean public website visibility.
- Square Online visibility/orderability settings may differ from Catalog API existence.
- Inventory and sold-out logic may be location-specific and may not be tracked for all restaurant items.
- Modifiers and variation rules can be complex; a simplified menu display may not represent full ordering logic.
- Payment/order processing requires secure backend implementation, correct permissions, production credentials, location IDs, and testing.
- Access tokens and secrets must never be placed in Shopify theme files or public project knowledge.
- Images may be missing, inconsistent, private, low-resolution, or not licensed/approved for marketing use.
- Square API behavior and permissions should be checked against current official docs before production development.

Manual verification items before using Square data for a live restaurant website:

- Confirm which Square account/location is the source of truth.
- Confirm whether Square Online is active and which ordering URL should be used.
- Confirm menu/category ordering and public item visibility.
- Confirm item variation labels and how prices should display.
- Confirm modifier visibility for public menu display.
- Confirm images are approved for website use.
- Confirm whether sold-out/inventory status should appear on the website.
- Confirm taxes, fees, fulfillment, pickup/delivery settings, and order timing inside Square if ordering is linked or integrated.
- Confirm OAuth scopes and app credentials only if a real integration project is approved.

## Assistant behavior rules

- Treat Square as authoritative for menu/item data when the merchant manages items in Square.
- Recommend Shopify primarily for design, presentation, marketing content, and routing users to ordering unless the user explicitly scopes a deeper integration.
- Never imply a static Shopify menu can process Square orders.
- Never expose or request secrets in public code or theme files.
- Use Square terminology accurately: item, variation, category, modifier, modifier list, item option, image, inventory, order, fulfillment, site, snippet, OAuth permission, Web Payments SDK.
- For any exact Dashboard navigation, say it must be verified because Square's UI may change.
