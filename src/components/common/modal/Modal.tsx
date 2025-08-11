import { type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="relative m-8 flex w-full max-w-md flex-col items-center gap-2 rounded-xl bg-white px-6 py-8 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <XMarkIcon
          className={'absolute top-4 right-4 w-5 cursor-pointer'}
          onClick={onClose}
        />
        <h2 className="my-2 text-xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}
