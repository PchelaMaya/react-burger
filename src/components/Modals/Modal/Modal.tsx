import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export const Modal: React.FC<{ onClose: () => void; children: any }> = ({
  onClose,
  children,
}) => {
  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modalcontent}>
        <div className={`${styles.closebutton}`}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </>,
    document.body
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
