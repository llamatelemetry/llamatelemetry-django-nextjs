"use client";

import { telemetryTrace } from "../lib/telemetry-data";
import { useDocUIStore } from "../lib/store";

function formatMs(value) {
  return `${value} ms`;
}

export default function TelemetryDemo() {
  const { telemetryFilters, setTelemetryFilter, selectedSpanId, selectSpan } = useDocUIStore();

  const filteredSpans = telemetryTrace.spans.filter((span) => {
    if (telemetryFilters.service !== "all" && span.service !== telemetryFilters.service) {
      return false;
    }
    if (telemetryFilters.status !== "all" && span.status !== telemetryFilters.status) {
      return false;
    }
    if (telemetryFilters.search && !span.name.toLowerCase().includes(telemetryFilters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const selectedSpan =
    telemetryTrace.spans.find((span) => span.id === selectedSpanId) || telemetryTrace.spans[0];

  return (
    <section className="telemetry-demo">
      <div className="telemetry-header">
        <div>
          <div className="eyebrow">Interactive demo</div>
          <h1>Telemetry trace viewer</h1>
          <p>Filter spans, inspect attributes, and validate the inference pipeline in one place.</p>
        </div>
        <div className="telemetry-filters">
          <select
            value={telemetryFilters.service}
            onChange={(event) => setTelemetryFilter("service", event.target.value)}
          >
            <option value="all">All services</option>
            {telemetryTrace.services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <select
            value={telemetryFilters.status}
            onChange={(event) => setTelemetryFilter("status", event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="ok">ok</option>
            <option value="error">error</option>
          </select>
          <input
            placeholder="Search spans…"
            value={telemetryFilters.search}
            onChange={(event) => setTelemetryFilter("search", event.target.value)}
          />
        </div>
      </div>

      <div className="telemetry-grid">
        <div className="telemetry-list">
          {filteredSpans.map((span) => (
            <button
              key={span.id}
              className={selectedSpan.id === span.id ? "span-row active" : "span-row"}
              onClick={() => selectSpan(span.id)}
            >
              <div>
                <div className="span-name">{span.name}</div>
                <div className="span-meta">
                  {span.service} · {formatMs(span.duration)}
                </div>
              </div>
              <div className="span-status">{span.status}</div>
            </button>
          ))}
        </div>
        <div className="telemetry-detail">
          <div className="telemetry-detail-header">
            <h2>{selectedSpan.name}</h2>
            <div className="span-pill">{selectedSpan.service}</div>
          </div>
          <div className="telemetry-timeline">
            {telemetryTrace.spans.map((span) => (
              <div key={span.id} className="timeline-row">
                <div className="timeline-label">{span.name}</div>
                <div className="timeline-track">
                  <div
                    className={selectedSpan.id === span.id ? "timeline-bar active" : "timeline-bar"}
                    style={{
                      left: `${(span.start / 1000) * 100}%`,
                      width: `${(span.duration / 1000) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="telemetry-attributes">
            <h3>Attributes</h3>
            <div className="attribute-grid">
              {Object.entries(selectedSpan.attributes).map(([key, value]) => (
                <div key={key} className="attribute-row">
                  <span>{key}</span>
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          {selectedSpan.events ? (
            <div className="telemetry-events">
              <h3>Events</h3>
              {selectedSpan.events.map((event) => (
                <div key={event.name} className="event-row">
                  <span>{formatMs(event.time)}</span>
                  <span>{event.name}</span>
                  <span>{event.detail}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
