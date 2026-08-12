const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules"]);
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

walk(root);

const issues = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const filePath = relative(file);

  if (file.endsWith(".html") && content.includes("cdn.tailwindcss.com")) {
    issues.push(`${filePath}: uses Tailwind CDN`);
  }

  const blankTargets = content.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];
  for (const tag of blankTargets) {
    if (!tag.includes('rel="noopener noreferrer"')) {
      issues.push(`${filePath}: target blank without noopener noreferrer`);
    }
  }

  if (file.endsWith(".html")) {
    const scriptJsRefs = content.match(/<script\b[^>]*\bsrc=["'][^"']*script\.js["'][^>]*>/g) || [];
    if (scriptJsRefs.length > 1) {
      issues.push(`${filePath}: script.js referenced ${scriptJsRefs.length} times`);
    }
  }
}

if (issues.length > 0) {
  console.error("Security checks failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Security checks passed in ${files.length} files.`);
