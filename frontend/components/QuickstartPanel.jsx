"use client";

import Link from "next/link";

const steps = [
  {
    title: "Install",
    detail: "pip install from GitHub with CUDA extras",
    code: null,
  },
  {
    title: "Run llama-server",
    detail: "Launch local inference",
    code: "llama-server --model gemma-3-1b-Q4_K_M.gguf --port 8080",
  },
  {
    title: "Enable OTLP",
    detail: "Export traces to Grafana/Traceloop",
    code: "export OTEL_EXPORTER_OTLP_ENDPOINT=\"https://otlp.grafana.net\"",
  },
];

function buildSteps(version) {
  return steps.map((step) =>
    step.title === "Install"
      ? {
          ...step,
          code: `pip install --no-cache-dir --force-reinstall \\
  git+https://github.com/llamatelemetry/llamatelemetry.git@${version}`,
        }
      : step
  );
}

export default function QuickstartPanel({ version }) {
  const resolvedVersion = version || "v0.1.0";
  const resolvedSteps = buildSteps(resolvedVersion);
  return (
    <section className="quickstart-panel">
      <div className="quickstart-header">
        <div>
          <div className="eyebrow">Get running in 10 minutes</div>
          <h2>Quickstart pipeline</h2>
          <p>Install, run inference, and confirm telemetry in Grafana with minimal setup.</p>
        </div>
        <Link className="primary-button" href="/get-started/quickstart">
          Open Quickstart
        </Link>
      </div>
      <div className="quickstart-steps">
        {resolvedSteps.map((step) => (
          <div key={step.title} className="quickstart-card">
            <div className="quickstart-title">{step.title}</div>
            <div className="quickstart-detail">{step.detail}</div>
            <pre>
              <code>{step.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}
