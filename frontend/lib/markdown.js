import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function renderMarkdown(markdown) {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}
