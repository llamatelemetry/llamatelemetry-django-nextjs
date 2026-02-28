import "server-only";
import siteDefaults from "../../site.json";

const DEFAULT_SITE = {
  name: siteDefaults.name || "llamatelemetry Documentation",
  version: siteDefaults.version || "v0.1.0",
  description:
    siteDefaults.description ||
    "Extensive documentation for llamatelemetry v0.1.0: inference, observability, Kaggle, GGUF, APIs, and notebooks.",
  titleTemplate: siteDefaults.titleTemplate || "%s - llamatelemetry Documentation",
};

const SITE_INFO_URL = process.env.SITE_INFO_URL || "http://127.0.0.1:8000/site.json";

function normalizeSiteInfo(data = {}) {
  return {
    name: data.name || DEFAULT_SITE.name,
    version: data.version || DEFAULT_SITE.version,
    description: data.description || DEFAULT_SITE.description,
    titleTemplate: data.titleTemplate || DEFAULT_SITE.titleTemplate,
  };
}

export function getSiteDefaults() {
  return DEFAULT_SITE;
}

export async function getSiteInfo() {
  try {
    const response = await fetch(SITE_INFO_URL, { next: { revalidate: 300 } });
    if (!response.ok) {
      return DEFAULT_SITE;
    }
    const data = await response.json();
    return normalizeSiteInfo(data);
  } catch (error) {
    return DEFAULT_SITE;
  }
}
