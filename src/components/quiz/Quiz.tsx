"use client";
import { useState, useCallback } from "react";
import { Question } from "@/data/questions/sorting";

interface QuizProps {
  questions: Question[];
  title?: string;
  showTimer?: boolean;
  timerMinutes?: number;
}

export default function Quiz({ questions, title, showTimer, timerMinutes = 30 }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Timer
  useState(() => {
    if (!showTimer) return;
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const selectTF = useCallback((qid: string, val: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }, [submitted]);

  const selectMCQ = useCallback((qid: string, val: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }, [submitted]);

  const setFill = useCallback((qid: string, val: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: val.trim().toLowerCase() }));
  }, [submitted]);

  const submit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    setTimerActive(false);
  }, [submitted]);

  const isCorrect = (q: Question): boolean => {
    const userAns = answers[q.id];
    if (q.type === "tf") return userAns === q.answer;
    if (q.type === "mcq") return userAns === q.answer;
    if (q.type === "fill" || q.type === "trace") {
      const accepted = (q.acceptedAnswers || [String(q.answer)]).map((a) => a.toLowerCase().trim());
      return accepted.includes(String(userAns || "").toLowerCase().trim());
    }
    return false;
  };

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const earned = submitted ? questions.reduce((sum, q) => sum + (isCorrect(q) ? q.marks : 0), 0) : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const typeLabel = (type: string) => {
    const labels: Record<string, string> = { tf: "True / False", mcq: "Multiple Choice", fill: "Fill in the Blank", match: "Matching", trace: "Code Tracing" };
    return labels[type] || type;
  };

  return (
    <div className="quiz-container">
      {(title || showTimer) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
          {title && <h3>{title}</h3>}
          {showTimer && (
            <div className={`timer ${timeLeft < 300 ? (timeLeft < 60 ? "danger" : "warning") : ""}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div style={{ background: "var(--surface-low)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", textAlign: "center", marginBottom: "var(--space-4)" }}>
          <div className="score-val" style={{ fontSize: "3rem" }}>{earned}</div>
          <div className="score-total" style={{ fontSize: "1.25rem" }}>/ {totalMarks} marks</div>
          <div style={{ marginTop: "var(--space-2)", color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>
            {earned === totalMarks ? "🎉 Perfect Score!" : earned >= totalMarks * 0.7 ? "✨ Great job!" : earned >= totalMarks * 0.5 ? "👍 Good effort!" : "📚 Keep practicing!"}
          </div>
          <div className="progress-bar" style={{ marginTop: "var(--space-4)" }}>
            <div className="progress-fill" style={{ width: `${(earned / totalMarks) * 100}%` }} />
          </div>
        </div>
      )}

      {questions.map((q, idx) => (
        <div
          key={q.id}
          className={`quiz-question ${submitted ? (isCorrect(q) ? "correct" : "incorrect") : ""}`}
          style={{ animationDelay: `${idx * 0.06}s` }}
        >
          <div className="quiz-q-header">
            <span className="quiz-q-type">{typeLabel(q.type)}</span>
            <span className="quiz-q-marks">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
          </div>
          <div className="quiz-q-text">{q.text}</div>

          {q.type === "tf" && (
            <div className="quiz-tf-group">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  className={`quiz-tf-btn ${answers[q.id] === val ? "selected" : ""} ${submitted && val === q.answer ? "correct-answer" : ""} ${submitted && answers[q.id] === val && val !== q.answer ? "wrong-answer" : ""}`}
                  onClick={() => selectTF(q.id, val)}
                  disabled={submitted}
                >
                  {val ? "✓ True" : "✗ False"}
                </button>
              ))}
            </div>
          )}

          {q.type === "mcq" && q.options && (
            <div className="quiz-options">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(97 + i);
                return (
                  <div
                    key={letter}
                    className={`quiz-option ${answers[q.id] === letter ? "selected" : ""} ${submitted && letter === q.answer ? "correct-answer" : ""} ${submitted && answers[q.id] === letter && letter !== q.answer ? "wrong-answer" : ""}`}
                    onClick={() => selectMCQ(q.id, letter)}
                    style={{ cursor: submitted ? "default" : "pointer" }}
                  >
                    <div className="quiz-radio" />
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          )}

          {(q.type === "fill" || q.type === "trace") && (
            <input
              type="text"
              className="quiz-fill-input"
              placeholder="Type your answer..."
              onChange={(e) => setFill(q.id, e.target.value)}
              disabled={submitted}
              style={submitted ? { borderColor: isCorrect(q) ? "var(--success)" : "var(--danger)" } : {}}
            />
          )}

          {submitted && (
            <div className={`quiz-explanation show ${isCorrect(q) ? "correct-exp" : "incorrect-exp"}`}>
              {!isCorrect(q) && q.type === "fill" && (
                <strong>Correct answer: {q.acceptedAnswers?.[0] || String(q.answer)}<br /></strong>
              )}
              {q.explanation}
            </div>
          )}
        </div>
      ))}

      <div className="quiz-submit-bar">
        <button className="btn btn-primary" onClick={submit} disabled={submitted}>
          {submitted ? "✓ Submitted" : "✓ Check Answers"}
        </button>
        {submitted && (
          <div className="quiz-score">
            <span className="score-val">{earned}</span>
            <span className="score-total">/ {totalMarks}</span>
          </div>
        )}
      </div>
    </div>
  );
}
