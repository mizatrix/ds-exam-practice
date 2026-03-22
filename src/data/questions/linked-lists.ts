import { Question } from "./sorting";

export const linkedListQuestions: Question[] = [
  // ── True / False ──
  { id: "ll-tf1", type: "tf", text: "In a Singly Linked List, each node stores a data field and a pointer to the next node.", marks: 1, answer: true, explanation: "True — SLL nodes have exactly two fields: data and a 'next' pointer that references the subsequent node." },
  { id: "ll-tf2", type: "tf", text: "Deleting a node from a Doubly Linked List requires traversing to find the predecessor.", marks: 1, answer: false, explanation: "False — DLL nodes have a 'prev' pointer, so given a pointer to the node, deletion is O(1) since both neighbors are directly accessible." },
  { id: "ll-tf3", type: "tf", text: "In a Circular Doubly Linked List (CDLL), the last node's next pointer points to NULL.", marks: 1, answer: false, explanation: "False — in a CDLL, the last node's next points back to the HEAD node, forming a closed loop. There is no NULL in a CDLL." },
  { id: "ll-tf4", type: "tf", text: "A Doubly Linked List allows traversal in both forward and backward directions.", marks: 1, answer: true, explanation: "True — DLL nodes have both 'next' (forward) and 'prev' (backward) pointers." },
  { id: "ll-tf5", type: "tf", text: "Inserting a node at the head of a Singly Linked List takes O(n) time.", marks: 1, answer: false, explanation: "False — head insertion is O(1): point newNode.next to head, then update head to newNode. No traversal needed." },
  { id: "ll-tf6", type: "tf", text: "A regular while loop (while p != head) can correctly traverse all nodes in a CDLL.", marks: 1, answer: false, explanation: "False — the condition p != head is true at the start (p starts at head), so the loop body would be skipped entirely. A do-while loop is required." },

  // ── MCQ ──
  { id: "ll-mc1", type: "mcq", text: "What is the extra memory cost per node for a DLL compared to an SLL on a 64-bit system?", marks: 2, options: ["4 bytes", "8 bytes", "16 bytes", "32 bytes"], answer: "b", explanation: "One extra pointer (prev) = 8 bytes on a 64-bit system where pointers are 8 bytes wide." },
  { id: "ll-mc2", type: "mcq", text: "Which operation is NOT O(1) for a Singly Linked List?", marks: 2, options: ["Insert at head", "Access by index", "Delete head node", "Check if empty"], answer: "b", explanation: "Access by index requires traversing from head → O(n). SLL has no random access like arrays." },
  { id: "ll-mc3", type: "mcq", text: "In a CDLL, to avoid infinite loops during traversal, you should use a:", marks: 2, options: ["for loop", "while loop with counter", "do-while loop", "recursive function"], answer: "c", explanation: "A do-while loop processes the current node first, then checks if we've returned to head. This ensures all nodes are visited exactly once." },
  { id: "ll-mc4", type: "mcq", text: "Which is an advantage of a DLL over an SLL?", marks: 2, options: ["Uses less memory per node", "Allows backward traversal", "Faster insertion at head", "Simpler implementation"], answer: "b", explanation: "DLL allows backward traversal via the 'prev' pointer. The tradeoff is 8 extra bytes per node on a 64-bit system." },

  // ── Fill in the Blank ──
  { id: "ll-f1", type: "fill", text: "To delete a node N from a DLL (given a pointer to N), set N.prev.next = ___ and N.next.prev = N.prev.", marks: 1, answer: "N.next", acceptedAnswers: ["N.next", "n.next", "node.next"], explanation: "Bypass N by connecting its predecessor directly to its successor: N.prev.next = N.next." },
  { id: "ll-f2", type: "fill", text: "The time complexity of inserting at the tail of an SLL (without a tail pointer) is ___.", marks: 1, answer: "O(n)", acceptedAnswers: ["O(n)", "o(n)", "linear"], explanation: "Without a tail pointer, you must traverse all n nodes to reach the end before inserting." },
  { id: "ll-f3", type: "fill", text: "In a CDLL, both head.prev and tail.next point to the ___ nodes to complete the circle.", marks: 1, answer: "opposite", acceptedAnswers: ["opposite", "tail", "head", "other"], explanation: "head.prev points to tail, and tail.next points to head, forming the circular structure." },
  { id: "ll-f4", type: "fill", text: "Deleting a node from a DLL when you already have a pointer to it takes ___ time.", marks: 1, answer: "O(1)", acceptedAnswers: ["O(1)", "o(1)", "constant", "Constant"], explanation: "O(1) constant time — both prev and next neighbors are directly accessible." },

  // ── Short Answer (as MCQ format for auto-grading) ──
  { id: "ll-mc5", type: "mcq", text: "Why is a do-while loop required (instead of while) for traversing a CDLL?", marks: 2, options: ["do-while is faster than while", "A while loop would skip the head node since head == head is true initially", "do-while handles NULL pointers better", "while loops cannot be used with linked lists"], answer: "b", explanation: "The condition p != head is immediately true when p starts at head, so a while loop skips the entire body. A do-while processes head first, then checks for loop completion." },
];
