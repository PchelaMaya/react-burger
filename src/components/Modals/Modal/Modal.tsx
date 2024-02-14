import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { TModal } from "../../../utils/types";

const modals = document.getElementById("modals") as HTMLElement;

export const Modal = ({ onClose, children }: TModal) => {
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
