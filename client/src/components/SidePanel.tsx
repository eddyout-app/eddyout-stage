import React from "react";
import "../styles/SidePanel.css";
interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SidePanel({
  isOpen,
  onClose,
  children,
}: SidePanelProps) {
  return (
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      <button className="side-panel-close" onClick={onClose}>
        ✖
      </button>
      <div className="side-panel-content">{children}</div>
    </div>
  );
}
