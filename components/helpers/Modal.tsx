import React, { ReactNode, MouseEvent } from "react";
import styles from "@/styles/components/helpers/Modal.module.css";
import { PiXCircle } from "react-icons/pi";
interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}>
          <PiXCircle className={styles.icon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
