"use client";

import { graphData } from "../lib/graph-data";
import { useDocUIStore } from "../lib/store";

const nodeTypes = ["all", "input", "process", "output", "telemetry"];

export default function GraphDemo() {
  const { graphFilters, setGraphFilter, selectedNodeId, selectNode } = useDocUIStore();

  const filteredNodes = graphData.nodes.filter((node) => {
    if (graphFilters.type !== "all" && node.type !== graphFilters.type) {
      return false;
    }
    if (graphFilters.search && !node.label.toLowerCase().includes(graphFilters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const nodeIds = new Set(filteredNodes.map((node) => node.id));
  const filteredEdges = graphData.edges.filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to));

  const selected = graphData.nodes.find((node) => node.id === selectedNodeId) || filteredNodes[0];

  return (
    <section className="graph-demo">
      <div className="graph-header">
        <div>
          <div className="eyebrow">Interactive demo</div>
          <h1>Inference graph explorer</h1>
          <p>Trace runtime flow from prompt to telemetry export with a graph-style view.</p>
        </div>
        <div className="graph-filters">
          <input
            placeholder="Search nodes…"
            value={graphFilters.search}
            onChange={(event) => setGraphFilter("search", event.target.value)}
          />
          <div className="chip-grid">
            {nodeTypes.map((type) => (
              <button
                key={type}
                className={graphFilters.type === type ? "chip chip-active" : "chip"}
                onClick={() => setGraphFilter("type", type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="graph-layout">
        <div className="graph-canvas">
          <svg viewBox="0 0 900 360" role="img" aria-label="Inference graph">
            {filteredEdges.map((edge) => {
              const from = graphData.nodes.find((node) => node.id === edge.from);
              const to = graphData.nodes.find((node) => node.id === edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={edge.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId) ? "edge active" : "edge"}
                />
              );
            })}
            {filteredNodes.map((node) => (
              <g
                key={node.id}
                className={selected && selected.id === node.id ? "node active" : "node"}
                onClick={() => selectNode(node.id)}
                role="button"
                tabIndex={0}
              >
                <circle cx={node.x} cy={node.y} r={16 + node.weight / 6} />
                <text x={node.x} y={node.y + 32} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="graph-detail">
          {selected ? (
            <>
              <div className="graph-detail-title">{selected.label}</div>
              <div className="graph-detail-meta">Type: {selected.type}</div>
              <p>
                This node represents the {selected.label.toLowerCase()} stage of the runtime. Use it to understand
                performance bottlenecks and telemetry impact.
              </p>
              <div className="graph-detail-metrics">
                <div>
                  <span>Weight</span>
                  <strong>{selected.weight}</strong>
                </div>
                <div>
                  <span>Connections</span>
                  <strong>
                    {filteredEdges.filter((edge) => edge.from === selected.id || edge.to === selected.id).length}
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <p>No node selected.</p>
          )}
        </div>
      </div>
    </section>
  );
}
