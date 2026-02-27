"use client";

import { telemetryTrace } from "../lib/telemetry-data";
import { useDocUIStore } from "../lib/store";

export default function TraceAnatomy() {
  const { selectedSpanId, selectSpan } = useDocUIStore();
  const selected = telemetryTrace.semantics.find((item) => item.id === selectedSpanId) || telemetryTrace.semantics[0];

  return (
    <section className="trace-anatomy">
      <div className="trace-list">
        <div className="eyebrow">Semantic conventions</div>
        <h1>Trace anatomy</h1>
        <p>Understand which spans and attributes give you observability credibility.</p>
        <div className="trace-items">
          {telemetryTrace.semantics.map((item) => (
            <button
              key={item.id}
              className={selected.id === item.id ? "trace-item active" : "trace-item"}
              onClick={() => selectSpan(item.id)}
            >
              <div className="trace-item-title">{item.name}</div>
              <div className="trace-item-desc">{item.description}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="trace-detail">
        <div className="trace-detail-header">
          <h2>{selected.name}</h2>
          <div className="trace-pill">Required + Optional attributes</div>
        </div>
        <p>{selected.description}</p>
        <div className="trace-attributes">
          <div>
            <div className="trace-attr-title">Required</div>
            <ul>
              {selected.required.map((attr) => (
                <li key={attr}>{attr}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="trace-attr-title">Optional</div>
            <ul>
              {selected.optional.map((attr) => (
                <li key={attr}>{attr}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="trace-callout">
          <h3>Why it matters</h3>
          <p>
            These attributes power slice-and-dice analysis across model versions, prompt sizes, and pipeline stages.
            Consistent naming enables correlation across traces, metrics, and logs.
          </p>
        </div>
      </div>
    </section>
  );
}
