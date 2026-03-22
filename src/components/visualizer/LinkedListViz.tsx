"use client";
import { useRef, useEffect, useState, useCallback } from "react";

interface Node {
  value: number;
  x: number;
  targetX: number;
  y: number;
}

type ListType = "sll" | "dll" | "cdll";

interface LinkedListVizProps {
  type?: ListType;
}

export default function LinkedListViz({ type = "sll" }: LinkedListVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [nodes, setNodes] = useState<Node[]>([
    { value: 10, x: 0, targetX: 0, y: 0 },
    { value: 20, x: 0, targetX: 0, y: 0 },
    { value: 30, x: 0, targetX: 0, y: 0 },
  ]);
  const [inputVal, setInputVal] = useState("15");
  const [insertPos, setInsertPos] = useState("head");
  const [statusText, setStatusText] = useState("Ready");
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  const recalcPositions = useCallback((list: Node[], W: number) => {
    const nodeW = 80;
    const gap = type === "sll" ? 60 : 80;
    const totalW = list.length * nodeW + (list.length - 1) * gap;
    const startX = Math.max(40, (W - totalW) / 2);
    return list.map((n, i) => ({
      ...n,
      targetX: startX + i * (nodeW + gap),
    }));
  }, [type]);

  const insertNode = useCallback((pos: string) => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;
    const newNode: Node = { value: val, x: 0, targetX: 0, y: 0 };

    setNodes((prev) => {
      let updated: Node[];
      if (pos === "head") {
        updated = [newNode, ...prev];
        setStatusText(`Inserted ${val} at head`);
      } else if (pos === "tail") {
        updated = [...prev, newNode];
        setStatusText(`Inserted ${val} at tail`);
      } else {
        const idx = Math.min(parseInt(pos) || 1, prev.length);
        updated = [...prev.slice(0, idx), newNode, ...prev.slice(idx)];
        setStatusText(`Inserted ${val} at index ${idx}`);
      }
      const canvas = canvasRef.current;
      const W = canvas ? canvas.width / (window.devicePixelRatio || 1) : 800;
      return recalcPositions(updated, W);
    });
    setHighlightIdx(null);
    setTimeout(() => {
      setNodes((prev) => {
        const insertedIdx = insertPos === "head" ? 0 : insertPos === "tail" ? prev.length - 1 : Math.min(parseInt(insertPos) || 1, prev.length - 1);
        setHighlightIdx(insertedIdx);
        return prev;
      });
    }, 100);
  }, [inputVal, insertPos, recalcPositions]);

  const deleteNode = useCallback((pos: string) => {
    setNodes((prev) => {
      if (prev.length === 0) return prev;
      let updated: Node[];
      if (pos === "head") {
        updated = prev.slice(1);
        setStatusText("Deleted head node");
      } else if (pos === "tail") {
        updated = prev.slice(0, -1);
        setStatusText("Deleted tail node");
      } else {
        const idx = Math.min(parseInt(pos) || 0, prev.length - 1);
        updated = prev.filter((_, i) => i !== idx);
        setStatusText(`Deleted node at index ${idx}`);
      }
      const canvas = canvasRef.current;
      const W = canvas ? canvas.width / (window.devicePixelRatio || 1) : 800;
      return recalcPositions(updated, W);
    });
    setHighlightIdx(null);
  }, [recalcPositions]);

  // Animation
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

      const nodeW = 80;
      const nodeH = 44;
      const centerY = H / 2;

      // Animate positions
      let needsUpdate = false;
      const updatedNodes = nodes.map((n) => {
        const dx = n.targetX - n.x;
        if (Math.abs(dx) > 1) {
          needsUpdate = true;
          return { ...n, x: n.x + dx * 0.12, y: centerY - nodeH / 2 };
        }
        return { ...n, x: n.targetX, y: centerY - nodeH / 2 };
      });
      if (needsUpdate) {
        setNodes(updatedNodes);
      }

      // Draw arrows and nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = n.x || n.targetX;
        const y = centerY - nodeH / 2;

        // Draw forward arrow
        if (i < nodes.length - 1 || (type === "cdll" && nodes.length > 1)) {
          const nextIdx = (i + 1) % nodes.length;
          const next = nodes[nextIdx];
          const fromX = x + nodeW;
          const toX = (next.x || next.targetX);

          if (type === "cdll" && i === nodes.length - 1) {
            // Curved arrow for circular
            ctx.strokeStyle = "#4ae176";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fromX, centerY);
            ctx.bezierCurveTo(fromX + 40, centerY + 80, toX - 40, centerY + 80, toX, centerY);
            ctx.stroke();
            // Arrowhead
            ctx.fillStyle = "#4ae176";
            ctx.beginPath();
            ctx.moveTo(toX, centerY - 5);
            ctx.lineTo(toX + 8, centerY);
            ctx.lineTo(toX, centerY + 5);
            ctx.fill();
          } else {
            ctx.strokeStyle = "rgba(192, 193, 255, 0.5)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fromX + 4, centerY);
            ctx.lineTo(toX - 8, centerY);
            ctx.stroke();
            // Arrowhead
            ctx.fillStyle = "rgba(192, 193, 255, 0.5)";
            ctx.beginPath();
            ctx.moveTo(toX - 8, centerY - 5);
            ctx.lineTo(toX, centerY);
            ctx.lineTo(toX - 8, centerY + 5);
            ctx.fill();
          }
        }

        // Draw backward arrow (DLL / CDLL)
        if ((type === "dll" || type === "cdll") && i > 0) {
          const prev = nodes[i - 1];
          const fromX = x;
          const toX = (prev.x || prev.targetX) + nodeW;
          ctx.strokeStyle = "rgba(238, 194, 0, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(fromX - 4, centerY + 8);
          ctx.lineTo(toX + 8, centerY + 8);
          ctx.stroke();
          ctx.setLineDash([]);
          // Arrowhead
          ctx.fillStyle = "rgba(238, 194, 0, 0.4)";
          ctx.beginPath();
          ctx.moveTo(toX + 8, centerY + 3);
          ctx.lineTo(toX, centerY + 8);
          ctx.lineTo(toX + 8, centerY + 13);
          ctx.fill();
        }

        // CDLL backward arrow from head to tail
        if (type === "cdll" && i === 0 && nodes.length > 1) {
          const last = nodes[nodes.length - 1];
          const toX = (last.x || last.targetX) + nodeW;
          ctx.strokeStyle = "rgba(238, 194, 0, 0.5)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(x, centerY - 8);
          ctx.bezierCurveTo(x - 40, centerY - 70, toX + 40, centerY - 70, toX, centerY - 8);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw node box
        const isHighlighted = highlightIdx === i;
        ctx.fillStyle = isHighlighted ? "rgba(74, 225, 118, 0.2)" : "#262a37";
        ctx.strokeStyle = isHighlighted ? "#4ae176" : "rgba(70, 69, 84, 0.3)";
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, nodeW, nodeH, 8);
        ctx.fill();
        ctx.stroke();

        // Node value
        ctx.fillStyle = "#dfe2f3";
        ctx.font = "bold 16px 'JetBrains Mono'";
        ctx.textAlign = "center";
        ctx.fillText(String(n.value), x + nodeW / 2, y + nodeH / 2 + 6);

        // NULL indicator for SLL tail
        if (type === "sll" && i === nodes.length - 1) {
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 10px Inter";
          ctx.fillText("NULL", x + nodeW + 24, centerY + 4);
        }
      }

      // Labels
      if (nodes.length > 0) {
        const headX = nodes[0].x || nodes[0].targetX;
        ctx.fillStyle = "#c0c1ff";
        ctx.font = "bold 11px Inter";
        ctx.textAlign = "center";
        ctx.fillText("HEAD", headX + 40, centerY - nodeH / 2 - 12);

        if (nodes.length > 1) {
          const tailX = nodes[nodes.length - 1].x || nodes[nodes.length - 1].targetX;
          ctx.fillStyle = "#eec200";
          ctx.fillText("TAIL", tailX + 40, centerY - nodeH / 2 - 12);
        }
      }

      // Type label
      const typeLabels: Record<string, string> = { sll: "SINGLY LINKED LIST", dll: "DOUBLY LINKED LIST", cdll: "CIRCULAR DOUBLY LINKED LIST" };
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.font = "bold 10px Inter";
      ctx.textAlign = "right";
      ctx.fillText(typeLabels[type] || "", W - 16, 20);

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [nodes, type, highlightIdx]);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 220 * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = "220px";
      setNodes((prev) => recalcPositions(prev, rect.width));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [recalcPositions]);

  return (
    <div className="viz-container">
      <div className="viz-controls">
        <span className="ctrl-label">Value:</span>
        <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Value" style={{ width: "80px" }} />
        <span className="ctrl-label">At:</span>
        <select value={insertPos} onChange={(e) => setInsertPos(e.target.value)} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--outline-variant)", background: "var(--surface-highest)", color: "var(--on-surface)", fontFamily: "var(--font-code)", fontSize: "0.85rem" }}>
          <option value="head">Head</option>
          <option value="tail">Tail</option>
          <option value="1">Index 1</option>
          <option value="2">Index 2</option>
        </select>
        <div className="ctrl-separator" />
        <button className="btn btn-success" onClick={() => insertNode(insertPos)}>+ Insert</button>
        <button className="btn btn-danger" onClick={() => deleteNode(insertPos)} style={{ fontSize: "0.8rem" }}>− Delete</button>
        <span className="status-text">{statusText}</span>
      </div>
      <div className="viz-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
