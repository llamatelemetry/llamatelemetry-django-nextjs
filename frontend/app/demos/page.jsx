import Link from "next/link";

export const metadata = {
  title: "Interactive Demos",
};

export default function DemosPage() {
  return (
    <article className="doc">
      <div className="doc-hero">
        <div className="eyebrow">Proof demos</div>
        <h1>Interactive demos</h1>
        <p>Small, sandboxed experiences that show inference + telemetry behavior end-to-end.</p>
      </div>
      <div className="demo-grid">
        <Link className="demo-card" href="/demos/telemetry">
          <h3>Telemetry trace viewer</h3>
          <p>Filter spans, inspect attributes, and validate pipeline timing.</p>
          <span>Open demo →</span>
        </Link>
        <Link className="demo-card" href="/demos/graph">
          <h3>Inference graph explorer</h3>
          <p>Visualize runtime flow across nodes and telemetry export edges.</p>
          <span>Open demo →</span>
        </Link>
      </div>
    </article>
  );
}
