"use client";
import dynamic from "next/dynamic";
import Quiz from "@/components/quiz/Quiz";
import { treesQuestions } from "@/data/questions/trees";
import Link from "next/link";

const BSTViz = dynamic(() => import("@/components/visualizer/BSTViz"), { ssr: false });

const concepts = [
  { title: "🌳 Tree Terminology", desc: "Root (top, no parent), parent/child, leaf (no children), edge (a link). DEPTH of a node = edges from the root down to it (root depth = 0). HEIGHT of a node = edges down to its furthest leaf (leaf height = 0). The tree's height is the root's height." },
  { title: "🔎 BST Property", desc: "For every node: all keys in the left subtree are smaller and all keys in the right subtree are larger. Insert by comparing with each node — go left if smaller, right if larger — until you reach an empty slot." },
  { title: "📊 Search Cost", desc: "Each comparison eliminates one whole subtree; reaching NULL means the key is absent. A balanced BST has height ≈ ⌊log₂n⌋ → search O(log n). A skewed BST (from sorted insertion) degrades to a chain of height n−1 → O(n)." },
  { title: "↔️ Inorder (L, Root, R)", desc: "Visiting left, then the node, then right. For a BST this outputs the keys in ascending sorted order — the most common way to list a BST's contents." },
  { title: "🔝 Preorder (Root, L, R)", desc: "Visiting the node before its subtrees. Because the root comes first, preorder is used to serialize or copy a tree while preserving its exact structure." },
  { title: "🔚 Postorder (L, R, Root)", desc: "Visiting both children before the node. Children are fully processed before their parent, which makes it the safe order for deleting / freeing all nodes in a tree." },
];

const traversalTable = [
  { name: "Preorder", order: "Root → Left → Right", use: "Serialize / copy a tree (root-first)" },
  { name: "Inorder", order: "Left → Root → Right", use: "Ascending sorted output of a BST" },
  { name: "Postorder", order: "Left → Right → Root", use: "Safely delete / free all nodes" },
];

export default function TreesPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Trees &amp; BST</span>
        </div>
        <h1>Trees &amp; Binary Search Trees</h1>
        <p>Master tree terminology, BST insertion and search, depth vs height, and the three traversals with their uses.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>INTERACTIVE VISUALIZATION</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>BST Visualizer</h2>
          <BSTViz />
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>REFERENCE</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>The Three Traversals</h2>
          <div style={{ background: "var(--surface-low)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Traversal</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Visit Order</th>
                  <th style={{ padding: "var(--space-4) var(--space-6)", textAlign: "left", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Typical Use</th>
                </tr>
              </thead>
              <tbody>
                {traversalTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontWeight: 700, color: "var(--tertiary)" }}>{row.name}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-code)", fontSize: "0.85rem" }}>{row.order}</td>
                    <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Trees &amp; BSTs</h2>
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
          <Quiz questions={treesQuestions} title="Trees & BST Quiz" />
        </div>
      </section>
    </>
  );
}
