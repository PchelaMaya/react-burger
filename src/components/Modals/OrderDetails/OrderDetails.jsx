import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";
import styles from "./OrderDetails.module.scss";
import { SuccessOrder } from "../../../images/successOrder";

export const OrderDetails = () => {
  return (
    <div className={styles.modalorder}>
      <h3 className={`text text_type_digits-large mt-10 mb-8 ${styles.number}`}>
        034536
      </h3>
      <p className="text text_type_main-medium mb-15 mt-8">
        идентификатор заказа
      </p>
      <SuccessOrder />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
