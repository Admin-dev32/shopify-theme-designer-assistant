import fs from "fs/promises";
import path from "path";

const OUT_DIR = path.resolve("knowledge/square/raw-docs");

const DOCS = [
  ["catalog-api-overview", "https://developer.squareup.com/docs/catalog-api/what-it-does"],
  ["design-a-catalog", "https://developer.squareup.com/docs/catalog-api/design-a-catalog"],
  ["build-with-catalog", "https://developer.squareup.com/docs/catalog-api/build-with-catalog"],
  ["update-catalog-objects", "https://developer.squareup.com/docs/catalog-api/update-catalog-objects"],
  ["search-catalog-objects", "https://developer.squareup.com/docs/catalog-api/search-catalog-objects"],
  ["categorize-catalog-items", "https://developer.squareup.com/docs/catalog-api/categorize-catalog-items"],
  ["manage-menus", "https://developer.squareup.com/docs/catalog-api/manage-menus"],
  ["enable-modifiers-on-items", "https://developer.squareup.com/docs/catalog-api/enable-modifiers-on-items"],
  ["item-options", "https://developer.squareup.com/docs/catalog-api/item-options"],
  ["catalog-images", "https://developer.squareup.com/docs/catalog-api/cookbook/create-catalog-image"],
  ["upload-catalog-images", "https://developer.squareup.com/docs/catalog-api/upload-and-attach-images"],
  ["manage-catalog-images", "https://developer.squareup.com/docs/catalog-api/manage-images"],
  ["orders-api-overview", "https://developer.squareup.com/docs/orders-api/what-it-does"],
  ["create-orders", "https://developer.squareup.com/docs/orders-api/create-orders"],
  ["manage-fulfillments", "https://developer.squareup.com/docs/orders-api/fulfillments"],
  ["web-payments-overview", "https://developer.squareup.com/docs/web-payments/overview"],
  ["web-payments-quickstart", "https://developer.squareup.com/docs/web-payments/quickstart/add-sdk-to-web-client"],
  ["sites-api-overview", "https://developer.squareup.com/docs/sites-api/overview"],
  ["snippets-api-overview", "https://developer.squareup.com/docs/snippets-api/overview"],
  ["oauth-api-overview", "https://developer.squareup.com/docs/oauth-api/overview"],
  ["square-permissions", "https://developer.squareup.com/reference/square/oauth-api"],
  ["inventory-api-overview", "https://developer.squareup.com/docs/inventory-api/what-it-does"]
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
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "square-knowledge-downloader/1.0",
        "Accept": "text/html"
      }
    });
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
  await fs.mkdir(path.resolve("knowledge/square"), { recursive: true });

  const results = [];

  for (const [name, url] of selectedDocs) {
    const result = await downloadOne(name, url);
    results.push(result);
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  const downloaded = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);

  const index = [
    "# Square Documentation Download Index",
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

  await fs.writeFile(path.resolve("knowledge/square/index.md"), index, "utf8");

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
