"use client";
import { useRef, useEffect, useState, useCallback } from "react";

const CAPACITY = 8;

interface Flash {
  idx: number;
  color: string;
  alpha: number;
}

export default function StackViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [stack, setStack] = useState<number[]>([12, 7, 25]);
  const [inputVal, setInputVal] = useState("9");
  const [status, setStatus] = useState("Ready — stack of 3");

  const stackRef = useRef(stack);
  stackRef.current = stack;
  const flashRef = useRef<Flash | null>(null);
  const peekRef = useRef(0); // peek pulse timer

  const push = useCallback(() => {
    const v = parseInt(inputVal);
    if (isNaN(v)) return;
    setStack((prev) => {
      if (prev.length >= CAPACITY) {
        setStatus("⛔ OVERFLOW — stack is full (top = n)");
        flashRef.current = { idx: prev.length - 1, color: "#ef4444", alpha: 1 };
        return prev;
      }
      const next = [...prev, v];
      setStatus(`Pushed ${v} — top = ${next.length}`);
      flashRef.current = { idx: next.length - 1, color: "#22c55e", alpha: 1 };
      return next;
    });
  }, [inputVal]);

  const pop = useCallback(() => {
    setStack((prev) => {
      if (prev.length === 0) {
        setStatus("⛔ UNDERFLOW — stack is empty (top = 0)");
        return prev;
      }
      const v = prev[prev.length - 1];
      setStatus(`Popped ${v} — top = ${prev.length - 1}`);
      flashRef.current = { idx: prev.length - 1, color: "#f97316", alpha: 1 };
      return prev.slice(0, -1);
    });
  }, []);

  const peek = useCallback(() => {
    setStack((prev) => {
      if (prev.length === 0) {
        setStatus("Stack empty — nothing to peek");
        return prev;
      }
      setStatus(`top() = ${prev[prev.length - 1]} (read only, O(1))`);
      peekRef.current = 1;
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setStack([12, 7, 25]);
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

      const s = stackRef.current;
      const boxW = 150;
      const boxH = Math.min(34, (H - 60) / CAPACITY);
      const gap = 4;
      const x = (W - boxW) / 2;
      const baseY = H - 30;

      // draw all capacity slots (outlines)
      for (let i = 0; i < CAPACITY; i++) {
        const y = baseY - (i + 1) * (boxH + gap);
        const filled = i < s.length;
        const isTop = i === s.length - 1;

        let fill = "transparent";
        let stroke = "rgba(70,69,84,0.35)";
        if (filled) {
          fill = isTop ? "rgba(99,102,241,0.28)" : "#262a37";
          stroke = isTop ? "#6366f1" : "rgba(99,102,241,0.35)";
        }
        // flash overlay
        if (flashRef.current && flashRef.current.idx === i && flashRef.current.alpha > 0) {
          fill = flashRef.current.color;
        }
        // peek pulse on top
        if (peekRef.current > 0 && isTop) {
          stroke = "#facc15";
        }
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = isTop && filled ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, boxW, boxH, 6);
        if (filled || true) ctx.fill();
        ctx.stroke();

        // index label
        ctx.fillStyle = "rgba(148,163,184,0.7)";
        ctx.font = "10px 'JetBrains Mono'";
        ctx.textAlign = "right";
        ctx.fillText(String(i + 1), x - 8, y + boxH / 2 + 4);

        if (filled) {
          ctx.fillStyle = "#dfe2f3";
          ctx.font = "bold 15px 'JetBrains Mono'";
          ctx.textAlign = "center";
          ctx.fillText(String(s[i]), x + boxW / 2, y + boxH / 2 + 5);
        }
      }

      // TOP pointer
      if (s.length > 0) {
        const topY = baseY - s.length * (boxH + gap) + boxH / 2;
        ctx.fillStyle = "#facc15";
        ctx.font = "bold 12px Inter";
        ctx.textAlign = "left";
        ctx.fillText("◄ TOP", x + boxW + 12, topY + 4);
      } else {
        ctx.fillStyle = "rgba(239,68,68,0.8)";
        ctx.font = "bold 12px Inter";
        ctx.textAlign = "center";
        ctx.fillText("empty (top = 0)", W / 2, baseY - 10);
      }

      // base line
      ctx.strokeStyle = "rgba(148,163,184,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 10, baseY + 2);
      ctx.lineTo(x + boxW + 10, baseY + 2);
      ctx.stroke();

      // header
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "bold 11px Inter";
      ctx.textAlign = "left";
      ctx.fillText(`STACK (1:${CAPACITY})  ·  size = ${s.length}`, 16, 22);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.textAlign = "right";
      ctx.fillText("LIFO", W - 16, 22);

      // decay flashes
      if (flashRef.current) {
        flashRef.current.alpha -= 0.04;
        if (flashRef.current.alpha <= 0) flashRef.current = null;
      }
      if (peekRef.current > 0) peekRef.current -= 0.02;

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // resize
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
        <button className="btn btn-success" onClick={push}>⬆ Push</button>
        <button className="btn btn-danger" onClick={pop}>⬇ Pop</button>
        <button className="btn btn-ghost" onClick={peek}>👁 Peek</button>
        <button className="btn btn-ghost" onClick={reset} style={{ fontSize: "0.8rem" }}>↺ Reset</button>
        <span className="status-text">{status}</span>
      </div>
      <div className="viz-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
