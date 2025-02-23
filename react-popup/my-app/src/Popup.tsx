import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  isOpen: boolean;
  positionTo?: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
  opacity?: number;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  positionTo,
  onClose,
  children,
  opacity = 0.5,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target === document.getElementById('popup-backdrop')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rect = positionTo?.getBoundingClientRect();
  const top = rect ? rect.bottom + window.scrollY : window.innerHeight / 2;
  const left = rect ? rect.left + window.scrollX : window.innerWidth / 2;

  return ReactDOM.createPortal(
    <>
      <div
        id="popup-backdrop"
        className="fixed inset-0 bg-black"
        style={{ opacity, pointerEvents: 'auto' }}
      />
      <div
        className="absolute bg-white border rounded shadow-lg"
        style={{ top, left }}>
        {children}
      </div>
    </>,
    document.body
  );
};

export default Popup;
