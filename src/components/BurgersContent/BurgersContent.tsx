import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients";
import { ingredientPropType } from "./types";
import PropTypes from "prop-types";
import styles from "./BurgersContent.module.scss";

export const BurgersContent = (props: any) => {
  return (
    <section className={styles.burgerscontent}>
      <BurgerIngredients data={props.BurgerIngredientsData} />
      <BurgerConstructor />
    </section>
  );
};
BurgersContent.propTypes = {
  BurgerIngredientsData: PropTypes.arrayOf(ingredientPropType).isRequired,
};
