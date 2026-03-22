"use client";
import dynamic from "next/dynamic";
import CodePanel from "@/components/code-panel/CodePanel";
import Quiz from "@/components/quiz/Quiz";
import { sortingQuestions } from "@/data/questions/sorting";
import Link from "next/link";

const InsertionSortViz = dynamic(() => import("@/components/visualizer/InsertionSortViz"), { ssr: false });

const insertionSortCpp = `<span class="code-keyword">void</span> <span class="code-func">insertionSort</span>(<span class="code-type">int</span> arr[], <span class="code-type">int</span> n) {
    <span class="code-keyword">for</span> (<span class="code-type">int</span> j = <span class="code-number">1</span>; j &lt; n; j++) {
        <span class="code-type">int</span> key = arr[j];
        <span class="code-type">int</span> i = j - <span class="code-number">1</span>;
        <span class="code-comment">// Shift elements greater than key</span>
        <span class="code-keyword">while</span> (i >= <span class="code-number">0</span> &amp;&amp; arr[i] > key) {
            arr[i + <span class="code-number">1</span>] = arr[i];
            i = i - <span class="code-number">1</span>;
        }
        arr[i + <span class="code-number">1</span>] = key;
    }
}`;

const insertionSortPy = `<span class="code-keyword">def</span> <span class="code-func">insertion_sort</span>(arr):
    <span class="code-keyword">for</span> j <span class="code-keyword">in</span> <span class="code-func">range</span>(<span class="code-number">1</span>, <span class="code-func">len</span>(arr)):
        key = arr[j]
        i = j - <span class="code-number">1</span>
        <span class="code-comment"># Shift elements greater than key</span>
        <span class="code-keyword">while</span> i >= <span class="code-number">0</span> <span class="code-keyword">and</span> arr[i] > key:
            arr[i + <span class="code-number">1</span>] = arr[i]
            i -= <span class="code-number">1</span>
        arr[i + <span class="code-number">1</span>] = key`;

const mergeSortCpp = `<span class="code-keyword">void</span> <span class="code-func">merge</span>(<span class="code-type">int</span> arr[], <span class="code-type">int</span> l, <span class="code-type">int</span> m, <span class="code-type">int</span> r) {
    <span class="code-type">int</span> n1 = m - l + <span class="code-number">1</span>, n2 = r - m;
    <span class="code-type">int</span> L[n1], R[n2];
    <span class="code-keyword">for</span> (<span class="code-type">int</span> i = <span class="code-number">0</span>; i &lt; n1; i++) L[i] = arr[l + i];
    <span class="code-keyword">for</span> (<span class="code-type">int</span> j = <span class="code-number">0</span>; j &lt; n2; j++) R[j] = arr[m + <span class="code-number">1</span> + j];
    <span class="code-type">int</span> i = <span class="code-number">0</span>, j = <span class="code-number">0</span>, k = l;
    <span class="code-keyword">while</span> (i &lt; n1 &amp;&amp; j &lt; n2) {
        <span class="code-keyword">if</span> (L[i] &lt;= R[j]) arr[k++] = L[i++];
        <span class="code-keyword">else</span> arr[k++] = R[j++];
    }
    <span class="code-keyword">while</span> (i &lt; n1) arr[k++] = L[i++];
    <span class="code-keyword">while</span> (j &lt; n2) arr[k++] = R[j++];
}

<span class="code-keyword">void</span> <span class="code-func">mergeSort</span>(<span class="code-type">int</span> arr[], <span class="code-type">int</span> l, <span class="code-type">int</span> r) {
    <span class="code-keyword">if</span> (l &lt; r) {
        <span class="code-type">int</span> m = l + (r - l) / <span class="code-number">2</span>;
        <span class="code-func">mergeSort</span>(arr, l, m);
        <span class="code-func">mergeSort</span>(arr, m + <span class="code-number">1</span>, r);
        <span class="code-func">merge</span>(arr, l, m, r);
    }
}`;

const mergeSortPy = `<span class="code-keyword">def</span> <span class="code-func">merge_sort</span>(arr):
    <span class="code-keyword">if</span> <span class="code-func">len</span>(arr) > <span class="code-number">1</span>:
        mid = <span class="code-func">len</span>(arr) // <span class="code-number">2</span>
        L = arr[:mid]
        R = arr[mid:]
        <span class="code-func">merge_sort</span>(L)
        <span class="code-func">merge_sort</span>(R)
        i = j = k = <span class="code-number">0</span>
        <span class="code-keyword">while</span> i &lt; <span class="code-func">len</span>(L) <span class="code-keyword">and</span> j &lt; <span class="code-func">len</span>(R):
            <span class="code-keyword">if</span> L[i] &lt;= R[j]:
                arr[k] = L[i]; i += <span class="code-number">1</span>
            <span class="code-keyword">else</span>:
                arr[k] = R[j]; j += <span class="code-number">1</span>
            k += <span class="code-number">1</span>
        <span class="code-keyword">while</span> i &lt; <span class="code-func">len</span>(L):
            arr[k] = L[i]; i += <span class="code-number">1</span>; k += <span class="code-number">1</span>
        <span class="code-keyword">while</span> j &lt; <span class="code-func">len</span>(R):
            arr[k] = R[j]; j += <span class="code-number">1</span>; k += <span class="code-number">1</span>`;

const concepts = [
  { title: "🔄 Insertion Sort", desc: "Builds the sorted array one element at a time. Picks each 'key' and slides larger elements right until the correct position is found. Best O(n), Worst O(n²)." },
  { title: "✂️ Merge Sort", desc: "Divide and Conquer: split array in half, recursively sort each half, then merge. Always O(n log n) — the guarantee comes from balanced splitting." },
  { title: "📐 Loop Invariant", desc: "Before each outer loop iteration, A[0..j-1] contains the original elements in sorted order. Proving this via Initialization, Maintenance, and Termination demonstrates correctness." },
  { title: "⚡ Stability", desc: "Insertion Sort is stable (equal elements keep original order). Merge Sort is also stable if the merge step uses ≤ rather than < for comparison." },
  { title: "🎯 When to Use What", desc: "Insertion Sort shines for small (n ≤ 20) or nearly-sorted arrays. Merge Sort is preferred for large datasets where guaranteed O(n log n) matters." },
];

export default function SortingPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Sorting Algorithms</span>
        </div>
        <h1>Sorting Algorithms</h1>
        <p>Master Insertion Sort and Merge Sort through interactive visualizations, code analysis, and practice questions.</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Visualizer */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>INTERACTIVE VISUALIZATION</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Insertion Sort Visualizer</h2>
          <InsertionSortViz initialArray={[7, 3, 9, 2, 6]} />
        </div>

        {/* Concepts */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>KEY CONCEPTS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Understanding Sorting</h2>
          <div className="concept-grid">
            {concepts.map((c, i) => (
              <div key={i} className="concept-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Comparison */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>CODE COMPARISON</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Insertion Sort: C++ vs Python</h2>
          <CodePanel cppCode={insertionSortCpp} pythonCode={insertionSortPy} />
        </div>

        <div style={{ marginBottom: "var(--space-12)" }}>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Merge Sort: C++ vs Python</h2>
          <CodePanel cppCode={mergeSortCpp} pythonCode={mergeSortPy} />
        </div>

        {/* Quiz */}
        <div>
          <p className="label" style={{ marginBottom: "var(--space-4)" }}>PRACTICE QUESTIONS</p>
          <h2 style={{ marginBottom: "var(--space-6)" }}>Test Your Knowledge</h2>
          <Quiz questions={sortingQuestions} title="Sorting Algorithms Quiz" />
        </div>
      </section>
    </>
  );
}
