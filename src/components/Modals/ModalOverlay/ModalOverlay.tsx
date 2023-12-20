import styles from "./ModalOverlay.module.scss";
import PropTypes from "prop-types";
import { useEffect, MouseEvent, FC } from "react";

const ModalOverlay = (props?: any) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={() => props.onClose(false)} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
