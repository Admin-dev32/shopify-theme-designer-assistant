# Codex Prompt System for Shopify Theme Work

Use these templates when asking Codex to edit a real Shopify theme repository. Replace bracketed placeholders before sending.

## Prompt: Inspect a real Shopify theme repo

```text
You are working in a real Shopify theme repo. Inspect the theme before suggesting or making edits.

Goal:
[Describe what I want to understand or change.]

Instructions:
- Identify the theme structure and relevant files before editing.
- Do not assume the homepage is the target.
- Determine the relevant template context: [home/product/collection/page/blog/article/search/cart/404/custom].
- Identify existing snippets for product cards, prices, images, buttons, icons, and navigation.
- Identify how the theme organizes CSS and JavaScript.
- Do not edit unrelated files.
- Use Shopify Online Store 2.0 rules.

Output:
- Relevant files found.
- Theme patterns to follow.
- Recommended implementation approach.
- Risks or questions before editing.
```

## Prompt: Plan a new section

```text
Inspect the real Shopify theme repo and plan a new Shopify Online Store 2.0 section.

Section goal:
[Describe the section.]

Target template/context:
[Specify template or say unknown and ask Codex to identify options.]

Instructions:
- Inspect relevant theme files before planning.
- Do not assume the section belongs on the homepage.
- Identify existing snippets to reuse, especially product-card/image/button snippets.
- Propose schema settings and blocks.
- Include fallback states.
- Use valid Shopify Liquid and schema principles.
- Use scoped CSS/JS if code is later needed.
- Do not edit files yet unless explicitly asked.

Output:
- Recommended files to create or edit.
- Section behavior and merchant controls.
- Data sources and dynamic source behavior.
- Desktop/mobile layout plan.
- Accessibility considerations.
- Testing checklist.
```

## Prompt: Build a new Shopify section

```text
Build a new Shopify Online Store 2.0 section in this real theme repo.

Section name:
[Name]

Goal and behavior:
[Describe desired behavior.]

Target template/context:
[Specify template; do not assume homepage.]

Instructions:
- Inspect the theme before editing.
- Identify relevant files and existing patterns.
- Create or edit only the files needed for this section.
- Do not edit unrelated files.
- Reuse existing snippets where appropriate, especially product cards.
- Use valid Liquid and valid schema JSON.
- Include a preset if merchants should add the section in the theme editor.
- Use scoped CSS and scoped JavaScript based on section ID.
- Include empty/fallback states for missing settings or data.
- Make it responsive and accessible.

After editing:
- Summarize changed files.
- Explain how to add/test the section in Shopify theme editor.
- Provide a testing checklist.
```

## Prompt: Edit a header

```text
Inspect and edit the Shopify theme header carefully.

Goal:
[Describe header change.]

Instructions:
- Inspect header-related sections, snippets, assets, and settings before editing.
- Identify whether the header is a section, group, snippet, or layout include.
- Do not assume the homepage; header changes are usually global.
- Do not edit unrelated files.
- Preserve existing menu, logo, cart, account, localization, predictive search, and mobile drawer behavior unless the task requires changes.
- Use valid Liquid and schema.
- Use scoped CSS/JS or follow the theme’s established header asset pattern.
- Maintain keyboard accessibility and focus states.

After editing:
- Summarize changed files.
- List any settings merchants need to configure.
- Provide desktop and mobile testing checklist.
```

## Prompt: Build collection/category tabs

```text
Build Shopify collection/category tabs in this real theme repo.

Goal:
[Describe the tab design and behavior.]

Target template/context:
[Specify template; do not assume homepage.]

Instructions:
- Inspect the theme before editing.
- Identify existing product-card snippets and reuse them if available.
- Use blocks where each block represents one tab/category.
- Each block should include a collection picker and optional label.
- Render products from the selected collection for each tab.
- Include fallback states for no collection selected and empty collections.
- Avoid manual product data unless explicitly required.
- Use valid Liquid and schema.
- Use scoped CSS and scoped JavaScript.
- Make tabs keyboard accessible.
- Do not edit unrelated files.

After editing:
- Summarize changed files.
- Explain how merchants configure tabs.
- Provide a Shopify editor testing checklist.
```

## Prompt: Debug a broken section or editor issue

```text
Debug this Shopify theme issue in the real theme repo.

Issue:
[Describe the problem, including template, URL, section name, and symptoms.]

Instructions:
- Inspect relevant files before editing.
- Do not assume the homepage is the affected template.
- Identify the actual template context and preview URL if possible.
- Check section schema, settings IDs, Liquid conditions, snippets, CSS, and JavaScript.
- Check whether JavaScript breaks Shopify editor section reloads.
- Check whether CSS is hiding content or leaking globally.
- Do not edit unrelated files.
- Make the smallest safe fix.
- Use Shopify Online Store 2.0 rules and valid Liquid/schema.

After editing:
- Explain root cause.
- Summarize changed files.
- Provide a focused testing checklist.
```

## Prompt: Review Shopify Liquid code

```text
Review this Shopify Liquid/theme code for correctness and editor compatibility.

Code or files to review:
[Paste code or identify files.]

Instructions:
- Check for valid Liquid and valid schema JSON.
- Check Shopify Online Store 2.0 compatibility.
- Check section presets, settings, blocks, and fallback states.
- Check whether the code assumes the wrong template context.
- Check image performance and accessibility.
- Check whether CSS/JS is scoped.
- Check whether existing theme snippets should be reused.
- Do not edit files unless explicitly asked.

Output:
- Issues found, grouped by severity.
- Recommended fixes.
- Any questions needed before implementation.
- Testing checklist for Shopify theme editor.
```
