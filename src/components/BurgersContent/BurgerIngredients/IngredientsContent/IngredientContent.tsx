import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../types";
import styles from "./IngredientContent.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import { ModalIngredientInfo } from "../../../Modals/ModalIngredientInfo/ModalIngredientInfo";
import { Modal } from "../../../Modals/Modal/Modal";

export const IngredientContent = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div
        className={styles.ingredientitem}
        onClick={() => setIsOpenModal(true)}
      >
        <div className={styles.image}>
          <img src={props.data.image} />
          <Counter count={1} />
        </div>
        <p className="text text_type_digits-default">
          {props.data.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{props.data.name}</p>
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <ModalIngredientInfo data={props.data} />
        </Modal>
      )}
    </>
  );
};

IngredientContent.propTypes = {
  data: ingredientPropType,
};
