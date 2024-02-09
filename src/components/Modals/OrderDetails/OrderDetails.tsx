import styles from "./OrderDetails.module.scss";
import { SuccessOrder } from "../../../images/successOrder";
import { getIsLoadingOrder, getNumberOrder } from "../../../services/reducers";
import { useSelector } from "../../../utils/typeHooks";

export const OrderDetails = () => {
  const numberOrder = useSelector(getNumberOrder);
  const isLoading = useSelector(getIsLoadingOrder);

  return (
    <>
      {isLoading ? (
        <p className="text text_type_main-default text_color_inactive mt-15 mb-15">
          Информация летит из космоса...
        </p>
      ) : (
        <div className={styles.modalorder}>
          <h3
            className={`text text_type_digits-large mt-10 mb-8 ${styles.number}`}
          >
            {numberOrder}
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
      )}
    </>
  );
};
