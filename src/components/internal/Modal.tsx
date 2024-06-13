import React from 'react';
import './Modal.css';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<CustomModalProps> = ({ visible, onClose, children }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;