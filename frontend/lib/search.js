import fs from "fs";
import path from "path";

const DOCS_ROOT = path.join(process.cwd(), "..", "docs");

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function extractHeadings(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace(/^##\s+/, "").trim());
}

function categorize(relativePath) {
  if (relativePath.startsWith("get-started/")) return "Get Started";
  if (relativePath.startsWith("guides/")) return "Guides";
  if (relativePath.startsWith("reference/")) return "API Reference";
  if (relativePath.startsWith("notebooks/")) return "Notebooks";
  if (relativePath.startsWith("project/")) return "Project";
  return "Docs";
}

function hrefFromPath(relativePath) {
  const withoutExt = relativePath.replace(/\.md$/, "");
  if (withoutExt === "index") return "/";
  if (withoutExt.endsWith("/index")) return "/" + withoutExt.replace(/\/index$/, "");
  return "/" + withoutExt;
}

export function getSearchIndex() {
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  };
  walk(DOCS_ROOT);

  return files.map((filePath) => {
    const relativePath = path.relative(DOCS_ROOT, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const title = extractTitle(content);
    const headings = extractHeadings(content);
    const body = stripMarkdown(content);
    return {
      id: relativePath,
      title,
      headings,
      excerpt: body.slice(0, 180) + (body.length > 180 ? "…" : ""),
      body,
      href: hrefFromPath(relativePath),
      category: categorize(relativePath),
    };
  });
}
