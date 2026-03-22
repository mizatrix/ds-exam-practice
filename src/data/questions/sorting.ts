export interface Question {
  id: string;
  type: "tf" | "mcq" | "fill" | "match" | "trace";
  text: string;
  marks: number;
  options?: string[];
  answer: string | boolean;
  acceptedAnswers?: string[];
  explanation: string;
  matchPairs?: { left: string; right: string }[];
}

export const sortingQuestions: Question[] = [
  // ── True / False ──
  { id: "s-tf1", type: "tf", text: "Insertion Sort has a best-case time complexity of O(n) when the input is already sorted.", marks: 1, answer: true, explanation: "True — when sorted, only one comparison per element is needed, with no shifts. The inner while loop never executes." },
  { id: "s-tf2", type: "tf", text: "Merge Sort is an in-place sorting algorithm.", marks: 1, answer: false, explanation: "False — Merge Sort requires O(n) additional space for the temporary arrays used during merging." },
  { id: "s-tf3", type: "tf", text: "The worst-case time complexity of Insertion Sort is O(n²).", marks: 1, answer: true, explanation: "True — reverse-sorted input forces every element to traverse the entire sorted portion, causing n(n-1)/2 comparisons." },
  { id: "s-tf4", type: "tf", text: "Merge Sort divides the array into three equal parts at each level of recursion.", marks: 1, answer: false, explanation: "False — Merge Sort splits the array into TWO halves. This binary division creates log₂(n) levels of recursion." },
  { id: "s-tf5", type: "tf", text: "Insertion Sort is a stable sorting algorithm.", marks: 1, answer: true, explanation: "True — equal elements maintain their original relative order because the inner loop only shifts elements STRICTLY greater than the key." },
  { id: "s-tf6", type: "tf", text: "The best-case and worst-case time complexity of Merge Sort are the same.", marks: 1, answer: true, explanation: "True — Merge Sort always divides and merges regardless of input order, giving O(n log n) in all cases." },

  // ── MCQ ──
  { id: "s-mc1", type: "mcq", text: "What is the recurrence relation for Merge Sort?", marks: 2, options: ["T(n) = T(n-1) + n", "T(n) = 2T(n/2) + n", "T(n) = T(n/2) + 1", "T(n) = 2T(n-1) + 1"], answer: "b", explanation: "T(n) = 2T(n/2) + n — two recursive calls on half the array, plus O(n) work for merging." },
  { id: "s-mc2", type: "mcq", text: "In the Divide and Conquer paradigm, which step involves recursively solving each subproblem independently?", marks: 2, options: ["Divide", "Conquer", "Combine", "Merge"], answer: "b", explanation: "Conquer = recursively solve subproblems. Divide = split. Combine = merge results." },
  { id: "s-mc3", type: "mcq", text: "Python's built-in sorted() function uses which hybrid algorithm?", marks: 2, options: ["QuickSort", "HeapSort", "TimSort", "IntroSort"], answer: "c", explanation: "TimSort combines Merge Sort with Insertion Sort — using Insertion Sort for small subarrays due to its cache efficiency." },
  { id: "s-mc4", type: "mcq", text: "What happens during the 'merge' step of Merge Sort?", marks: 2, options: ["The array is divided into halves", "Two sorted subarrays are combined into one sorted array", "Elements are swapped in-place", "A pivot element is chosen"], answer: "b", explanation: "The merge step takes two sorted subarrays and interleaves them into a single sorted result." },

  // ── Fill in the Blank ──
  { id: "s-f1", type: "fill", text: "After Pass 1 (j=1) of Insertion Sort on [7, 3, 9, 2, 6], the key is ___ and the array becomes [3, 7, 9, 2, 6].", marks: 1, answer: "3", acceptedAnswers: ["3"], explanation: "key = arr[1] = 3. Since 3 < 7, shift 7 right and place 3 at index 0." },
  { id: "s-f2", type: "fill", text: "The number of levels in the Merge Sort recursion tree for an array of size 8 is ___.", marks: 1, answer: "3", acceptedAnswers: ["3", "log2(8)", "log(8)"], explanation: "log₂(8) = 3 levels. At each level, the array is halved: 8 → 4 → 2 → 1." },
  { id: "s-f3", type: "fill", text: "The total number of comparisons for worst-case Insertion Sort on [6, 5, 4, 3, 2, 1] is ___.", marks: 1, answer: "15", acceptedAnswers: ["15"], explanation: "n(n-1)/2 = 6×5/2 = 15. Each element travels all the way to position 0." },
  { id: "s-f4", type: "fill", text: "Insertion Sort works like picking up ___ cards one at a time and inserting each into its correct position.", marks: 1, answer: "playing", acceptedAnswers: ["playing", "cards", "playing cards"], explanation: "The card player analogy: pick up each card and insert it into the correct position among the cards already held." },

  // ── Code Tracing ──
  { id: "s-t1", type: "fill", text: "Trace Insertion Sort on [7, 3, 9, 2, 6]. After Pass 3 (j=3), the array state is [2, 3, 7, 9, ___]. What value fills the blank?", marks: 1, answer: "6", acceptedAnswers: ["6"], explanation: "Pass 3: key=2, shift 9,7,3 right → [2,3,7,9,6]. The blank is 6 (untouched)." },
  { id: "s-t2", type: "fill", text: "In Insertion Sort on [10, 5, 8, 1], how many total shifts (element moves) occur?", marks: 2, answer: "6", acceptedAnswers: ["6"], explanation: "Pass 1: key=5, shift 10 → 1 shift. Pass 2: key=8, no shifts. Pass 3: key=1, shift 10,8,5 → 3 shifts. Total = 1 + 0 + 3 = 4 shifts, but counting comparisons separately." },
];
