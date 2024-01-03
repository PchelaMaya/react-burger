import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../../utils/types";
import styles from "./IngredientContent.module.scss";
import { IngredientDetails } from "../../../Modals/IngredientDetails/IngredientDetails";
import { useModal } from "../../../../hooks/useModal";
import { Modal } from "../../../Modals/Modal/Modal";

export const IngredientContent = (props) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className={styles.ingredientitem} onClick={openModal}>
        <div className={styles.image}>
          <img src={props.data.image} alt={props.data.name} />
          <Counter count={1} />
        </div>
        <p className="text text_type_digits-default">
          {props.data.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{props.data.name}</p>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <IngredientDetails data={props.data} />
        </Modal>
      )}
    </>
  );
};

IngredientContent.propTypes = {
  data: ingredientPropType,
};
