"use client";
import Quiz from "@/components/quiz/Quiz";
import { queuesQuestions } from "@/data/questions/queues";
import Link from "next/link";

const concepts = [
  { title: "📥 Queue ADT (FIFO)", desc: "First-In, First-Out. Insert (ADDQ / enqueue) happens at the rear; remove (DELETEQ / dequeue) happens at the front. The everyday model is a print spooler — the first job sent is the first printed." },
  { title: "➡️ Linear Queue Drift", desc: "In a simple linear queue, rear keeps advancing. Once rear hits the last index, the queue reports FULL even if early slots are free after several dequeues — the wasted-space (false-full) problem." },
  { title: "🔄 Circular Queue", desc: "Wraps the indices with mod n. ADDQ does rear = (rear + 1) mod n then stores; DELETEQ does front = (front + 1) mod n then reads. When rear passes the last index it wraps back to 0, reusing freed slots." },
  { title: "🚦 Empty vs Full", desc: "EMPTY when front == rear. FULL when front == (rear + 1) mod n. One slot is deliberately left unused so the two states are distinguishable — otherwise both would look identical." },
  { title: "🔢 Counting Elements", desc: "The number of stored elements is (rear − front + n) mod n. This handles the wrap-around correctly whether or not rear has passed front." },
  { title: "⚡ O(1) Operations", desc: "Both ADDQ and DELETEQ are O(1): they only move a pointer and touch one slot. No elements are ever shifted, unlike deleting from the front of an array." },
];

const compareTable = [
  { f: "Wrap-around", lin: "No — rear stops at the end", cir: "Yes — (index) mod n" },
  { f: "Space reuse", lin: "Freed front slots wasted", cir: "Freed slots reused" },
  { f: "FULL condition", lin: "rear = n (last index)", cir: "front = (rear+1) mod n" },
  { f: "ADDQ / DELETEQ", lin: "O(1)", cir: "O(1)" },
];

export default function QueuesPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Queues</span>
        </div>
        <h1>Queues</h1>
        <p>Understand FIFO queues — linear vs circular, the drift problem, and the full/empty conditions that trip people up.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>REFERENCE</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Linear vs Circular Queue</h2>
          <div style={{ background: "var(--surface-low)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Aspect</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Linear Queue</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Circular Queue</th>
                </tr>
              </thead>
              <tbody>
                {compareTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontWeight: 700 }}>{row.f}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.9rem", color: "var(--on-surface-variant)" }}>{row.lin}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.9rem", color: "var(--on-surface-variant)" }}>{row.cir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Queues</h2>
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
          <Quiz questions={queuesQuestions} title="Queues Quiz" />
        </div>
      </section>
    </>
  );
}
