import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
  ],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
    pre: [...(defaultSchema.attributes?.pre || []), "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
    th: [...(defaultSchema.attributes?.th || []), "colspan", "rowspan", "align"],
    td: [...(defaultSchema.attributes?.td || []), "colspan", "rowspan", "align"],
  },
};

export async function renderMarkdown(markdown) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
