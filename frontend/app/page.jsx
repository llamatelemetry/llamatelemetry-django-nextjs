import { notFound } from "next/navigation";

import PrevNext from "../components/PrevNext";
import { getDoc, slugToHref } from "../lib/docs";
import { renderMarkdown } from "../lib/markdown";

export default async function Page() {
  const doc = getDoc([]);
  if (!doc) {
    notFound();
  }
  const html = await renderMarkdown(doc.content);

  return (
    <article className="doc">
      <div className="doc-meta">Home · llamatelemetry v0.1.0</div>
      <div className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
      <PrevNext currentHref={slugToHref([])} />
    </article>
  );
}
