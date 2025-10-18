"use client";

import css from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
};

export default function Modal({ isOpen, onClose, onConfirm, message }: Props) {
  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <p className={css.message}>{message || "Are you sure?"}</p>
        <div className={css.buttons}>
          <button className={css.confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={css.cancel} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
