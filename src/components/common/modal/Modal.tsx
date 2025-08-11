import { XMarkIcon } from '@heroicons/react/24/outline';
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
    >
      <div
        className="relative m-8 flex w-full max-w-md flex-col items-center gap-2 rounded-xl bg-white px-6 py-8 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <XMarkIcon className="w-5 cursor-pointer" />
        </button>
        <h2 className="my-2 text-xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}
