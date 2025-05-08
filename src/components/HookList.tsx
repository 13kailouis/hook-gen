import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface Props {
  hooks: string[];
}

export default function HookList({ hooks }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (hook: string, index: number) => {
    navigator.clipboard.writeText(hook);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <div className="hook-list">
      {hooks.map((hook, index) => (
        <div className="hook-item" key={index}>
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
        </div>
      ))}
    </div>
  );
}
