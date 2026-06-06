"use client";
import { useRef, useEffect, useState, useCallback } from "react";

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type Mode = "idle" | "search" | "traverse";
interface Anim {
  mode: Mode;
  order: number[];
  pos: number;
  visited: Set<number>;
  frameAcc: number;
  target?: number;
  found?: boolean;
  label: string;
}

function insert(root: TreeNode | null, v: number): TreeNode {
  if (!root) return { val: v, left: null, right: null };
  if (v < root.val) root.left = insert(root.left, v);
  else if (v > root.val) root.right = insert(root.right, v);
  return root;
}
function clone(n: TreeNode | null): TreeNode | null {
  return n ? { val: n.val, left: clone(n.left), right: clone(n.right) } : null;
}
function buildDefault(): TreeNode | null {
  let r: TreeNode | null = null;
  [50, 30, 70, 20, 40, 65, 80, 10].forEach((v) => { r = insert(r, v); });
  return r;
}

export default function BSTViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [root, setRoot] = useState<TreeNode | null>(buildDefault);
  const [inputVal, setInputVal] = useState("45");
  const [status, setStatus] = useState("Ready — try inserting, searching, or a traversal");

  const rootRef = useRef(root);
  rootRef.current = root;
  const animState = useRef<Anim>({ mode: "idle", order: [], pos: 0, visited: new Set(), frameAcc: 0, label: "" });
  const flashRef = useRef<{ val: number; alpha: number } | null>(null);

  const stopAnim = () => { animState.current = { mode: "idle", order: [], pos: 0, visited: new Set(), frameAcc: 0, label: "" }; };

  const doInsert = useCallback(() => {
    const v = parseInt(inputVal);
    if (isNaN(v)) return;
    stopAnim();
    setRoot((prev) => {
      const exists = (n: TreeNode | null): boolean => !!n && (n.val === v || exists(n.left) || exists(n.right));
      if (exists(prev)) { setStatus(`${v} already in tree (duplicates ignored)`); return prev; }
      const next = clone(prev);
      const res = insert(next, v);
      setStatus(`Inserted ${v}`);
      flashRef.current = { val: v, alpha: 1 };
      return res;
    });
  }, [inputVal]);

  const doSearch = useCallback(() => {
    const v = parseInt(inputVal);
    if (isNaN(v)) return;
    const path: number[] = [];
    let n = rootRef.current;
    let found = false;
    while (n) {
      path.push(n.val);
      if (v === n.val) { found = true; break; }
      n = v < n.val ? n.left : n.right;
    }
    animState.current = { mode: "search", order: path, pos: 0, visited: new Set(), frameAcc: 0, target: v, found, label: `Search ${v}` };
    setStatus(`Searching for ${v}…`);
  }, [inputVal]);

  const traverse = useCallback((kind: "in" | "pre" | "post") => {
    const order: number[] = [];
    const rec = (n: TreeNode | null) => {
      if (!n) return;
      if (kind === "pre") order.push(n.val);
      rec(n.left);
      if (kind === "in") order.push(n.val);
      rec(n.right);
      if (kind === "post") order.push(n.val);
    };
    rec(rootRef.current);
    const label = kind === "in" ? "Inorder (L,Root,R)" : kind === "pre" ? "Preorder (Root,L,R)" : "Postorder (L,R,Root)";
    animState.current = { mode: "traverse", order, pos: 0, visited: new Set(), frameAcc: 0, label };
    setStatus(`${label} …`);
  }, []);

  const reset = useCallback(() => { stopAnim(); setRoot(buildDefault()); setStatus("Reset"); flashRef.current = null; }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const r = rootRef.current;

      // layout: x by inorder index, y by depth
      const pos: Record<number, { xi: number; depth: number }> = {};
      let xi = 0, maxDepth = 0;
      const lay = (n: TreeNode | null, d: number) => {
        if (!n) return;
        lay(n.left, d + 1);
        pos[n.val] = { xi: xi++, depth: d };
        maxDepth = Math.max(maxDepth, d);
        lay(n.right, d + 1);
      };
      lay(r, 0);
      const count = xi;
      const radius = 18;
      const marginX = 40, topY = 44;
      const xGap = count > 1 ? (W - 2 * marginX) / (count - 1) : 0;
      const yGap = Math.min(64, (H - topY - 30) / Math.max(1, maxDepth));
      const px = (v: number) => marginX + (count > 1 ? pos[v].xi * xGap : (W - 2 * marginX) / 2);
      const py = (v: number) => topY + pos[v].depth * yGap;

      const a = animState.current;
      // advance animation
      if (a.mode !== "idle" && a.pos < a.order.length) {
        a.frameAcc++;
        if (a.frameAcc >= 16) {
          a.frameAcc = 0;
          a.visited.add(a.order[a.pos]);
          a.pos++;
          if (a.mode === "traverse") {
            setStatus(`${a.label}:  ${a.order.slice(0, a.pos).join(" → ")}`);
          } else if (a.mode === "search") {
            if (a.pos >= a.order.length) {
              setStatus(a.found ? `✓ Found ${a.target} (path: ${a.order.join(" → ")})` : `✗ ${a.target} not found — fell off at ${a.order[a.order.length - 1]}`);
            } else {
              setStatus(`Search ${a.target}: visiting ${a.order[a.pos - 1]} → go ${a.target! < a.order[a.pos - 1] ? "left" : "right"}`);
            }
          }
        }
      }

      // edges
      const drawEdges = (n: TreeNode | null) => {
        if (!n) return;
        for (const c of [n.left, n.right]) {
          if (c) {
            ctx.strokeStyle = "rgba(148,163,184,0.35)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px(n.val), py(n.val));
            ctx.lineTo(px(c.val), py(c.val));
            ctx.stroke();
            drawEdges(c);
          }
        }
      };
      drawEdges(r);

      // nodes
      const drawNodes = (n: TreeNode | null) => {
        if (!n) return;
        drawNodes(n.left);
        const x = px(n.val), y = py(n.val);
        const visited = a.visited.has(n.val);
        const current = a.mode !== "idle" && a.pos > 0 && a.order[a.pos - 1] === n.val && a.pos <= a.order.length;
        let fill = "#262a37", stroke = "rgba(99,102,241,0.5)";
        if (visited) {
          if (a.mode === "search" && a.pos >= a.order.length) {
            fill = a.found ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.30)";
            stroke = a.found ? "#22c55e" : "#ef4444";
          } else { fill = "rgba(250,204,21,0.30)"; stroke = "#facc15"; }
        }
        if (current) { fill = "rgba(99,102,241,0.45)"; stroke = "#818cf8"; }
        if (flashRef.current && flashRef.current.val === n.val && flashRef.current.alpha > 0) { fill = "#22c55e"; stroke = "#22c55e"; }

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#eef1fb";
        ctx.font = "bold 13px 'JetBrains Mono'";
        ctx.textAlign = "center";
        ctx.fillText(String(n.val), x, y + 4);
        drawNodes(n.right);
      };
      if (r) drawNodes(r);
      else {
        ctx.fillStyle = "rgba(148,163,184,0.6)";
        ctx.font = "13px Inter";
        ctx.textAlign = "center";
        ctx.fillText("Empty tree — insert a value", W / 2, H / 2);
      }

      // header
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "bold 11px Inter";
      ctx.textAlign = "left";
      ctx.fillText(`BINARY SEARCH TREE  ·  ${count} node${count === 1 ? "" : "s"}  ·  height ${Math.max(0, maxDepth)}`, 16, 22);

      if (flashRef.current) { flashRef.current.alpha -= 0.04; if (flashRef.current.alpha <= 0) flashRef.current = null; }

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 380 * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = "380px";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="viz-container">
      <div className="viz-controls">
        <span className="ctrl-label">Value:</span>
        <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Value" style={{ width: "80px" }} />
        <button className="btn btn-success" onClick={doInsert}>＋ Insert</button>
        <button className="btn btn-primary" onClick={doSearch}>🔍 Search</button>
        <div className="ctrl-separator" />
        <button className="btn btn-ghost" onClick={() => traverse("in")}>Inorder</button>
        <button className="btn btn-ghost" onClick={() => traverse("pre")}>Preorder</button>
        <button className="btn btn-ghost" onClick={() => traverse("post")}>Postorder</button>
        <button className="btn btn-danger" onClick={reset} style={{ fontSize: "0.8rem" }}>↺ Reset</button>
        <span className="status-text">{status}</span>
      </div>
      <div className="viz-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
