import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modals = document.getElementById("modals");

export const Modal = ({ onClose, children }) => {
  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modalcontent}>
        <div className={styles.closebutton}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </>,
    modals
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
