import { FiX } from "react-icons/fi";

interface Props {
  open: boolean;
  content: string;
  onClose: () => void;
}

export default function ScriptModal({ open, content, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          <FiX size={20} />
        </button>
        <h3 className="modal-title">Pratinjau Skrip</h3>
        <pre className="modal-script" style={{ whiteSpace: "pre-wrap" }}>
          {content}
        </pre>
        <a href="/sample-script.txt" download className="cta-button" style={{ marginTop: 16 }}>
          Unduh File
        </a>
      </div>
    </div>
  );
}
