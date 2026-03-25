import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <button
            type="button"
            className="closeBtn"
            aria-label="Close modal"
            onClick={closeModal}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
