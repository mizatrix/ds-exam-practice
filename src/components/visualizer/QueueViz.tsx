"use client";
import { useRef, useEffect, useState, useCallback } from "react";

const N = 8; // slots (one is always sacrificed → capacity N-1)

interface QState {
  slots: (number | null)[];
  front: number;
  rear: number;
}

export default function QueueViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [q, setQ] = useState<QState>(() => {
    const slots = Array<number | null>(N).fill(null);
    slots[1] = 5; slots[2] = 8; slots[3] = 3;
    return { slots, front: 0, rear: 3 };
  });
  const [inputVal, setInputVal] = useState("7");
  const [status, setStatus] = useState("Ready — 3 items queued");

  const qRef = useRef(q);
  qRef.current = q;
  const flashRef = useRef<{ idx: number; color: string; alpha: number } | null>(null);

  const count = (s: QState) => (s.rear - s.front + N) % N;

  const addq = useCallback(() => {
    const v = parseInt(inputVal);
    if (isNaN(v)) return;
    setQ((prev) => {
      if ((prev.rear + 1) % N === prev.front) {
        setStatus("⛔ QUEUE FULL — front == (rear+1) mod n (1 slot sacrificed)");
        return prev;
      }
      const rear = (prev.rear + 1) % N;
      const slots = [...prev.slots];
      slots[rear] = v;
      setStatus(`ADDQ(${v}) — rear = (${prev.rear}+1) mod ${N} = ${rear}`);
      flashRef.current = { idx: rear, color: "#22c55e", alpha: 1 };
      return { slots, front: prev.front, rear };
    });
  }, [inputVal]);

  const deleteq = useCallback(() => {
    setQ((prev) => {
      if (prev.front === prev.rear) {
        setStatus("⛔ QUEUE EMPTY — front == rear");
        return prev;
      }
      const front = (prev.front + 1) % N;
      const v = prev.slots[front];
      const slots = [...prev.slots];
      flashRef.current = { idx: front, color: "#f97316", alpha: 1 };
      slots[front] = null;
      setStatus(`DELETEQ — front = ${front}, removed ${v}`);
      return { slots, front, rear: prev.rear };
    });
  }, []);

  const reset = useCallback(() => {
    const slots = Array<number | null>(N).fill(null);
    slots[1] = 5; slots[2] = 8; slots[3] = 3;
    setQ({ slots, front: 0, rear: 3 });
    setStatus("Reset");
    flashRef.current = null;
  }, []);

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

      const s = qRef.current;
      const cx = W / 2;
      const cy = H / 2 + 6;
      const R = Math.min(W, H) / 2 - 64;
      const box = 44;

      // occupied indices = (front+1 .. rear)
      const occupied = new Set<number>();
      let i = s.front;
      while (i !== s.rear) { i = (i + 1) % N; occupied.add(i); }

      const posOf = (idx: number) => {
        const ang = (idx / N) * Math.PI * 2 - Math.PI / 2;
        return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang), ang };
      };

      // ring guide
      ctx.strokeStyle = "rgba(99,102,241,0.12)";
      ctx.lineWidth = box + 8;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      for (let idx = 0; idx < N; idx++) {
        const { x, y } = posOf(idx);
        const occ = occupied.has(idx);
        let fill = "#1b1f2e";
        let stroke = "rgba(70,69,84,0.4)";
        if (occ) { fill = "rgba(99,102,241,0.30)"; stroke = "#6366f1"; }
        if (flashRef.current && flashRef.current.idx === idx && flashRef.current.alpha > 0) fill = flashRef.current.color;

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = occ ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x - box / 2, y - box / 2, box, box, 8);
        ctx.fill();
        ctx.stroke();

        // value
        if (s.slots[idx] != null) {
          ctx.fillStyle = "#dfe2f3";
          ctx.font = "bold 15px 'JetBrains Mono'";
          ctx.textAlign = "center";
          ctx.fillText(String(s.slots[idx]), x, y + 5);
        }
        // index outside the ring
        const { x: ox, y: oy } = (() => {
          const ang = (idx / N) * Math.PI * 2 - Math.PI / 2;
          return { x: cx + (R + box / 2 + 14) * Math.cos(ang), y: cy + (R + box / 2 + 14) * Math.sin(ang) };
        })();
        ctx.fillStyle = "rgba(148,163,184,0.7)";
        ctx.font = "10px 'JetBrains Mono'";
        ctx.textAlign = "center";
        ctx.fillText(String(idx), ox, oy + 3);
      }

      // front / rear markers (inside)
      const marker = (idx: number, label: string, color: string, dy: number) => {
        const ang = (idx / N) * Math.PI * 2 - Math.PI / 2;
        const mx = cx + (R - box / 2 - 16) * Math.cos(ang);
        const my = cy + (R - box / 2 - 16) * Math.sin(ang);
        ctx.fillStyle = color;
        ctx.font = "bold 12px Inter";
        ctx.textAlign = "center";
        ctx.fillText(label, mx, my + dy);
      };
      marker(s.front, "FRONT", "#facc15", s.front === s.rear ? -4 : 4);
      marker(s.rear, "REAR", "#22d3ee", s.front === s.rear ? 10 : 4);

      // center info
      ctx.textAlign = "center";
      ctx.fillStyle = "#c0c1ff";
      ctx.font = "bold 13px Inter";
      ctx.fillText(`count = ${count(s)}`, cx, cy - 6);
      ctx.fillStyle = "rgba(148,163,184,0.85)";
      ctx.font = "10px 'JetBrains Mono'";
      ctx.fillText(`front=${s.front} rear=${s.rear}`, cx, cy + 12);
      const full = (s.rear + 1) % N === s.front;
      const empty = s.front === s.rear;
      ctx.fillStyle = full ? "#ef4444" : empty ? "#f59e0b" : "rgba(148,163,184,0.7)";
      ctx.font = "bold 10px Inter";
      ctx.fillText(full ? "FULL" : empty ? "EMPTY" : `cap ${N - 1}`, cx, cy + 28);

      // header
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "bold 11px Inter";
      ctx.textAlign = "left";
      ctx.fillText(`CIRCULAR QUEUE  Q(0:${N - 1})`, 16, 22);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.textAlign = "right";
      ctx.fillText("FIFO", W - 16, 22);

      if (flashRef.current) {
        flashRef.current.alpha -= 0.04;
        if (flashRef.current.alpha <= 0) flashRef.current = null;
      }

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
      canvas.height = 360 * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = "360px";
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
        <div className="ctrl-separator" />
        <button className="btn btn-success" onClick={addq}>＋ ADDQ</button>
        <button className="btn btn-danger" onClick={deleteq}>－ DELETEQ</button>
        <button className="btn btn-ghost" onClick={reset} style={{ fontSize: "0.8rem" }}>↺ Reset</button>
        <span className="status-text">{status}</span>
      </div>
      <div className="viz-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
