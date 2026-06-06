import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <p className="label" style={{ marginBottom: "var(--space-4)" }}>INTERACTIVE LEARNING PLATFORM</p>
        <h1>
          <span className="gradient-text">Master Data Structures,</span>
          <br />Ace Your Exam
        </h1>
        <p className="hero-subtitle">
          Interactive practice across complexity, linked lists, stacks, queues, sorting, and trees.
          Visualize algorithms, solve practice questions, and prepare for exams — all in one place.
        </p>
        <div className="hero-actions">
          <Link href="/practice" className="btn btn-primary">📝 Start Practice Exam</Link>
          <Link href="/visualizer" className="btn btn-outline">🎬 Open Visualizer</Link>
          <a href="/DS-Revision-Sheet.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">📄 Revision Sheet (PDF)</a>
        </div>
      </section>

      {/* Topic Cards */}
      <section className="section">
        <div className="section-header">
          <p className="label">EXPLORE BY TOPIC</p>
          <h2>What Would You Like to Study?</h2>
          <p>Deep-dive into each topic with visualizations, code comparisons, and practice questions.</p>
        </div>
        <div className="grid-3">
          <Link href="/topics/sorting" className="topic-card accent-indigo">
            <div className="topic-icon indigo">📊</div>
            <h3>Sorting Algorithms</h3>
            <p>Understand how Insertion Sort and Merge Sort work through step-by-step animations and code analysis.</p>
            <div className="topic-tags">
              <span className="badge badge-primary">Insertion Sort</span>
              <span className="badge badge-primary">Merge Sort</span>
              <span className="badge">Divide & Conquer</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>

          <Link href="/topics/linked-lists" className="topic-card accent-emerald">
            <div className="topic-icon emerald">🔗</div>
            <h3>Linked Lists</h3>
            <p>Master pointer-based data structures from Singly Linked Lists to Circular Doubly Linked Lists.</p>
            <div className="topic-tags">
              <span className="badge badge-success">SLL</span>
              <span className="badge badge-success">DLL</span>
              <span className="badge badge-success">CDLL</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>

          <Link href="/topics/complexity" className="topic-card accent-amber">
            <div className="topic-icon amber">📈</div>
            <h3>Complexity Analysis</h3>
            <p>Decode Big-O, Big-Ω, and Big-Θ notation. Learn to analyze and prove algorithm correctness.</p>
            <div className="topic-tags">
              <span className="badge badge-warning">Big-O</span>
              <span className="badge badge-warning">Big-Ω</span>
              <span className="badge badge-warning">Big-Θ</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>

          <Link href="/topics/stacks" className="topic-card accent-indigo">
            <div className="topic-icon indigo">🗄️</div>
            <h3>Stacks</h3>
            <p>LIFO operations, overflow/underflow, multi-stack arrays, and infix-to-postfix conversion.</p>
            <div className="topic-tags">
              <span className="badge badge-primary">Push / Pop</span>
              <span className="badge badge-primary">Multi-Stack</span>
              <span className="badge">Infix→Postfix</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>

          <Link href="/topics/queues" className="topic-card accent-emerald">
            <div className="topic-icon emerald">📥</div>
            <h3>Queues</h3>
            <p>FIFO queues, the linear drift problem, and circular queues with their full/empty conditions.</p>
            <div className="topic-tags">
              <span className="badge badge-success">FIFO</span>
              <span className="badge badge-success">Circular</span>
              <span className="badge">ADDQ / DELETEQ</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>

          <Link href="/topics/trees" className="topic-card accent-amber">
            <div className="topic-icon amber">🌳</div>
            <h3>Trees &amp; BST</h3>
            <p>Tree terminology, BST insertion and search, depth vs height, and the three traversals.</p>
            <div className="topic-tags">
              <span className="badge badge-warning">BST</span>
              <span className="badge badge-warning">Traversals</span>
              <span className="badge">Depth / Height</span>
            </div>
            <span className="explore-link">Explore →</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: "var(--surface-low)" }}>
        <div className="grid-3">
          <div className="feature-card">
            <div className="feature-icon">🎬</div>
            <h4>Interactive Visualizations</h4>
            <p>Watch algorithms execute step-by-step with animated canvas visualizations and adjustable speed controls.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h4>Practice Questions</h4>
            <p>90+ exam-style questions across all six topics — True/False, MCQ, Fill-in-the-Blank, and Code Tracing. Instant feedback with explanations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h4>Code Comparison</h4>
            <p>Side-by-side C++ and Python implementations. Understand the algorithm regardless of your language background.</p>
          </div>
        </div>
      </section>
    </>
  );
}
