export const graphData = {
  nodes: [
    { id: "n1", label: "Prompt", type: "input", x: 80, y: 120, weight: 12 },
    { id: "n2", label: "Tokenizer", type: "process", x: 260, y: 120, weight: 24 },
    { id: "n3", label: "KV Cache", type: "process", x: 440, y: 90, weight: 16 },
    { id: "n4", label: "Decoder", type: "process", x: 620, y: 140, weight: 36 },
    { id: "n5", label: "Logits", type: "output", x: 800, y: 120, weight: 18 },
    { id: "n6", label: "OTLP Export", type: "telemetry", x: 620, y: 260, weight: 20 },
    { id: "n7", label: "Grafana", type: "telemetry", x: 800, y: 260, weight: 14 },
  ],
  edges: [
    { id: "e1", from: "n1", to: "n2" },
    { id: "e2", from: "n2", to: "n3" },
    { id: "e3", from: "n3", to: "n4" },
    { id: "e4", from: "n4", to: "n5" },
    { id: "e5", from: "n4", to: "n6" },
    { id: "e6", from: "n6", to: "n7" },
  ],
};
