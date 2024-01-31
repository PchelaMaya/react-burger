import { useSelector } from "react-redux";
import styles from "./IngredientDetails.module.scss";
import { getIngredients } from "../../../services/reducers";
import { useParams } from "react-router";

export const IngredientDetails = () => {
  const ingredients = useSelector(getIngredients);

  const { id } = useParams();

  const selectedIngredient =
    ingredients.find((ingredient) => ingredient._id === id) || {};

  return (
    <div className={styles.ingredientinfo}>
      <h3 className="text text_type_main-large">Детали ингридиента</h3>
      <img
        src={selectedIngredient?.image_large}
        alt={selectedIngredient?.name}
      />

      <div className={styles.infocontent}>
        <p className="text text_type_main-medium mt-2">
          {selectedIngredient?.name}
        </p>
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
              {selectedIngredient?.calories}
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
              {selectedIngredient?.proteins}
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
              {selectedIngredient?.fat}
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
              {selectedIngredient?.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
