import { ingredientPropType } from "../../BurgersContent/types";
import { Modal } from "../Modal/Modal";
import styles from "./ModalIngredientInfo.module.scss";
import PropTypes from "prop-types";

export const ModalIngredientInfo = (props: any) => {
  return (
    <div className={styles.ingredientinfo}>
      <h3 className="text text_type_main-large">Детали ингридиента</h3>
      <img src={props.data?.image_large} />

      <div className={styles.infocontent}>
        <p className="text text_type_main-medium mt-2">{props.data?.name}</p>
        <div className={`mt-8 ${styles.infodescription}`}>
          <div className={styles.descriptionbox}>
            <p
              className={`${styles.title} text text_type_main-default text_color_inactive`}
            >
              Каллории,ккал
            </p>
            <p
              className={`${styles.digits} text text_type_digits-default text_color_inactive`}
            >
              {props.data?.calories}
            </p>
          </div>
          <div className={styles.descriptionbox}>
            <p
              className={`${styles.title} text text_type_main-default text_color_inactive`}
            >
              Белки, г
            </p>
            <p
              className={`${styles.digits} text text_type_digits-default text_color_inactive`}
            >
              {props.data?.proteins}
            </p>
          </div>
          <div className={styles.descriptionbox}>
            <p
              className={`${styles.title} text text_type_main-default text_color_inactive`}
            >
              Жиры, г
            </p>
            <p
              className={`${styles.digits} text text_type_digits-default text_color_inactive`}
            >
              {props.data?.fat}
            </p>
          </div>
          <div className={styles.descriptionbox}>
            <p
              className={`${styles.title} ttext text_type_main-default text_color_inactive`}
            >
              Углеводы, г
            </p>
            <p
              className={`${styles.digits} text text_type_digits-default text_color_inactive`}
            >
              {props.data?.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalIngredientInfo.propTypes = {
  data: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    image_large: PropTypes.string,
  }).isRequired,
};
