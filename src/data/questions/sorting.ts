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
  // ── Additional practice ──
  { id: "sx-1", type: "tf", text: "Insertion Sort is described as an 'online' algorithm, meaning it can sort data as it arrives in real time without needing the whole input up front.", marks: 1, answer: true, explanation: "The slides list 'Online: Can sort as data arrives in real time' as a key characteristic of Insertion Sort, since each new element is inserted into the already-sorted prefix." },
  { id: "sx-2", type: "tf", text: "Merge Sort's running time depends heavily on whether the input is already sorted, reversed, or random.", marks: 1, answer: false, explanation: "Merge Sort is input-agnostic: its best, worst, and average cases are all Theta(n log n), performing the same work regardless of initial order." },
  { id: "sx-3", type: "tf", text: "For very small arrays (roughly n < 20), Insertion Sort can actually outperform Merge Sort because Merge Sort carries heavy recursion and allocation overhead.", marks: 1, answer: true, explanation: "The slides note the 'plot twist' that constant factors hidden by Big-O dominate at small n, so Insertion Sort beats Merge Sort on tiny arrays." },
  { id: "sx-4", type: "mcq", text: "Which notation expresses Insertion Sort's BEST-case time complexity (on already-sorted input)?", marks: 2, options: ["O(n²)", "Ω(n)", "Θ(n log n)", "O(1)"], answer: "b", explanation: "On already-sorted input the inner while loop never executes, so the best-case lower bound is Ω(n) — one pass scanning each element." },
  { id: "sx-5", type: "mcq", text: "Timsort (Python's native sort) is best described as which kind of algorithm?", marks: 2, options: ["A pure recursive Merge Sort with no other technique", "A hybrid that detects natural runs, sorts small runs with Insertion Sort, and merges them like Merge Sort", "A pure Insertion Sort optimized for cache locality", "A divide-and-conquer variant that splits into three parts"], answer: "b", explanation: "Timsort detects naturally ordered 'runs', sorts small runs with Insertion Sort, and merges using Merge Sort's strategy — giving O(n log n) worst case and O(n) best case." },
  { id: "sx-6", type: "mcq", text: "Why is Merge Sort NOT considered an in-place algorithm?", marks: 2, options: ["It modifies the input array during recursion", "It requires auxiliary arrays to hold merged results, giving O(n) space", "It uses a single key variable outside the array", "It needs O(log n) stack space only"], answer: "b", explanation: "Merge Sort allocates auxiliary arrays during each combine step, so its space complexity is O(n) — this is the cost of its guaranteed speed." },
  { id: "sx-7", type: "fill", text: "In the Merge Sort recursion tree, each level performs O(n) total merge work and there are log n levels; multiplying these gives the overall time complexity of ___.", marks: 1, answer: "Θ(n log n)", acceptedAnswers: ["Θ(n log n)", "O(n log n)", "Theta(n log n)", "n log n", "Θ(nlogn)", "O(nlogn)"], explanation: "The tree is log n levels deep (halving each time) with O(n) merge work per level, so n · log n = Theta(n log n)." },
  { id: "sx-8", type: "trace", text: "Trace Insertion Sort on [9, 4, 7, 1]. After Pass 1 (j=1) the array is [4, 9, 7, 1]. Write the array state after Pass 2 (j=2), where the key is 7.", marks: 2, answer: "[4, 7, 9, 1]", acceptedAnswers: ["[4, 7, 9, 1]", "4, 7, 9, 1", "4 7 9 1", "[4,7,9,1]"], explanation: "Key 7 is compared with 9 (shift 9 right) then with 4 (4 < 7, stop), so 7 is inserted between 4 and 9, giving [4, 7, 9, 1]." },
];
