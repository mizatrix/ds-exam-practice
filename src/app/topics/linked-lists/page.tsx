"use client";
import dynamic from "next/dynamic";
import Quiz from "@/components/quiz/Quiz";
import { linkedListQuestions } from "@/data/questions/linked-lists";
import Link from "next/link";
import { useState } from "react";

const LinkedListViz = dynamic(() => import("@/components/visualizer/LinkedListViz"), { ssr: false });

const concepts = [
  { title: "➡️ Singly Linked List", desc: "Each node stores data + a 'next' pointer. Traversal is forward-only. Head insertion is O(1), but tail insertion without a tail pointer is O(n)." },
  { title: "↔️ Doubly Linked List", desc: "Nodes have both 'next' and 'prev' pointers. Enables bidirectional traversal and O(1) deletion when you have a pointer to the node. Costs 8 extra bytes per node on 64-bit systems." },
  { title: "🔁 Circular DLL", desc: "Like a DLL but the tail's next points to head and head's prev points to tail — forming a closed ring. No NULL exists. Must use do-while for traversal." },
  { title: "🧠 Memory Trade-off", desc: "Arrays: O(1) access, expensive insertion. Linked Lists: O(n) access, O(1) insertion/deletion (with pointer). Choose based on your access patterns." },
  { title: "🔍 The do-while Pattern", desc: "In a CDLL, a regular while(p != head) loop skips the head entirely. A do-while processes head first, then checks if we've looped back." },
  { title: "⚡ O(1) DLL Deletion", desc: "Given a pointer to node N: set N.prev.next = N.next and N.next.prev = N.prev. No traversal needed — both neighbors are directly accessible." },
];

export default function LinkedListsPage() {
  const [vizType, setVizType] = useState<"sll" | "dll" | "cdll">("sll");

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Linked Lists</span>
        </div>
        <h1>Linked Lists</h1>
        <p>Explore Singly, Doubly, and Circular Doubly Linked Lists with interactive node manipulation.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Type selector */}
        <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          {(["sll", "dll", "cdll"] as const).map((t) => (
            <button key={t} className={`btn ${vizType === t ? "btn-primary" : "btn-outline"}`} onClick={() => setVizType(t)}>
              {t === "sll" ? "➡️ SLL" : t === "dll" ? "↔️ DLL" : "🔁 CDLL"}
            </button>
          ))}
        </div>

        {/* Visualizer */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>INTERACTIVE VISUALIZATION</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>
            {vizType === "sll" ? "Singly Linked List" : vizType === "dll" ? "Doubly Linked List" : "Circular Doubly Linked List"}
          </h2>
          <LinkedListViz key={vizType} type={vizType} />
        </div>

        {/* Concepts */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Linked Lists</h2>
          <div className="concept-grid">
            {concepts.map((c, i) => (
              <div key={i} className="concept-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>PRACTICE QUESTIONS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Test Your Knowledge</h2>
          <Quiz questions={linkedListQuestions} title="Linked Lists Quiz" />
        </div>
      </section>
    </>
  );
}
