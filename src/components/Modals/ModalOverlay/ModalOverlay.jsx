import styles from "./ModalOverlay.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";

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

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
