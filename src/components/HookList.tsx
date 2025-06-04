import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface Props {
  hooks: string[];
}

export default function HookList({ hooks }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, "like" | "dislike">>(
    {}
  );

  const toggleFeedback = (index: number, type: "like" | "dislike") => {
    setFeedback((prev) => {
      const current = prev[index];
      if (current === type) {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      }
      return { ...prev, [index]: type };
    });
  };

  const handleCopy = (hook: string, index: number) => {
    navigator.clipboard.writeText(hook);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <div className="hook-list">
      {hooks.map((hook, index) => (
        <div className="hook-item fade-in" key={index}>
          <p className="hook-text">{hook}</p>
          <button
            className="copy-button"
            onClick={() => handleCopy(hook, index)}
            aria-label="Copy hook"
          >
            {copiedIndex === index ? (
              <FiCheck size={18} color="#22c55e" />
            ) : (
              <FiCopy size={18} />
            )}
          </button>

          <div className="hook-actions">
            <button
              className={`like-button ${feedback[index] === "like" ? "active" : ""}`}
              onClick={() => toggleFeedback(index, "like")}
              aria-label="Like"
            >
              👍
            </button>
            <button
              className={`dislike-button ${feedback[index] === "dislike" ? "active" : ""}`}
              onClick={() => toggleFeedback(index, "dislike")}
              aria-label="Dislike"
            >
              👎
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
