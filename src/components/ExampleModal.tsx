import { FiX } from "react-icons/fi";

interface Props {
  item: { visual: string; text: string; script: string } | null;
  onClose: () => void;
}

export default function ExampleModal({ item, onClose }: Props) {
  if (!item) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          <FiX size={20} />
        </button>
        <h3 className="modal-title">{item.text}</h3>
        <p className="modal-visual">{item.visual}</p>
        <p className="modal-script">{item.script}</p>
        <button className="cta-button" onClick={onClose} style={{ marginTop: 16 }}>
          Gunakan Template
        </button>
      </div>
    </div>
  );
}
