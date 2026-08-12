const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules"]);
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function existsFromHtml(htmlFile, value) {
  if (
    value.startsWith("#") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  ) {
    return true;
  }

  const cleanValue = value.split("#")[0].split("?")[0];
  if (!cleanValue) return true;

  const target = cleanValue.startsWith("/")
    ? path.join(root, cleanValue)
    : path.resolve(path.dirname(htmlFile), cleanValue);

  return fs.existsSync(target);
}

walk(root);

const issues = [];
const assetPattern = /\b(?:href|src)=["']([^"']+)["']/g;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, "utf8");
  for (const match of content.matchAll(assetPattern)) {
    if (!existsFromHtml(htmlFile, match[1])) {
      issues.push(`${path.relative(root, htmlFile)} -> ${match[1]}`);
    }
  }
}

if (issues.length > 0) {
  console.error("Local links or assets not found:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Local links checked in ${htmlFiles.length} HTML files.`);
