import fs from "fs";
import path from "path";

const DOCS_ROOT = path.join(process.cwd(), "..", "docs");

function resolveDocPath(slugParts) {
  const parts = slugParts && slugParts.length ? slugParts : ["index"];
  const joined = path.join(DOCS_ROOT, ...parts);
  const fileCandidate = `${joined}.md`;
  if (fs.existsSync(fileCandidate)) {
    return fileCandidate;
  }
  const indexCandidate = path.join(joined, "index.md");
  if (fs.existsSync(indexCandidate)) {
    return indexCandidate;
  }
  return null;
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "llamatelemetry Documentation";
}

export function getDoc(slugParts) {
  const filePath = resolveDocPath(slugParts);
  if (!filePath) {
    return null;
  }
  const content = fs.readFileSync(filePath, "utf8");
  const title = extractTitle(content);
  const relativePath = path.relative(DOCS_ROOT, filePath).replace(/\\/g, "/");
  return {
    content,
    title,
    relativePath,
  };
}

export function slugToHref(slugParts) {
  if (!slugParts || slugParts.length === 0) {
    return "/";
  }
  return `/${slugParts.join("/")}`;
}

export function hrefToSlug(href) {
  if (!href || href === "/") {
    return [];
  }
  return href.replace(/^\//, "").split("/");
}
