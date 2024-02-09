import styles from "./ModalOverlay.module.scss";
import { useEffect } from "react";
import { TClosePopup } from "../../../utils/types";

const ModalOverlay = ({ onClose }: TClosePopup) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
