const fs = require("fs");
const path = require("path");

const root = process.cwd();
const siteUrl = "https://ezequielpaiva.com.br";
const lastmod = "2026-07-04";
const ignoredDirs = new Set([".git", "node_modules"]);
const htmlFiles = [];

const priorityByPath = new Map([
  ["index.html", "1.0"],
  ["doacao.html", "0.3"],
  ["404.html", "0.1"],
  ["servicos/terceirizacao-ti.html", "0.8"],
  ["servicos/ciberseguranca.html", "0.8"],
  ["servicos/consultoria-rede-firewall.html", "0.8"],
  ["projetos/dispemail/privacidade.html", "0.2"],
  ["projetos/dispemail/termos.html", "0.2"],
]);

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

function normalizePath(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function publicUrl(relativePath) {
  if (relativePath === "index.html") return `${siteUrl}/`;
  return `${siteUrl}/${relativePath}`;
}

function changefreq(relativePath) {
  if (relativePath === "404.html") return "yearly";
  if (relativePath === "doacao.html") return "yearly";
  if (relativePath.includes("/privacidade.html")) return "yearly";
  if (relativePath.includes("/termos.html")) return "yearly";
  return "monthly";
}

function priority(relativePath) {
  if (priorityByPath.has(relativePath)) return priorityByPath.get(relativePath);
  if (relativePath.startsWith("servicos/")) return "0.7";
  if (relativePath.startsWith("projetos/")) return "0.5";
  return "0.5";
}

function sortWeight(relativePath) {
  if (relativePath === "index.html") return `00:${relativePath}`;
  if (relativePath === "doacao.html") return `01:${relativePath}`;
  if (relativePath === "404.html") return `99:${relativePath}`;
  if (relativePath.startsWith("servicos/")) return `10:${relativePath}`;
  if (relativePath.startsWith("projetos/")) return `20:${relativePath}`;
  return `50:${relativePath}`;
}

walk(root);

const entries = htmlFiles
  .map(normalizePath)
  .sort((a, b) => sortWeight(a).localeCompare(sortWeight(b)));

const body = entries
  .map((relativePath) => [
    "  <url>",
    `    <loc>${publicUrl(relativePath)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq(relativePath)}</changefreq>`,
    `    <priority>${priority(relativePath)}</priority>`,
    "  </url>",
  ].join("\n"))
  .join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  body,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`Sitemap generated with ${entries.length} URLs.`);
