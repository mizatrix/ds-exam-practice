"use client";

interface CodePanelProps {
  cppCode: string;
  pythonCode: string;
}

import { useState } from "react";

export default function CodePanel({ cppCode, pythonCode }: CodePanelProps) {
  const [lang, setLang] = useState<"cpp" | "python">("cpp");

  return (
    <div className="code-panel">
      <div className="code-tabs">
        <button className={`code-tab ${lang === "cpp" ? "active" : ""}`} onClick={() => setLang("cpp")}>C++</button>
        <button className={`code-tab ${lang === "python" ? "active" : ""}`} onClick={() => setLang("python")}>Python</button>
      </div>
      <pre className="code-display">
        <code dangerouslySetInnerHTML={{ __html: lang === "cpp" ? cppCode : pythonCode }} />
      </pre>
    </div>
  );
}
