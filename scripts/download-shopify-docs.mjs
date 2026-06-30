import fs from "fs/promises";
import path from "path";

const OUT_DIR = path.resolve("knowledge/shopify/raw-docs");

const DOCS = [
  ["shopify-docs-home", "https://shopify.dev/docs"],
  ["shopify-themes", "https://shopify.dev/docs/storefronts/themes"],
  ["theme-architecture", "https://shopify.dev/docs/storefronts/themes/architecture"],
  ["online-store-2-0", "https://shopify.dev/docs/storefronts/themes/os20"],
  ["sections", "https://shopify.dev/docs/storefronts/themes/architecture/sections"],
  ["section-schema", "https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema"],
  ["templates-sections-blocks", "https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks"],
  ["theme-settings", "https://shopify.dev/docs/storefronts/themes/architecture/settings"],
  ["liquid-reference", "https://shopify.dev/docs/api/liquid"],
  ["liquid-objects", "https://shopify.dev/docs/api/liquid/objects"],
  ["liquid-tags", "https://shopify.dev/docs/api/liquid/tags"],
  ["liquid-filters", "https://shopify.dev/docs/api/liquid/filters"],
  ["image-url-filter", "https://shopify.dev/docs/api/liquid/filters/image_url"],
  ["image-tag-filter", "https://shopify.dev/docs/api/liquid/filters/image_tag"],
  ["collection-object", "https://shopify.dev/docs/api/liquid/objects/collection"],
  ["product-object", "https://shopify.dev/docs/api/liquid/objects/product"],
  ["github-theme-integration", "https://shopify.dev/docs/storefronts/themes/tools/github"]
];

function argValue(name, fallback) {
  const arg = process.argv.find((item) => item.startsWith(`--${name}=`));
  if (!arg) return fallback;
  return arg.split("=")[1] || fallback;
}

const isDryRun = process.argv.includes("--dry-run");
const limit = Number(argValue("limit", DOCS.length));
const retryCount = Number(argValue("retry", 0));
const timeoutMs = Number(argValue("timeout", 30000));

function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<\/(h1|h2|h3|h4|p|li|pre|code|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "shopify-theme-designer-assistant/1.0",
        "Accept": "text/html"
      }
    });

    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function downloadOne(name, url) {
  let lastError;

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      console.log(`Downloading ${name} (${attempt + 1}/${retryCount + 1})`);
      const response = await fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const html = await response.text();
      const text = cleanHtml(html);

      const markdown = `# ${name}

Source: ${url}
Downloaded: ${new Date().toISOString()}

---

${text}
`;

      await fs.writeFile(path.join(OUT_DIR, `${name}.md`), markdown, "utf8");
      return { ok: true, name, url };
    } catch (error) {
      lastError = error;
      console.log(`Failed ${name}: ${error.message}`);
    }
  }

  return { ok: false, name, url, error: lastError?.message || "Unknown error" };
}

async function main() {
  const selectedDocs = DOCS.slice(0, limit);

  if (isDryRun) {
    console.log("Dry run. No files will be downloaded.");
    selectedDocs.forEach(([name, url], index) => {
      console.log(`${index + 1}. ${name} - ${url}`);
    });
    return;
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.resolve("knowledge/shopify"), { recursive: true });

  const results = [];

  for (const [name, url] of selectedDocs) {
    const result = await downloadOne(name, url);
    results.push(result);
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  const downloaded = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);

  const index = [
    "# Shopify Documentation Download Index",
    "",
    `Updated: ${new Date().toISOString()}`,
    "",
    `Downloaded count: ${downloaded.length}`,
    `Failed count: ${failed.length}`,
    "",
    "## Downloaded",
    "",
    ...downloaded.map((item) => `- [${item.name}](./raw-docs/${item.name}.md) - ${item.url}`),
    "",
    "## Failed",
    "",
    ...failed.map((item) => `- ${item.name} - ${item.url} - ${item.error}`)
  ].join("\n");

  await fs.writeFile(path.resolve("knowledge/shopify/index.md"), index, "utf8");

  console.log("");
  console.log("Download summary");
  console.log(`Downloaded: ${downloaded.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log("");
    console.log("Some docs failed. If you see DNS errors like EAI_AGAIN, try again later or check your internet/DNS.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
