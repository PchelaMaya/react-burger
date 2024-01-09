import { useEffect } from "react";
import styles from "./ModalOverlay.module.scss";

const ModalOverlay = (props) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={() => props.onClose(false)} />
  );
};

export default ModalOverlay;
