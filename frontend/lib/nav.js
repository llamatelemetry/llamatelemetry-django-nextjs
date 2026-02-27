export const nav = [
  {
    section: "Home",
    items: [{ label: "Home", href: "/" }],
  },
  {
    section: "Get Started",
    items: [
      { label: "Overview", href: "/get-started" },
      { label: "Installation", href: "/get-started/installation" },
      { label: "Quickstart", href: "/get-started/quickstart" },
      { label: "Kaggle Quickstart", href: "/get-started/kaggle-quickstart" },
    ],
  },
  {
    section: "Guides",
    items: [
      { label: "Inference Engine", href: "/guides/inference-engine" },
      { label: "Server Management", href: "/guides/server-management" },
      { label: "Model Management", href: "/guides/model-management" },
      { label: "API Client", href: "/guides/api-client" },
      { label: "Telemetry and Observability", href: "/guides/telemetry-observability" },
      { label: "Kaggle Environment", href: "/guides/kaggle-environment" },
      { label: "Examples Cookbook", href: "/guides/examples-cookbook" },
      { label: "Graphistry and RAPIDS", href: "/guides/graphistry-rapids" },
      { label: "Quantization", href: "/guides/quantization" },
      { label: "Unsloth Integration", href: "/guides/unsloth" },
      { label: "CUDA Optimizations", href: "/guides/cuda-optimizations" },
      { label: "Jupyter Workflows", href: "/guides/jupyter-workflows" },
      { label: "Louie Knowledge Graphs", href: "/guides/louie-knowledge-graphs" },
      { label: "Troubleshooting", href: "/guides/troubleshooting" },
    ],
  },
  {
    section: "API Reference",
    items: [
      { label: "Reference Index", href: "/reference" },
      { label: "Core API", href: "/reference/core-api" },
      { label: "Server and Models", href: "/reference/server-models" },
      { label: "Client API", href: "/reference/client-api" },
      { label: "GGUF API", href: "/reference/gguf-api" },
      { label: "Multi-GPU and NCCL", href: "/reference/multigpu-nccl" },
      { label: "Telemetry API", href: "/reference/telemetry-api" },
      { label: "Kaggle API", href: "/reference/kaggle-api" },
      { label: "Graphistry API", href: "/reference/graphistry-api" },
      { label: "Quantization and Unsloth API", href: "/reference/quantization-unsloth" },
      { label: "CUDA and Inference API", href: "/reference/cuda-inference-api" },
      { label: "Jupyter, Chat, and Embeddings API", href: "/reference/jupyter-chat-embeddings" },
      { label: "Louie API", href: "/reference/louie-api" },
    ],
  },
  {
    section: "Notebooks",
    items: [
      { label: "Notebook Hub", href: "/notebooks" },
      { label: "Foundation Track", href: "/notebooks/foundation" },
      { label: "Integration Track", href: "/notebooks/integration" },
      { label: "Advanced Track", href: "/notebooks/advanced" },
      { label: "Observability Track", href: "/notebooks/observability" },
    ],
  },
  {
    section: "Project",
    items: [
      { label: "Architecture", href: "/project/architecture" },
      { label: "FAQ", href: "/project/faq" },
      { label: "README Map", href: "/project/readme-map" },
      { label: "Changelog", href: "/project/changelog" },
      { label: "Contributing", href: "/project/contributing" },
    ],
  },
];

export const flatNavItems = nav.flatMap((section) => section.items.map((item) => ({ ...item, section: section.section })));

export function normalizeHref(href) {
  if (href === "/") {
    return "/";
  }
  return href.replace(/\/$/, "");
}

export function getPrevNext(currentHref) {
  const normalized = normalizeHref(currentHref);
  const items = flatNavItems.map((item) => ({
    ...item,
    href: normalizeHref(item.href),
  }));
  const index = items.findIndex((item) => item.href === normalized);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}
