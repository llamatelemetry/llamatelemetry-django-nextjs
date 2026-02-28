import { notFound } from "next/navigation";

import PrevNext from "../../components/PrevNext";
import { flatNavItems } from "../../lib/nav";
import { getDoc, slugToHref } from "../../lib/docs";
import { renderMarkdown } from "../../lib/markdown";
import { getSiteInfo } from "../../lib/site";

export async function generateStaticParams() {
  return flatNavItems
    .filter((item) => item.href !== "/")
    .map((item) => ({
      slug: item.href.replace(/^\//, "").split("/"),
    }));
}

export async function generateMetadata({ params }) {
  const doc = getDoc(params.slug || []);
  if (!doc) {
    return {};
  }
  return {
    title: doc.title,
  };
}

export default async function DocPage({ params }) {
  const slugParts = params.slug || [];
  const doc = getDoc(slugParts);
  if (!doc) {
    notFound();
  }
  const html = await renderMarkdown(doc.content);
  const href = slugToHref(slugParts);
  const site = await getSiteInfo();
  const version = site.version || "v0.1.0";

  return (
    <article className="doc">
      <div className="doc-meta">
        {doc.relativePath.replace(/\.md$/, "")} · llamatelemetry {version}
      </div>
      <div className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
      <PrevNext currentHref={href} />
    </article>
  );
}
