"use client";
import dynamic from "next/dynamic";
import Quiz from "@/components/quiz/Quiz";
import { stacksQuestions } from "@/data/questions/stacks";
import Link from "next/link";

const StackViz = dynamic(() => import("@/components/visualizer/StackViz"), { ssr: false });

const concepts = [
  { title: "🗄️ Stack ADT (LIFO)", desc: "A list where insertion and deletion happen only at one end — the top. Last-In, First-Out. push, pop, and top are all O(1). Implemented with an array or a linked list." },
  { title: "⬆️ Overflow / Underflow", desc: "PUSH checks top ≠ n before storing (else OVERFLOW). POP checks top ≠ 0 before removing (else UNDERFLOW). The array index `top` starts at 0 on an empty stack." },
  { title: "👀 TOP / Peek", desc: "Returns the most-recently pushed element WITHOUT removing it. It is O(1) — it reads STACK[top] directly and never scans the stack. A classic trap: TOP is not O(n)." },
  { title: "🔀 Multi-Stack in One Array", desc: "Two stacks can share one array growing from opposite ends; they collide when top1 + 1 == top2. With 3+ fixed regions, an overflowing stack shifts a neighbour's elements to borrow free space." },
  { title: "🧮 Infix → Postfix", desc: "Scan left→right: operands go straight to output; for an operator, compare its incoming priority (ICP) with the in-stack priority (ISP) of the top — push if ICP > ISP, else pop to output first. e.g. A + B * C → A B C * +." },
  { title: "🛠️ Applications", desc: "Function call stack (most recent call returns first), undo, parentheses/bracket matching, and expression evaluation — all rely on LIFO behaviour." },
];

const opsTable = [
  { op: "Push", cond: "top ≠ n (else OVERFLOW)", cost: "O(1)" },
  { op: "Pop / Delete", cond: "top ≠ 0 (else UNDERFLOW)", cost: "O(1)" },
  { op: "Top / Peek", cond: "returns STACK[top], no change", cost: "O(1)" },
  { op: "isEmpty", cond: "top == 0", cost: "O(1)" },
];

export default function StacksPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Stacks</span>
        </div>
        <h1>Stacks</h1>
        <p>Master the LIFO stack — operations, overflow/underflow, multi-stack arrays, and infix-to-postfix conversion.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>INTERACTIVE VISUALIZATION</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Stack Visualizer</h2>
          <StackViz />
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>REFERENCE</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Core Stack Operations</h2>
          <div style={{ background: "var(--surface-low)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Operation</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Condition / Effect</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontFamily: "var(--font-code)", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {opsTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontWeight: 700 }}>{row.op}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.9rem", color: "var(--on-surface-variant)" }}>{row.cond}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-code)", fontWeight: 700, color: "var(--success)" }}>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Stacks</h2>
          <div className="concept-grid">
            {concepts.map((c, i) => (
              <div key={i} className="concept-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>PRACTICE QUESTIONS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Test Your Knowledge</h2>
          <Quiz questions={stacksQuestions} title="Stacks Quiz" />
        </div>
      </section>
    </>
  );
}
