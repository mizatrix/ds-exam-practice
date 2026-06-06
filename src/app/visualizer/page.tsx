"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const InsertionSortViz = dynamic(() => import("@/components/visualizer/InsertionSortViz"), { ssr: false });
const LinkedListViz = dynamic(() => import("@/components/visualizer/LinkedListViz"), { ssr: false });
const StackViz = dynamic(() => import("@/components/visualizer/StackViz"), { ssr: false });
const QueueViz = dynamic(() => import("@/components/visualizer/QueueViz"), { ssr: false });
const BSTViz = dynamic(() => import("@/components/visualizer/BSTViz"), { ssr: false });

type VizMode = "insertion-sort" | "sll" | "dll" | "cdll" | "stack" | "queue" | "bst";

const vizOptions: { id: VizMode; label: string; icon: string; desc: string }[] = [
  { id: "insertion-sort", label: "Insertion Sort", icon: "🔄", desc: "Watch elements slide into position step by step" },
  { id: "stack", label: "Stack", icon: "🗄️", desc: "Push, pop, and peek with overflow / underflow" },
  { id: "queue", label: "Circular Queue", icon: "📥", desc: "ADDQ / DELETEQ around a ring with front & rear" },
  { id: "bst", label: "Binary Search Tree", icon: "🌳", desc: "Insert, search, and animate the three traversals" },
  { id: "sll", label: "Singly Linked List", icon: "➡️", desc: "Insert and delete nodes with forward-only pointers" },
  { id: "dll", label: "Doubly Linked List", icon: "↔️", desc: "Bidirectional traversal with prev and next pointers" },
  { id: "cdll", label: "Circular DLL", icon: "🔁", desc: "Closed ring structure with no NULL pointers" },
];

export default function VisualizerPage() {
  const [mode, setMode] = useState<VizMode>("insertion-sort");

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Visualizer</span>
        </div>
        <h1>Interactive Visualizer</h1>
        <p>Watch algorithms and data structures come to life with step-by-step animations.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Mode selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
          {vizOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              style={{
                padding: "var(--space-4)",
                borderRadius: "var(--radius-lg)",
                border: mode === opt.id ? "2px solid var(--primary)" : "1px solid var(--outline-variant)",
                background: mode === opt.id ? "rgba(99, 102, 241, 0.1)" : "var(--surface-low)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                color: "var(--on-surface)",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "var(--space-2)" }}>{opt.icon}</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "var(--space-1)" }}>{opt.label}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        {/* Visualizer area */}
        <div>
          <p className="label" style={{ marginBottom: "var(--space-3)" }}>LIVE VISUALIZATION</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>
            {vizOptions.find((v) => v.id === mode)?.icon} {vizOptions.find((v) => v.id === mode)?.label}
          </h2>

          {mode === "insertion-sort" && <InsertionSortViz initialArray={[7, 3, 9, 2, 6, 4, 8, 1]} />}
          {mode === "stack" && <StackViz />}
          {mode === "queue" && <QueueViz />}
          {mode === "bst" && <BSTViz />}
          {(mode === "sll" || mode === "dll" || mode === "cdll") && <LinkedListViz key={mode} type={mode} />}
        </div>

        {/* Quick tips */}
        <div style={{ marginTop: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>QUICK TIPS</p>
          <div className="concept-grid">
            <div className="concept-item" style={{ animationDelay: "0s" }}>
              <h4>⏭ Step Mode</h4>
              <p>Use the <strong>Step</strong> button to advance one operation at a time. Perfect for understanding each comparison and shift.</p>
            </div>
            <div className="concept-item" style={{ animationDelay: "0.08s" }}>
              <h4>🎚️ Speed Control</h4>
              <p>Adjust the speed slider to watch faster or slower. Start slow to build intuition, then speed up once you understand the pattern.</p>
            </div>
            <div className="concept-item" style={{ animationDelay: "0.16s" }}>
              <h4>🎨 Color Legend</h4>
              <p><span style={{ color: "#22c55e" }}>Green</span> = sorted, <span style={{ color: "#facc15" }}>Yellow</span> = current key, <span style={{ color: "#ef4444" }}>Red</span> = comparing, <span style={{ color: "rgba(99,102,241,0.8)" }}>Indigo</span> = unsorted.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
