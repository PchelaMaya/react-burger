import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
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
