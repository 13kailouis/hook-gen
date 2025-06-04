import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";
import styles from "./HookList.module.css";

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
    <div className={styles.hookList}>
      {hooks.map((hook, index) => (
        <div className={`${styles.hookItem} ${styles.fadeIn}`} key={index}>
          <p className={styles.hookText}>{hook}</p>
          <button
            className={styles.copyButton}
            onClick={() => handleCopy(hook, index)}
            aria-label="Copy hook"
          >
            {copiedIndex === index ? (
              <FiCheck size={18} color="#10b981" />
            ) : (
              <FiCopy size={18} />
            )}
          </button>

          <div className={styles.hookActions}>
            <button
              className={`${styles.likeButton} ${feedback[index] === "like" ? styles.active : ""}`}
              onClick={() => toggleFeedback(index, "like")}
              aria-label="Like"
            >
              👍
            </button>
            <button
              className={`${styles.dislikeButton} ${feedback[index] === "dislike" ? styles.active : ""}`}
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
