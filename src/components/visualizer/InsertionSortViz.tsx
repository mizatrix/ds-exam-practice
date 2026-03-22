"use client";
import { useRef, useEffect, useState, useCallback } from "react";

interface InsertionSortVizProps {
  initialArray?: number[];
}

interface SortState {
  arr: number[];
  j: number;
  i: number;
  key: number;
  phase: "pick" | "compare" | "shift" | "place" | "done";
  comparisons: number;
}

export default function InsertionSortViz({ initialArray = [7, 3, 9, 2, 6] }: InsertionSortVizProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [inputVal, setInputVal] = useState(initialArray.join(", "));
  const [state, setState] = useState<SortState | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [statusText, setStatusText] = useState("Ready");
  const frameCount = useRef(0);

  const resetSort = useCallback(() => {
    const arr = inputVal.split(",").map((x) => parseInt(x.trim())).filter((x) => !isNaN(x));
    if (arr.length === 0) return;
    setState({
      arr: [...arr],
      j: 1,
      i: 0,
      key: arr[1] ?? arr[0],
      phase: "pick",
      comparisons: 0,
    });
    setPlaying(false);
    setStatusText("Ready");
  }, [inputVal]);

  useEffect(() => { resetSort(); }, []);

  const doStep = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.phase === "done") return prev;
      const s = { ...prev, arr: [...prev.arr] };

      if (s.phase === "pick") {
        s.key = s.arr[s.j];
        s.i = s.j - 1;
        s.phase = "compare";
        setStatusText(`Pass ${s.j}: key = ${s.key}`);
      } else if (s.phase === "compare") {
        if (s.i >= 0 && s.arr[s.i] > s.key) {
          s.comparisons++;
          s.phase = "shift";
        } else {
          if (s.i >= 0) s.comparisons++;
          s.phase = "place";
        }
      } else if (s.phase === "shift") {
        s.arr[s.i + 1] = s.arr[s.i];
        s.i--;
        s.phase = "compare";
      } else if (s.phase === "place") {
        s.arr[s.i + 1] = s.key;
        s.j++;
        if (s.j >= s.arr.length) {
          s.phase = "done";
          setPlaying(false);
          setStatusText("Done!");
        } else {
          s.phase = "pick";
        }
      }
      return s;
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!state) return;
      const W = canvas.width;
      const H = canvas.height;
      const dpr = window.devicePixelRatio || 1;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, W, H);

      const maxVal = Math.max(...state.arr);
      const barW = Math.max(30, Math.min(60, (W / dpr - 80) / state.arr.length - 8));
      const totalW = state.arr.length * (barW + 8) - 8;
      const startX = ((W / dpr) - totalW) / 2;
      const barMaxH = (H / dpr) - 100;

      for (let idx = 0; idx < state.arr.length; idx++) {
        const x = startX + idx * (barW + 8);
        const h = (state.arr[idx] / maxVal) * barMaxH;
        const y = (H / dpr) - 40 - h;

        let color: string;
        if (state.phase === "done") color = "#22c55e";
        else if (idx < state.j && state.phase !== "pick") color = "rgba(34, 197, 94, 0.7)";
        else if (idx === state.j && state.phase === "pick") color = "#facc15";
        else if (state.phase === "compare" && idx === state.i) color = "#ef4444";
        else if (state.phase === "shift" && idx === state.i + 1) color = "#f97316";
        else color = "rgba(99, 102, 241, 0.6)";

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "bold 14px Inter";
        ctx.fillText(String(state.arr[idx]), x + barW / 2, y - 8);

        ctx.fillStyle = "#64748b";
        ctx.font = "10px Inter";
        ctx.fillText(String(idx), x + barW / 2, (H / dpr) - 22);
        ctx.restore();
      }

      // Info text
      ctx.save();
      const dprs = dpr;
      ctx.scale(dprs, dprs);
      if (state.phase !== "done" && state.j < state.arr.length) {
        ctx.fillStyle = "#facc15";
        ctx.font = "bold 12px Inter";
        ctx.textAlign = "left";
        ctx.fillText(`Key = ${state.key}  |  j = ${state.j}  |  Comparisons: ${state.comparisons}`, 16, 24);
      }
      if (state.phase === "done") {
        ctx.fillStyle = "#22c55e";
        ctx.textAlign = "center";
        ctx.font = "bold 16px Inter";
        ctx.fillText(`✓ Sorted!  Total comparisons: ${state.comparisons}`, (W / dprs) / 2, 28);
      }
      ctx.restore();

      // Auto-play stepping
      if (playing && state.phase !== "done") {
        frameCount.current++;
        const interval = Math.max(2, 15 - speed * 1.3);
        if (frameCount.current % Math.floor(interval) === 0) {
          doStep();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [state, playing, speed, doStep]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = Math.min(340, rect.width * 0.45) * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${Math.min(340, rect.width * 0.45)}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="viz-container">
      <div className="viz-controls">
        <span className="ctrl-label">Array:</span>
        <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="e.g. 4, 2, 5, 1, 3" />
        <div className="ctrl-separator" />
        <button className="btn btn-primary" onClick={() => { frameCount.current = 0; setPlaying(true); }} disabled={state?.phase === "done"}>▶ Play</button>
        <button className="btn btn-ghost" onClick={doStep} disabled={state?.phase === "done"}>⏭ Step</button>
        <button className="btn btn-ghost" onClick={() => setPlaying(false)}>⏸ Pause</button>
        <button className="btn btn-danger" onClick={resetSort} style={{ fontSize: "0.8rem" }}>↺ Reset</button>
        <div className="ctrl-separator" />
        <span className="ctrl-label">Speed:</span>
        <input type="range" min={1} max={10} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        <span className="status-text">{statusText}</span>
      </div>
      <div className="viz-canvas">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
