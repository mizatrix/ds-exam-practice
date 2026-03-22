"use client";
import Quiz from "@/components/quiz/Quiz";
import { complexityQuestions } from "@/data/questions/complexity";
import Link from "next/link";

const concepts = [
  { title: "📈 Big-O (Upper Bound)", desc: "O(g(n)) means f(n) ≤ c·g(n) for all n ≥ n₀. Think of it as the CEILING — 'my algorithm will never be WORSE than this.' Example: Insertion Sort is O(n²)." },
  { title: "📉 Big-Ω (Lower Bound)", desc: "Ω(g(n)) means f(n) ≥ c·g(n) for all n ≥ n₀. The FLOOR — 'my algorithm will never be BETTER than this.' Example: comparison-based sorting is Ω(n log n)." },
  { title: "📐 Big-Θ (Tight Bound)", desc: "Θ(g(n)) = both O(g(n)) AND Ω(g(n)). The exact growth rate. Example: Merge Sort is Θ(n log n) — it's always n log n regardless of input." },
  { title: "🔒 Loop Invariants", desc: "A property that is true before and after each loop iteration. Proved via three steps: Initialization (true before first iteration), Maintenance (if true before, true after), Termination (gives useful property when loop ends)." },
  { title: "⚡ Simplification Rules", desc: "Drop constants: O(3n) = O(n). Drop lower-order terms: O(n² + n) = O(n²). Multiply nested loops: O(n) × O(n) = O(n²)." },
  { title: "🎯 Common Complexities", desc: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Array access = O(1). Binary Search = O(log n). Merge Sort = O(n log n). Insertion Sort worst = O(n²)." },
];

const complexityTable = [
  { notation: "O(1)", name: "Constant", example: "Array index access, hash lookup", color: "var(--success)" },
  { notation: "O(log n)", name: "Logarithmic", example: "Binary search", color: "#22d3ee" },
  { notation: "O(n)", name: "Linear", example: "Linear search, traversing a list", color: "var(--primary)" },
  { notation: "O(n log n)", name: "Linearithmic", example: "Merge Sort, TimSort", color: "var(--tertiary)" },
  { notation: "O(n²)", name: "Quadratic", example: "Insertion Sort (worst), Bubble Sort", color: "var(--warning)" },
  { notation: "O(2ⁿ)", name: "Exponential", example: "Recursive Fibonacci (naive)", color: "var(--danger)" },
];

export default function ComplexityPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Complexity Analysis</span>
        </div>
        <h1>Complexity Analysis</h1>
        <p>Decode Big-O, Big-Ω, and Big-Θ notation. Understand loop invariants and asymptotic growth rates.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Complexity Table */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>REFERENCE</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Common Complexity Classes</h2>
          <div style={{ background: "var(--surface-low)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontFamily: "var(--font-code)", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Notation</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Name</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Example</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-code)", fontWeight: 700, color: row.color }}>{row.notation}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.9rem" }}>{row.name}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Concepts */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Asymptotic Analysis</h2>
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
          <Quiz questions={complexityQuestions} title="Complexity Analysis Quiz" />
        </div>
      </section>
    </>
  );
}
