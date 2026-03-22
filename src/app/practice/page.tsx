"use client";
import Quiz from "@/components/quiz/Quiz";
import { sortingQuestions } from "@/data/questions/sorting";
import { linkedListQuestions } from "@/data/questions/linked-lists";
import { complexityQuestions } from "@/data/questions/complexity";
import { Question } from "@/data/questions/sorting";
import Link from "next/link";
import { useState, useMemo } from "react";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticePage() {
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedTopics, setSelectedTopics] = useState({
    sorting: true,
    linkedLists: true,
    complexity: true,
  });

  const examQuestions = useMemo(() => {
    const pool: Question[] = [];
    if (selectedTopics.sorting) pool.push(...sortingQuestions);
    if (selectedTopics.linkedLists) pool.push(...linkedListQuestions);
    if (selectedTopics.complexity) pool.push(...complexityQuestions);
    return shuffleArray(pool).slice(0, questionCount);
  }, [selectedTopics, questionCount]);

  const totalMarks = examQuestions.reduce((s, q) => s + q.marks, 0);

  if (!started) {
    return (
      <>
        <div className="page-header">
          <div className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <span>Practice Exam</span>
          </div>
          <h1>Practice Exam</h1>
          <p>Configure your mock exam and test yourself under timed conditions.</p>
        </div>

        <section className="section" style={{ paddingTop: 0, maxWidth: "700px" }}>
          <div className="glass-card" style={{ marginBottom: "var(--space-8)" }}>
            <h3 style={{ marginBottom: "var(--space-6)" }}>📋 Exam Configuration</h3>

            <div style={{ marginBottom: "var(--space-6)" }}>
              <p className="label" style={{ marginBottom: "var(--space-3)" }}>TOPICS</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {[
                  { key: "sorting", label: "📊 Sorting Algorithms", count: sortingQuestions.length },
                  { key: "linkedLists", label: "🔗 Linked Lists", count: linkedListQuestions.length },
                  { key: "complexity", label: "📈 Complexity Analysis", count: complexityQuestions.length },
                ].map(({ key, label, count }) => (
                  <label key={key} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", cursor: "pointer", padding: "var(--space-2) 0" }}>
                    <input
                      type="checkbox"
                      checked={selectedTopics[key as keyof typeof selectedTopics]}
                      onChange={(e) => setSelectedTopics((prev) => ({ ...prev, [key]: e.target.checked }))}
                      style={{ accentColor: "var(--primary-container)", width: "18px", height: "18px" }}
                    />
                    <span>{label}</span>
                    <span className="badge" style={{ marginLeft: "auto" }}>{count} questions</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "var(--space-6)" }}>
              <p className="label" style={{ marginBottom: "var(--space-3)" }}>NUMBER OF QUESTIONS</p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <input
                  type="range"
                  min={5}
                  max={Math.min(50, (selectedTopics.sorting ? sortingQuestions.length : 0) + (selectedTopics.linkedLists ? linkedListQuestions.length : 0) + (selectedTopics.complexity ? complexityQuestions.length : 0))}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "var(--primary-container)" }}
                />
                <span style={{ fontFamily: "var(--font-code)", fontWeight: 700, fontSize: "1.25rem", color: "var(--primary)", minWidth: "40px", textAlign: "center" }}>{questionCount}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface-low)", borderRadius: "var(--radius-md)", padding: "var(--space-4)" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Estimated time</div>
                <div style={{ fontFamily: "var(--font-code)", fontWeight: 700, fontSize: "1.1rem" }}>{Math.ceil(questionCount * 1.5)} minutes</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Total marks</div>
                <div style={{ fontFamily: "var(--font-code)", fontWeight: 700, fontSize: "1.1rem" }}>~{questionCount}</div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", padding: "var(--space-4)", fontSize: "1rem" }} onClick={() => setStarted(true)}>
            🚀 Start Practice Exam
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <span>/</span> <span>Practice Exam</span>
        </div>
        <h1>Practice Exam</h1>
        <p>{questionCount} questions · {totalMarks} marks · Timed</p>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <Quiz questions={examQuestions} title="Mock Exam" showTimer timerMinutes={Math.ceil(questionCount * 1.5)} />
      </section>
    </>
  );
}
