import { notFound } from "next/navigation";

import PrevNext from "../components/PrevNext";
import QuickstartPanel from "../components/QuickstartPanel";
import { getDoc, slugToHref } from "../lib/docs";
import { renderMarkdown } from "../lib/markdown";
import { getSiteInfo } from "../lib/site";

export default async function Page() {
  const doc = getDoc([]);
  if (!doc) {
    notFound();
  }
  const html = await renderMarkdown(doc.content);
  const site = await getSiteInfo();
  const version = site.version || "v0.1.0";

  return (
    <article className="doc">
      <div className="doc-meta">Home · llamatelemetry {version}</div>
      <QuickstartPanel version={version} />
      <div className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
      <PrevNext currentHref={slugToHref([])} />
    </article>
  );
}
