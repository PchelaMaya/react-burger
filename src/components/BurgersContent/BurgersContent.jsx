import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients";
import { ingredientPropType } from "../../utils/types";
import PropTypes from "prop-types";
import styles from "./BurgersContent.module.scss";

export const BurgersContent = (props) => {
  return (
    <section className={styles.burgerscontent}>
      <BurgerIngredients data={props.burgerIngredientsData} />
      <BurgerConstructor />
    </section>
  );
};
BurgersContent.propTypes = {
  burgerIngredientsData: PropTypes.arrayOf(ingredientPropType).isRequired,
};
