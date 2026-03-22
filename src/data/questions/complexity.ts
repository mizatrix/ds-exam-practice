import { Question } from "./sorting";

export const complexityQuestions: Question[] = [
  // ── True / False ──
  { id: "c-tf1", type: "tf", text: "Big-O notation O(g(n)) describes the upper bound of an algorithm's growth rate.", marks: 1, answer: true, explanation: "True — Big-O gives the ceiling: the algorithm grows no FASTER than g(n) for large n." },
  { id: "c-tf2", type: "tf", text: "Ω(g(n)) (Big-Omega) represents the upper bound of an algorithm's running time.", marks: 1, answer: false, explanation: "False — Ω is the LOWER bound (floor). Big-O is the upper bound. Θ is the tight (exact) bound." },
  { id: "c-tf3", type: "tf", text: "Θ(g(n)) means the algorithm grows both no faster AND no slower than g(n).", marks: 1, answer: true, explanation: "True — Θ is the tight bound, meaning the function is sandwiched between c₁·g(n) and c₂·g(n) for large n." },
  { id: "c-tf4", type: "tf", text: "An O(n log n) algorithm is always faster than an O(n²) algorithm for any input size.", marks: 1, answer: false, explanation: "False — for small inputs, the constant factors matter. O(n²) with a small constant can beat O(n log n) with a large constant. Asymptotic analysis describes behavior as n → ∞." },
  { id: "c-tf5", type: "tf", text: "O(1) means the algorithm takes exactly one operation.", marks: 1, answer: false, explanation: "False — O(1) means CONSTANT time, not necessarily one operation. It could be 5 operations or 100, but the number does NOT depend on input size n." },

  // ── MCQ ──
  { id: "c-mc1", type: "mcq", text: "Which complexity class does array index access (arr[i]) belong to?", marks: 2, options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: "b", explanation: "Array index access is O(1) — the memory address is computed directly: base + i × element_size." },
  { id: "c-mc2", type: "mcq", text: "Binary Search operates in which time complexity?", marks: 2, options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answer: "c", explanation: "Binary Search halves the search space each step, requiring at most log₂(n) comparisons." },
  { id: "c-mc3", type: "mcq", text: "Which notation represents the TIGHT bound of an algorithm?", marks: 2, options: ["O (Big-O)", "Ω (Big-Omega)", "Θ (Big-Theta)", "o (Little-o)"], answer: "c", explanation: "Θ (Big-Theta) is the tight bound — it means f(n) grows at the same rate as g(n), both upper and lower bounded." },
  { id: "c-mc4", type: "mcq", text: "If an algorithm has complexity O(n + n²), what is its simplified Big-O?", marks: 2, options: ["O(n)", "O(n + n²)", "O(n²)", "O(2n²)"], answer: "c", explanation: "In Big-O, we keep only the dominant term. n² dominates n, so O(n + n²) simplifies to O(n²)." },

  // ── Fill in the Blank ──
  { id: "c-f1", type: "fill", text: "The three steps to prove a loop invariant are: Initialization, ___, and Termination.", marks: 1, answer: "maintenance", acceptedAnswers: ["maintenance", "Maintenance"], explanation: "Maintenance is the inductive step — if the invariant holds before an iteration, it holds after." },
  { id: "c-f2", type: "fill", text: "Θ(g(n)) represents the ___ bound.", marks: 1, answer: "tight", acceptedAnswers: ["tight", "exact", "Tight", "Exact"], explanation: "Θ is called the tight or exact bound — simultaneously an upper and lower bound." },
  { id: "c-f3", type: "fill", text: "When we say f(n) = O(g(n)), we mean there exist constants c and n₀ such that f(n) ≤ ___ for all n ≥ n₀.", marks: 1, answer: "c·g(n)", acceptedAnswers: ["c·g(n)", "c*g(n)", "cg(n)", "c g(n)"], explanation: "The formal definition of Big-O: f(n) ≤ c·g(n) for all n ≥ n₀." },

  // ── Matching (as MCQs) ──
  { id: "c-m1", type: "mcq", text: "O(1) complexity corresponds to which operation?", marks: 1, options: ["Merge Sort", "Array index access / Hash lookup", "Binary Search", "Insertion Sort (worst case)"], answer: "b", explanation: "O(1) = constant time = array index access or hash table lookup." },
  { id: "c-m2", type: "mcq", text: "O(n²) complexity corresponds to which algorithm?", marks: 1, options: ["Merge Sort", "Array index access", "Binary Search", "Insertion Sort (worst case)"], answer: "d", explanation: "Insertion Sort worst case is O(n²) — occurs with reverse sorted input." },
  { id: "c-m3", type: "mcq", text: "O(log n) complexity corresponds to which algorithm?", marks: 1, options: ["Merge Sort", "Array index access", "Binary Search", "Insertion Sort (worst case)"], answer: "c", explanation: "Binary Search halves the search space each step → O(log n)." },
  { id: "c-m4", type: "mcq", text: "O(n log n) complexity corresponds to which algorithm?", marks: 1, options: ["Merge Sort", "Array index access", "Binary Search", "Insertion Sort (worst case)"], answer: "a", explanation: "Merge Sort runs in O(n log n) in ALL cases — best, average, and worst." },
];
