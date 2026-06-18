import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const existing = new Set([
  ...htmlFiles,
  "assets/styles.css",
  "assets/script.js",
  "assets/repyyc-logo.png",
  "assets/repyyc-brokerage.png",
  "assets/calgary-map.webp",
  "README.md",
  "sitemap.xml",
  "downloads/calgary-duplex-buyer-checklist.txt",
  "downloads/calgary-duplex-seller-launch-plan.txt"
]);

let failures = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (!html.includes("<h1")) {
    console.error(`Missing h1: ${file}`);
    failures += 1;
  }
  if (!html.includes("application/ld+json")) {
    console.error(`Missing schema: ${file}`);
    failures += 1;
  }
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (ref.startsWith("http") || ref.startsWith("#") || ref.startsWith("mailto:") || ref.startsWith("tel:")) continue;
    const clean = ref.split("#")[0].split("?")[0];
    if (!clean) continue;
    if (!existing.has(clean)) {
      console.error(`Missing reference from ${file}: ${ref}`);
      failures += 1;
    }
  }
}

if (failures) {
  console.error(`${failures} site checks failed.`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files and local asset references.`);
